import Link from "next/link";
import Image from "next/image";

import type { Project } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  locale: Locale;
  dictionary: Dictionary;
}

export function ProjectCard({ project, index, locale, dictionary }: ProjectCardProps) {
  const projectPath = localePath(locale, `/projects/${project.slug}`);

  return (
    <article className="group border-t border-border py-8 transition-colors duration-200 hover:border-border-strong sm:py-10 lg:grid lg:grid-cols-[48px_minmax(0,1fr)_minmax(280px,0.8fr)] lg:gap-8">
      <p className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</p>

      <div className="mt-5 lg:mt-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-foreground transition-colors duration-200 group-hover:text-accent sm:text-3xl">
            <Link
              href={projectPath}
              className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {project.title[locale]}
            </Link>
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {project.status[locale]}
          </span>
        </div>
        <p className="mt-4 max-w-xl leading-7 text-muted">{project.summary[locale]}</p>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-subtle" aria-label={dictionary.project.technologyListLabel}>
          {project.technologies.map((technology, technologyIndex) => (
            <li key={technology}>
              {technology}
              {technologyIndex < project.technologies.length - 1 ? <span className="ml-3 text-border-strong">·</span> : null}
            </li>
          ))}
        </ul>
        <Link
          href={projectPath}
          className="mt-7 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {dictionary.project.viewProject}
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            ↗︎
          </span>
        </Link>
      </div>

      {project.image && project.imageAlt ? (
        <Link
          href={projectPath}
          className="mt-8 block overflow-hidden rounded-md border border-border bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 lg:mt-0"
        >
          <Image
            src={project.image}
            alt={project.imageAlt[locale]}
            width={1200}
            height={760}
            unoptimized
            className="aspect-[12/7.6] h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </Link>
      ) : null}
    </article>
  );
}
