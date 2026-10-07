import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { formatDate } from "@/lib/formatDate";
import {
  getAllBlogRouteParams,
  getPostAlternatePaths,
  getPublishedPostBySlug,
} from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogRouteParams();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPublishedPostBySlug(locale, slug);
  if (!post) return {};

  const canonicalPath = post.isFallback && post.originalLocale
    ? localePath(post.originalLocale, `/blog/${post.slug}`)
    : undefined;

  return createMetadata({
    title: post.title,
    description: post.description,
    locale,
    path: `/blog/${post.slug}`,
    type: "article",
    alternatePaths: getPostAlternatePaths(post),
    canonicalPath,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPublishedPostBySlug(locale, slug);
  if (!post) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href={localePath(locale, "/blog")}
          className="link-underline rounded-sm font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          ← {dictionary.blog.back}
        </Link>

        {post.isFallback ? (
          <div
            className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-surface-muted/60 p-4 text-sm text-foreground"
            role="status"
          >
            <span className="text-base select-none" aria-hidden="true">
              ℹ️
            </span>
            <p className="leading-relaxed">{dictionary.blog.missingTranslationNotice}</p>
          </div>
        ) : null}

        <header className="mt-10 border-b border-border pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-subtle">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.category ? <span>· {post.category}</span> : null}
            <span>· {post.readingTimeMinutes} {dictionary.blog.minuteRead}</span>
            {post.autoTranslated ? (
              <span className="inline-flex items-center rounded border border-border bg-surface px-2 py-0.5 text-[11px] text-muted">
                🤖 {dictionary.blog.aiTranslated}
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.12] tracking-[-0.04em] text-foreground sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-muted">{post.description}</p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label={dictionary.blog.tagsLabel}>
            {post.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-muted">
                #{tag}
              </li>
            ))}
          </ul>
        </header>
        <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Container>
  );
}
