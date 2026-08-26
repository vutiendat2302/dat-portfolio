import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { getProjectBySlug, projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-24">
      <Link
        href="/projects"
        className="rounded-sm font-mono text-sm text-slate-400 transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ← Tất cả dự án
      </Link>

      <article className="mt-12 max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {project.status}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 text-pretty text-xl leading-8 text-slate-300">
          {project.summary}
        </p>

        <div className="mt-12 space-y-5 border-t border-white/10 pt-10 text-lg leading-8 text-slate-300">
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-12" aria-labelledby="technology-title">
          <h2 id="technology-title" className="text-lg font-semibold text-white">
            Công nghệ
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/10 bg-white/3 px-4 py-2 font-mono text-sm text-slate-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Xem source code ↗
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Xem website ↗
            </a>
          ) : null}
        </div>
      </article>
    </Container>
  );
}
