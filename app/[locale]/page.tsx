import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/project/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getPublishedPosts } from "@/lib/posts";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {

  // lay ngon ngu tu url
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const latestPosts = getPublishedPosts(locale).slice(0, 3);

  return (
    <Container>
      <Hero locale={locale} dictionary={dictionary} />
      
      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="featured-projects-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="featured-projects-title">
            <SectionHeading title={dictionary.sections.projects.title} description={dictionary.sections.projects.description} />
          </div>
          <Link href={localePath(locale, "/projects")} className="link-underline w-fit rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
            {dictionary.sections.projects.all} →
          </Link>
        </div>
        <div className="mt-12 border-b border-border">
          {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} dictionary={dictionary} />)}
        </div>
      </section>

      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="latest-posts-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="latest-posts-title"><SectionHeading title={dictionary.sections.writing.title} description={dictionary.sections.writing.description} /></div>
          <Link href={localePath(locale, "/blog")} className="link-underline w-fit rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
            {dictionary.sections.writing.all} →
          </Link>
        </div>
        <div className="mt-12 border-b border-border">
          {latestPosts.length > 0 ? latestPosts.map((post) => <PostCard key={post.slug} post={post} locale={locale} dictionary={dictionary} />) : <EmptyState>{dictionary.empty.posts}</EmptyState>}
        </div>
      </section>

    </Container>
  );
}
