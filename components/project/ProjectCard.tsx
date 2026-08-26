import Link from "next/link";

import type { Project } from "@/data/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/35 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {project.status}
        </span>
        <span className="text-slate-600 transition group-hover:text-accent" aria-hidden="true">
          ↗
        </span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 leading-7 text-slate-400">{project.summary}</p>
      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Công nghệ sử dụng">
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-xs text-slate-300"
          >
            {technology}
          </li>
        ))}
      </ul>
    </article>
  );
}
