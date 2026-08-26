import type { Project } from "@/data/types";

export const projects: Project[] = [
  {
    slug: "dat-portfolio",
    title: "DAT Portfolio",
    summary:
      "Portfolio cá nhân và technical blog được xây dựng bằng Next.js, TypeScript và Markdown.",
    description: [
      "Website tập trung giới thiệu project, thông tin cá nhân và các bài viết kỹ thuật trong một trải nghiệm gọn gàng, content-first.",
      "Nội dung được quản lý trực tiếp bằng Git: dữ liệu portfolio nằm trong TypeScript và bài viết nằm trong các file Markdown.",
    ],
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Markdown"],
    status: "Đang phát triển",
    featured: true,
    repositoryUrl: "https://github.com/vutiendat2302/dat-portfolio",
  },
];

export const featuredProjects: Project[] = projects.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
