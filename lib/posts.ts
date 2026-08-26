import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  category?: string;
  coverImage?: string;
  updatedAt?: string;
  language?: "vi" | "en";
  featured?: boolean;
}

export interface Post extends PostMetadata {
  contentHtml: string;
}

function assertString(
  value: unknown,
  field: string,
  fileName: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid frontmatter field "${field}" in ${fileName}`);
  }
}

function validateDate(value: unknown, field: string, fileName: string): string {
  assertString(value, field, fileName);

  if (
    !isoDatePattern.test(value) ||
    Number.isNaN(Date.parse(`${value}T00:00:00.000Z`))
  ) {
    throw new Error(`Invalid date field "${field}" in ${fileName}`);
  }

  return value;
}

function optionalString(
  value: unknown,
  field: string,
  fileName: string,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  assertString(value, field, fileName);
  return value;
}

function parseMetadata(fileName: string): {
  metadata: PostMetadata;
  content: string;
} {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  assertString(data.title, "title", fileName);
  assertString(data.description, "description", fileName);

  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string")) {
    throw new Error(`Invalid frontmatter field "tags" in ${fileName}`);
  }

  if (typeof data.published !== "boolean") {
    throw new Error(`Invalid frontmatter field "published" in ${fileName}`);
  }

  if (data.language !== undefined && data.language !== "vi" && data.language !== "en") {
    throw new Error(`Invalid frontmatter field "language" in ${fileName}`);
  }

  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    throw new Error(`Invalid frontmatter field "featured" in ${fileName}`);
  }

  return {
    metadata: {
      slug,
      title: data.title,
      description: data.description,
      date: validateDate(data.date, "date", fileName),
      tags: data.tags,
      published: data.published,
      category: optionalString(data.category, "category", fileName),
      coverImage: optionalString(data.coverImage, "coverImage", fileName),
      updatedAt:
        data.updatedAt === undefined
          ? undefined
          : validateDate(data.updatedAt, "updatedAt", fileName),
      language: data.language,
      featured: data.featured,
    },
    content,
  };
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

export function getPublishedPosts(): PostMetadata[] {
  return getMarkdownFiles()
    .map((fileName) => parseMetadata(fileName).metadata)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | undefined> {
  const fileName = `${slug}.md`;

  if (!getMarkdownFiles().includes(fileName)) {
    return undefined;
  }

  const { metadata, content } = parseMetadata(fileName);

  if (!metadata.published) {
    return undefined;
  }

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  return {
    ...metadata,
    contentHtml: processedContent.toString(),
  };
}
