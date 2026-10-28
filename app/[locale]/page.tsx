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

      <section className="reveal border-t border-border py-8 sm:py-10" aria-labelledby="latest-posts-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div id="latest-posts-title"><SectionHeading title={dictionary.sections.writing.title} description={dictionary.sections.writing.description} /></div>
          <Link
            href={localePath(locale, "/blog")}
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer sm:mt-1"
          >
            <span>{dictionary.sections.writing.all}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} dictionary={dictionary} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState>{dictionary.empty.posts}</EmptyState>
            </div>
          )}
        </div>
      </section>
      
      <section className="reveal border-t border-border py-8 sm:py-10" aria-labelledby="featured-projects-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div id="featured-projects-title">
            <SectionHeading title={dictionary.sections.projects.title} description={dictionary.sections.projects.description} />
          </div>
          <Link
            href={localePath(locale, "/projects")}
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer sm:mt-1"
          >
            <span>{dictionary.sections.projects.all}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              locale={locale}
              dictionary={dictionary}
            />
          ))}
        </div>
      </section>

      

    </Container>
  );
}
