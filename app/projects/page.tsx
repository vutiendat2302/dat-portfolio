import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Dự án",
  description: "Những dự án phần mềm được Dat xây dựng và phát triển.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Những thứ mình đã xây dựng"
        description="Các project cá nhân, thử nghiệm và sản phẩm đang được hoàn thiện."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
