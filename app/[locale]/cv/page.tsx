import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { CvActions } from "@/components/cv/CvActions";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { featuredProjects, projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface CvPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.metadata.cvTitle,
    description: dictionary.metadata.cvDescription,
    locale,
    path: "/cv",
  });
}

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const cvProjects = featuredProjects.length > 0 ? featuredProjects : projects;

  return (
    <Container className="py-10 sm:py-16 lg:py-20">
      {/* Top Bar with Title and Actions (hidden on print) */}
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            {dictionary.cvPage.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dictionary.cvPage.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {dictionary.cvPage.description}
          </p>
        </div>

        <CvActions
          printLabel={dictionary.cvPage.print}
          downloadLabel={dictionary.cvPage.downloadPdf}
        />
      </div>

      {/* Printable CV Sheet */}
      <article className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-10 lg:p-12 print:max-w-none print:border-none print:bg-transparent print:p-0 print:shadow-none">
        {/* Header: Avatar, Name, Role & Contact */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 border-b border-border pb-8">
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border-strong bg-surface-soft sm:size-24">
              <Image
                src="/images/ava.jpg"
                alt={`${profile.name} - ${profile.role[locale]}`}
                fill
                priority
                sizes="96px"
                className="object-cover object-center"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {profile.name}
              </h2>
              <p className="mt-1 font-mono text-sm font-medium text-accent">
                {profile.role[locale]}
              </p>
              {profile.location ? (
                <p className="mt-0.5 text-xs text-muted">
                  📍 {profile.location}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-xs text-muted sm:items-end">
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-accent"
              >
                ✉ {profile.email}
              </a>
            ) : null}
            {profile.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                🔗 {link.label}: {link.href.replace(/^https?:\/\//, "")}
              </a>
            ))}
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mt-8 border-b border-border pb-8" aria-labelledby="cv-summary">
          <h3
            id="cv-summary"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          >
            {dictionary.cvPage.summary}
          </h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
            <p>{profile.introduction[locale]}</p>
            {profile.about.map((paragraph) => (
              <p key={paragraph[locale]}>{paragraph[locale]}</p>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mt-8 border-b border-border pb-8" aria-labelledby="cv-skills">
          <h3
            id="cv-skills"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          >
            {dictionary.cvPage.skills}
          </h3>

          {skillGroups.length === 0 ? (
            <div className="mt-4">
              <EmptyState>{dictionary.empty.skills}</EmptyState>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div
                  key={group.category[locale]}
                  className="rounded-lg border border-border bg-surface-soft/40 p-3.5 print:bg-transparent"
                >
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                    {group.category[locale]}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-foreground print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Work Experience */}
        <section className="mt-8 border-b border-border pb-8" aria-labelledby="cv-experience">
          <h3
            id="cv-experience"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          >
            {dictionary.cvPage.experience}
          </h3>

          {experiences.length === 0 ? (
            <div className="mt-4">
              <EmptyState>{dictionary.empty.experience}</EmptyState>
            </div>
          ) : (
            <div className="mt-4 space-y-6">
              {experiences.map((item) => (
                <div
                  key={`${item.organization[locale]}-${item.period}`}
                  className="border-l-2 border-border pl-4 sm:pl-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title[locale]}
                    </h4>
                    <span className="font-mono text-xs text-subtle">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-muted">
                    {item.organization[locale]}
                  </p>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description[locale]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Key Projects */}
        <section className="mt-8 border-b border-border pb-8" aria-labelledby="cv-projects">
          <h3
            id="cv-projects"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          >
            {dictionary.cvPage.projects}
          </h3>

          <div className="mt-4 space-y-5">
            {cvProjects.map((project) => (
              <div
                key={project.slug}
                className="rounded-lg border border-border bg-surface-soft/30 p-4 print:border-gray-300 print:bg-transparent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground">
                      {project.title[locale]}
                    </h4>
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                      {project.status[locale]}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        Live Demo ↗
                      </a>
                    ) : null}
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted hover:underline"
                      >
                        GitHub ↗
                      </a>
                    ) : null}
                    <Link
                      href={localePath(locale, `/projects/${project.slug}`)}
                      className="text-muted hover:text-foreground hover:underline print:hidden"
                    >
                      {dictionary.project.overview} →
                    </Link>
                  </div>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.summary[locale]}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted print:border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-8" aria-labelledby="cv-education">
          <h3
            id="cv-education"
            className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-subtle"
          >
            {dictionary.cvPage.education}
          </h3>

          {education.length === 0 ? (
            <div className="mt-4">
              <EmptyState>{dictionary.empty.education}</EmptyState>
            </div>
          ) : (
            <div className="mt-4 space-y-6">
              {education.map((item) => (
                <div
                  key={`${item.organization[locale]}-${item.period}`}
                  className="border-l-2 border-border pl-4 sm:pl-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title[locale]}
                    </h4>
                    <span className="font-mono text-xs text-subtle">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-muted">
                    {item.organization[locale]}
                  </p>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description[locale]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </Container>
  );
}
