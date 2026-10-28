import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { getProjectBySlug, projects } from "@/data/projects";
import { isLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title[locale],
    description: project.summary[locale],
    locale,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      <article className="mx-auto max-w-4xl">
        <header className="border-b border-border pb-8 sm:pb-12">
          {/* Header Top: Title on left + Back Button on right */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-balance text-2xl font-semibold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.title[locale]}
            </h1>

            <Link
              href={localePath(locale, "/projects")}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer self-start sm:self-auto"
            >
              <span aria-hidden="true">←</span>
              <span>{dictionary.project.back}</span>
            </Link>
          </div>

          {/* Project Summary */}
          <p className="mt-4 text-pretty text-base sm:text-lg leading-relaxed text-muted sm:leading-8">
            {project.summary[locale]}
          </p>

          {/* Project Status Badge */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-subtle font-normal">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {project.status[locale]}
            </span>
          </div>
        </header>

        {project.image && project.imageAlt ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface-soft shadow-xs">
            <Image
              src={project.image}
              alt={project.imageAlt[locale]}
              width={1200}
              height={760}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">
            {dictionary.project.overview}
          </p>
          <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph[locale]}</p>
            ))}
          </div>
        </div>

        <section
          className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16"
          aria-labelledby="technology-title"
        >
          <h2
            id="technology-title"
            className="font-mono text-xs uppercase tracking-[0.16em] text-subtle"
          >
            {dictionary.project.technologies}
          </h2>
          <div className="flex flex-wrap gap-2" aria-label={dictionary.project.technologyListLabel}>
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="inline-flex items-center rounded-md border border-border/80 bg-surface px-2.5 py-1 text-xs font-mono text-foreground/85"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-border pt-10">
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 w-full sm:w-auto"
            >
              {dictionary.project.sourceCode}{" "}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                ↗︎
              </span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 w-full sm:w-auto"
            >
              {dictionary.project.liveWebsite}{" "}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                ↗︎
              </span>
            </a>
          ) : null}
        </div>
      </article>
    </Container>
  );
}
