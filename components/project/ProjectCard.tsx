import Link from "next/link";
import Image from "next/image";

import type { Project } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
  index?: number;
}

export function ProjectCard({ project, locale, dictionary }: ProjectCardProps) {
  const projectPath = localePath(locale, `/projects/${project.slug}`);

  return (
    <article className="h-full">
      <Link
        href={projectPath}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-4 sm:p-4.5 transition-all duration-300 ease-out hover:-translate-y-4 hover:border-accent/40 hover:bg-surface-soft/40 hover:shadow-xl hover:shadow-accent/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
      >
        <div>
          {/* Thumbnail / Cover Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-surface-soft flex items-center justify-center">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt?.[locale] || project.title[locale]}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="relative flex size-full items-center justify-center bg-gradient-to-br from-surface to-surface-soft">
                {/* Subtle radial glow */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]"
                  aria-hidden="true"
                />
                {/* Center icon emblem */}
                <div className="relative flex size-12 items-center justify-center rounded-2xl border border-border/80 bg-surface/90 text-muted shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:text-accent">
                  <svg
                    className="size-6 fill-none stroke-current"
                    strokeWidth="1.75"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Title & Summary */}
          <div className="mt-3.5">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent line-clamp-2">
              {project.title[locale]}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
              {project.summary[locale]}
            </p>
          </div>
        </div>

        {/* Bottom row: Thời gian dự án & Xem dự án */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs sm:text-sm">
          {project.period ? (
            <span className="text-subtle font-normal">{project.period}</span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-accent">
            <span>{dictionary.project.viewProject}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
