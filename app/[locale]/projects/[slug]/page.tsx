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
  return createMetadata({ title: project.title[locale], description: project.summary[locale], locale, path: `/projects/${project.slug}` });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <Link href={localePath(locale, "/projects")} className="link-underline rounded-sm font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
        ← {dictionary.project.back}
      </Link>
      <article className="mt-10">
        <header className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{project.status[locale]}</p>
          <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">{project.title[locale]}</h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-muted sm:text-xl">{project.summary[locale]}</p>
        </header>
        {project.image && project.imageAlt ? (
          <div className="mt-12 overflow-hidden rounded-md border border-border bg-surface-soft">
            <Image src={project.image} alt={project.imageAlt[locale]} width={1200} height={760} priority unoptimized className="h-auto w-full" />
          </div>
        ) : null}
        <div className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{dictionary.project.overview}</p>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
            {project.description.map((paragraph) => <p key={paragraph[locale]}>{paragraph[locale]}</p>)}
          </div>
        </div>
        <section className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.45fr_1.55fr] lg:gap-16" aria-labelledby="technology-title">
          <h2 id="technology-title" className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{dictionary.project.technologies}</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-3 font-mono text-sm text-muted" aria-label={dictionary.project.technologyListLabel}>
            {project.technologies.map((technology, index) => <li key={technology}>{technology}{index < project.technologies.length - 1 ? <span className="ml-4 text-border-strong">·</span> : null}</li>)}
          </ul>
        </section>
        <div className="mt-12 flex flex-wrap gap-4 border-t border-border pt-10">
          {project.repositoryUrl ? <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4">{dictionary.project.sourceCode} <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">↗︎</span></a> : null}
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4">{dictionary.project.liveWebsite} <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">↗︎</span></a> : null}
        </div>
      </article>
    </Container>
  );
}
