import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Giới thiệu",
  description: "Thông tin về Dat, kỹ năng, kinh nghiệm và quá trình học tập.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        eyebrow="About"
        title={`Một chút về ${profile.name}`}
        description="Thông tin cá nhân, nền tảng và những công nghệ mình sử dụng."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <section aria-labelledby="story-title">
          <h2 id="story-title" className="text-xl font-semibold text-white">
            Câu chuyện
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-slate-300">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-title">
          <h2 id="skills-title" className="text-xl font-semibold text-white">
            Kỹ năng
          </h2>
          <div className="mt-5 space-y-5">
            {skillGroups.length > 0 ? (
              skillGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                    {group.category}
                  </h3>
                  <p className="mt-2 text-slate-300">{group.skills.join(" · ")}</p>
                </div>
              ))
            ) : (
              <EmptyState>Nội dung kỹ năng sẽ được cập nhật trong data/skills.ts.</EmptyState>
            )}
          </div>
        </section>
      </div>

      <div className="mt-20 grid gap-12 border-t border-white/8 pt-16 md:grid-cols-2">
        <section aria-labelledby="experience-title">
          <h2 id="experience-title" className="text-xl font-semibold text-white">
            Kinh nghiệm
          </h2>
          <div className="mt-5">
            {experiences.length > 0 ? (
              <ol className="space-y-6">
                {experiences.map((item) => (
                  <li key={`${item.organization}-${item.period}`}>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.organization} · {item.period}
                    </p>
                    {item.description ? <p className="mt-2 text-slate-300">{item.description}</p> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState>Nội dung kinh nghiệm sẽ được cập nhật trong data/experience.ts.</EmptyState>
            )}
          </div>
        </section>

        <section aria-labelledby="education-title">
          <h2 id="education-title" className="text-xl font-semibold text-white">
            Học vấn
          </h2>
          <div className="mt-5">
            {education.length > 0 ? (
              <ol className="space-y-6">
                {education.map((item) => (
                  <li key={`${item.organization}-${item.period}`}>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.organization} · {item.period}
                    </p>
                    {item.description ? <p className="mt-2 text-slate-300">{item.description}</p> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState>Nội dung học vấn sẽ được cập nhật trong data/education.ts.</EmptyState>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}
