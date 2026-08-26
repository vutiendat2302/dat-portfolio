import type { Metadata } from "next";

import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getPublishedPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Bài viết",
  description: "Technical notes, hướng dẫn và những điều Dat học được khi làm phần mềm.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        eyebrow="Blog"
        title="Ghi chép và chia sẻ"
        description="Technical notes, hướng dẫn ngắn và những bài học trong quá trình xây dựng sản phẩm."
      />

      <div className="mt-12 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <EmptyState>Chưa có bài viết nào được xuất bản.</EmptyState>
        )}
      </div>
    </Container>
  );
}
