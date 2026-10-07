import type { Project } from "@/data/types";
import projectsData from "@/data/translations/projects.json";

export const projects: Project[] = projectsData as Project[];

export const featuredProjects: Project[] = projects.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
