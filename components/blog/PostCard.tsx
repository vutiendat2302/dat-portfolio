import Link from "next/link";

import type { PostMetadata } from "@/lib/posts";
import { formatDate } from "@/lib/formatDate";

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-b border-white/10 py-7 first:pt-0 last:border-0 last:pb-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono text-xs text-slate-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.category ? ` · ${post.category}` : ""}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-sm transition group-hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 leading-7 text-slate-400">{post.description}</p>
        </div>
        <span className="mt-1 text-slate-600 transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true">
          →
        </span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Thẻ bài viết">
        {post.tags.map((tag) => (
          <li key={tag} className="font-mono text-xs text-slate-500">
            #{tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
