import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillList } from "@/components/common/SkillList";
import { TimelineList } from "@/components/common/TimelineList";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";

interface AboutPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({ title: dictionary.metadata.aboutTitle, description: dictionary.metadata.aboutDescription, locale, path: "/about" });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="py-14 sm:py-20 lg:py-24">
      <SectionHeading eyebrow={dictionary.aboutPage.eyebrow} title={dictionary.aboutPage.title} description={dictionary.aboutPage.description} level={1} />
      <div className="mt-14 grid gap-12 border-t border-border pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <h2 id="story-title" className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle">{dictionary.aboutPage.story}</h2>
        <div className="max-w-2xl space-y-5 text-base leading-8 text-muted sm:text-lg">
          {profile.about.map((paragraph) => <p key={paragraph[locale]}>{paragraph[locale]}</p>)}
        </div>
      </div>
      <section className="mt-16 border-t border-border pt-12 sm:mt-20" aria-labelledby="skills-title">
        <h2 id="skills-title" className="text-2xl font-medium tracking-tight text-foreground">{dictionary.aboutPage.skills}</h2>
        <div className="mt-7"><SkillList groups={skillGroups} locale={locale} emptyMessage={dictionary.empty.skills} /></div>
      </section>
      <div className="mt-16 grid gap-14 border-t border-border pt-12 sm:mt-20 lg:grid-cols-2 lg:gap-16">
        <section id="experience" className="scroll-mt-24" aria-labelledby="experience-title">
          <h2 id="experience-title" className="text-2xl font-medium tracking-tight text-foreground">{dictionary.aboutPage.experience}</h2>
          <div className="mt-7"><TimelineList items={experiences} locale={locale} emptyMessage={dictionary.empty.experience} /></div>
        </section>
        <section aria-labelledby="education-title">
          <h2 id="education-title" className="text-2xl font-medium tracking-tight text-foreground">{dictionary.aboutPage.education}</h2>
          <div className="mt-7"><TimelineList items={education} locale={locale} emptyMessage={dictionary.empty.education} /></div>
        </section>
      </div>
    </Container>
  );
}
