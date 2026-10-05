import Link from "next/link";

import type { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/formatDate";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface PostCardProps {
  post: PostMetadata;
  locale: Locale;
  dictionary: Dictionary;
}

export function PostCard({ post, locale, dictionary }: PostCardProps) {
  const postPath = localePath(locale, `/blog/${post.slug}`);

  return (
    <article className="group border-t border-border py-7 sm:py-8">
      <div className="grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:gap-7">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle sm:text-xs">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </p>
          {post.category ? (
            <p className="mt-2 font-mono text-[11px] text-subtle">{post.category}</p>
          ) : null}
        </div>
        <div className="max-w-2xl">
          <h3 className="text-xl font-medium tracking-[-0.025em] text-foreground sm:text-2xl">
            <Link
              href={postPath}
              className="rounded-sm text-foreground transition-colors duration-200 group-hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 leading-7 text-muted">{post.description}</p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-subtle" aria-label={dictionary.blog.tagsLabel}>
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        </div>
        <Link
          href={postPath}
          className="flex w-fit items-center gap-2 self-start rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 sm:justify-self-end"
          aria-label={`${dictionary.blog.readArticle}: ${post.title}`}
        >
          {post.readingTimeMinutes} {dictionary.blog.minuteRead}
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
