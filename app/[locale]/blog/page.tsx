import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getPublishedPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

interface BlogPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({ title: dictionary.metadata.blogTitle, description: dictionary.metadata.blogDescription, locale, path: "/blog" });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const posts = getPublishedPosts(locale);
  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <SectionHeading eyebrow={dictionary.blogPage.eyebrow} title={dictionary.blogPage.title} description={dictionary.blogPage.description} level={1} />
      <div className="mt-14 border-b border-border">
        {posts.length > 0 ? posts.map((post) => <PostCard key={post.slug} post={post} locale={locale} dictionary={dictionary} />) : <EmptyState>{dictionary.empty.posts}</EmptyState>}
      </div>
    </Container>
  );
}
