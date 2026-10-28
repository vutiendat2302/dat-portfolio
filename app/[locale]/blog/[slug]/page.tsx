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
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      <article className="mx-auto max-w-4xl">
        {post.isFallback ? (
          <div
            className="mb-8 flex items-start gap-3 rounded-lg border border-border bg-surface-muted/60 p-4 text-sm text-foreground"
            role="status"
          >
            <span className="text-base select-none" aria-hidden="true">
              ℹ️
            </span>
            <p className="leading-relaxed">{dictionary.blog.missingTranslationNotice}</p>
          </div>
        ) : null}

        <header className="border-b border-border pb-8 sm:pb-12">
          {/* Header Top: Title on left + Back Button on right */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-balance text-2xl font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <Link
              href={localePath(locale, "/blog")}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer self-start sm:self-auto"
            >
              <span aria-hidden="true">←</span>
              <span>{dictionary.blog.back}</span>
            </Link>
          </div>

          {/* Description */}
          <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-muted sm:leading-8">
            {post.description}
          </p>

          {/* Metadata moved below description: Date, Category, Reading Time, AI badge */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-subtle font-normal">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.category ? <span>· {post.category}</span> : null}
            <span>· {post.readingTimeMinutes} {dictionary.blog.minuteRead}</span>
            {post.autoTranslated ? (
              <span className="inline-flex items-center gap-1 rounded border border-border bg-surface px-2 py-0.5 text-[11px] text-muted">
                🤖 {dictionary.blog.aiTranslated}
              </span>
            ) : null}
          </div>

          {/* Tags (optional) */}
          {post.tags && post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2" aria-label={dictionary.blog.tagsLabel}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border/80 bg-surface px-2.5 py-1 text-xs text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="article-content mt-8 sm:mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Container>
  );
}
