import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/data/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface ProjectsPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({ title: dictionary.metadata.projectsTitle, description: dictionary.metadata.projectsDescription, locale, path: "/projects" });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <SectionHeading eyebrow={dictionary.projectsPage.eyebrow} title={dictionary.projectsPage.title} description={dictionary.projectsPage.description} level={1} />
      <div className="mt-14 border-b border-border">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} dictionary={dictionary} />)}
      </div>
    </Container>
  );
}
