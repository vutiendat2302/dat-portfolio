import Link from "next/link";

import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/project/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { getPublishedPosts } from "@/lib/posts";

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, 3);

  return (
    <Container>
      <Hero />

      <section className="border-t border-white/8 py-20 sm:py-24" aria-labelledby="featured-projects-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="featured-projects-title">
            <SectionHeading
              eyebrow="Selected work"
              title="Dự án nổi bật"
              description="Những sản phẩm mình đang xây dựng và hoàn thiện."
            />
          </div>
          <Link
            href="/projects"
            className="w-fit rounded-sm text-sm font-semibold text-accent transition hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 py-20 sm:py-24" aria-labelledby="latest-posts-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="latest-posts-title">
            <SectionHeading
              eyebrow="Notes & ideas"
              title="Bài viết mới"
              description="Ghi chú kỹ thuật và những điều mình học được trong quá trình làm sản phẩm."
            />
          </div>
          <Link
            href="/blog"
            className="w-fit rounded-sm text-sm font-semibold text-accent transition hover:text-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </Container>
  );
}
