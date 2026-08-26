import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { formatDate } from "@/lib/formatDate";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="rounded-sm font-mono text-sm text-slate-400 transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          ← Tất cả bài viết
        </Link>

        <header className="mt-12 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-slate-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.category ? <span>· {post.category}</span> : null}
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-slate-300">
            {post.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Thẻ bài viết">
            {post.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-accent">
                #{tag}
              </li>
            ))}
          </ul>
        </header>

        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-a:text-accent prose-a:decoration-accent/40 prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none prose-pre:overflow-x-auto prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#07090d] prose-table:block prose-table:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </Container>
  );
}
