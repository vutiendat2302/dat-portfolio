import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { defaultLocale, locales, type Locale } from "@/i18n/config";

const postsRootDirectory = path.join(process.cwd(), "content", "posts");
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  locale: Locale;
  translationKey?: string;
  category?: string;
  coverImage?: string;
  updatedAt?: string;
  featured?: boolean;
  readingTimeMinutes: number;
  sourceHash?: string;
  autoTranslated?: boolean;
  isFallback?: boolean;
  originalLocale?: Locale;
}

export interface Post extends PostMetadata {
  contentHtml: string;
}

export interface BlogTranslationEntry {
  translationKey: string;
  slugs: Partial<Record<Locale, string>>;
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

function getPostsDirectory(locale: Locale): string {
  return path.join(postsRootDirectory, locale);
}

function getMarkdownFiles(locale: Locale): string[] {
  const directory = getPostsDirectory(locale);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function parseMetadata(
  locale: Locale,
  fileName: string,
): { metadata: PostMetadata; content: string } {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(getPostsDirectory(locale), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  assertString(data.title, "title", fileName);
  assertString(data.description, "description", fileName);

  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string")) {
    throw new Error(`Invalid frontmatter field "tags" in ${fileName}`);
  }

  if (typeof data.published !== "boolean") {
    throw new Error(`Invalid frontmatter field "published" in ${fileName}`);
  }

  if (data.locale !== locale) {
    throw new Error(`Frontmatter locale in ${fileName} must match folder "${locale}"`);
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
      locale,
      translationKey: optionalString(data.translationKey, "translationKey", fileName),
      category: optionalString(data.category, "category", fileName),
      coverImage: optionalString(data.coverImage, "coverImage", fileName),
      updatedAt:
        data.updatedAt === undefined
          ? undefined
          : validateDate(data.updatedAt, "updatedAt", fileName),
      featured: data.featured,
      readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
      sourceHash: optionalString(data.sourceHash, "sourceHash", fileName),
      autoTranslated: typeof data.autoTranslated === "boolean" ? data.autoTranslated : undefined,
    },
    content,
  };
}

async function renderMarkdown(content: string): Promise<string> {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

export function getPublishedPosts(locale: Locale): PostMetadata[] {
  return getMarkdownFiles(locale)
    .map((fileName) => parseMetadata(locale, fileName).metadata)
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedPostBySlug(
  locale: Locale,
  slug: string,
): Promise<Post | undefined> {
  const fileName = `${slug}.md`;

  if (getMarkdownFiles(locale).includes(fileName)) {
    const { metadata, content } = parseMetadata(locale, fileName);

    if (!metadata.published) {
      return undefined;
    }

    return {
      ...metadata,
      contentHtml: await renderMarkdown(content),
    };
  }

  // Fallback to defaultLocale (vi) if translation does not exist in requested locale
  if (locale !== defaultLocale) {
    const translations = getBlogTranslations();
    const entry = translations.find((item) => item.slugs[locale] === slug);
    const defaultSlug = entry?.slugs[defaultLocale] ?? slug;
    const defaultFileName = `${defaultSlug}.md`;

    if (getMarkdownFiles(defaultLocale).includes(defaultFileName)) {
      const { metadata, content } = parseMetadata(defaultLocale, defaultFileName);
      if (metadata.published) {
        return {
          ...metadata,
          isFallback: true,
          originalLocale: defaultLocale,
          contentHtml: await renderMarkdown(content),
        };
      }
    }
  }

  return undefined;
}

export function getBlogTranslations(): BlogTranslationEntry[] {
  const entries = new Map<string, BlogTranslationEntry>();

  for (const locale of locales) {
    for (const post of getPublishedPosts(locale)) {
      if (!post.translationKey) {
        continue;
      }

      const entry = entries.get(post.translationKey) ?? {
        translationKey: post.translationKey,
        slugs: {},
      };

      entry.slugs[locale] = post.slug;
      entries.set(post.translationKey, entry);
    }
  }

  return Array.from(entries.values());
}

export function getPostAlternatePaths(post: PostMetadata): Partial<Record<Locale, string>> {
  const actualLocale = post.originalLocale ?? post.locale;

  if (!post.translationKey) {
    return { [actualLocale]: `/${actualLocale}/blog/${post.slug}` };
  }

  const translation = getBlogTranslations().find(
    (entry) => entry.translationKey === post.translationKey,
  );

  if (!translation) {
    return { [actualLocale]: `/${actualLocale}/blog/${post.slug}` };
  }

  const alternatePaths: Partial<Record<Locale, string>> = {};

  for (const locale of locales) {
    const slug = translation.slugs[locale];

    if (slug) {
      alternatePaths[locale] = `/${locale}/blog/${slug}`;
    }
  }

  return alternatePaths;
}

export function getAllBlogRouteParams(): Array<{ locale: Locale; slug: string }> {
  const params: Array<{ locale: Locale; slug: string }> = [];
  const defaultPosts = getPublishedPosts(defaultLocale);
  const translations = getBlogTranslations();

  for (const locale of locales) {
    const localePosts = getPublishedPosts(locale);
    const visitedSlugs = new Set<string>();

    for (const post of localePosts) {
      params.push({ locale, slug: post.slug });
      visitedSlugs.add(post.slug);
    }

    if (locale !== defaultLocale) {
      for (const defPost of defaultPosts) {
        const translation = translations.find((t) => t.translationKey === defPost.translationKey);
        const translatedSlug = translation?.slugs[locale];
        if (!translatedSlug && !visitedSlugs.has(defPost.slug)) {
          params.push({ locale, slug: defPost.slug });
          visitedSlugs.add(defPost.slug);
        }
      }
    }
  }

  return params;
}
