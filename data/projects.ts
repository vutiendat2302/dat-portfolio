import type { Project } from "@/data/types";

export const projects: Project[] = [
  {
    slug: "dat-portfolio",
    title: {
      vi: "DAT Portfolio",
      en: "DAT Portfolio",
      "zh-TW": "DAT Portfolio",
    },
    summary: {
      vi: "Portfolio cá nhân và technical blog được xây dựng bằng Next.js, TypeScript và Markdown.",
      en: "A personal portfolio and technical blog built with Next.js, TypeScript, and Markdown.",
      "zh-TW": "使用 Next.js、TypeScript 與 Markdown 打造的個人作品集與技術文章網站。",
    },
    description: [
      {
        vi: "Website tập trung giới thiệu project, thông tin cá nhân và các bài viết kỹ thuật trong một trải nghiệm gọn gàng, content-first.",
        en: "The website presents projects, personal information, and technical writing through a clean, content-first experience.",
        "zh-TW": "網站以乾淨、內容優先的方式呈現專案、個人資訊與技術文章。",
      },
      {
        vi: "Nội dung được quản lý trực tiếp bằng Git: dữ liệu portfolio nằm trong TypeScript và bài viết nằm trong các file Markdown.",
        en: "Content is managed directly through Git: portfolio data lives in TypeScript and articles live in Markdown files.",
        "zh-TW": "內容直接透過 Git 管理：作品集資料使用 TypeScript，文章則存放於 Markdown 檔案。",
      },
    ],
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Markdown"],
    status: {
      vi: "Đang phát triển",
      en: "In progress",
      "zh-TW": "開發中",
    },
    featured: true,
    image: "/projects/dat-portfolio.svg",
    imageAlt: {
      vi: "Minh họa giao diện sáng của DAT Portfolio",
      en: "Light interface preview of DAT Portfolio",
      "zh-TW": "DAT Portfolio 淺色介面預覽",
    },
    repositoryUrl: "https://github.com/vutiendat2302/dat-portfolio",
  },
];

export const featuredProjects: Project[] = projects.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
