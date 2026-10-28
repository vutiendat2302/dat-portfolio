import Link from "next/link";
import Image from "next/image";

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
    <article className="h-full">
      <Link
        href={postPath}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-4 sm:p-4.5 transition-all duration-300 ease-out hover:-translate-y-4 hover:border-accent/40 hover:bg-surface-soft/40 hover:shadow-xl hover:shadow-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
      >
        <div>
          {/* Thumbnail / Cover Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-surface-soft flex items-center justify-center">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="relative flex size-full items-center justify-center bg-gradient-to-br from-surface to-surface-soft">
                {/* Subtle radial glow */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]"
                  aria-hidden="true"
                />
                {/* Center icon emblem */}
                <div className="relative flex size-12 items-center justify-center rounded-2xl border border-border/80 bg-surface/90 text-muted shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:text-accent">
                  <svg
                    className="size-6 fill-none stroke-current"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="mt-3.5">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </div>
        </div>

        {/* Date & Reading time with arrow */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs sm:text-sm text-subtle font-normal">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span className="inline-flex items-center gap-1 shrink-0 font-medium text-foreground transition-colors group-hover:text-accent">
            <span>
              {post.readingTimeMinutes} {dictionary.blog.minuteRead}
            </span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
