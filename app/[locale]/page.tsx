import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/common/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillList } from "@/components/common/SkillList";
import { TimelineList } from "@/components/common/TimelineList";
import { Hero } from "@/components/home/Hero";
import { ProjectCard } from "@/components/project/ProjectCard";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getPublishedPosts } from "@/lib/posts";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const latestPosts = getPublishedPosts(locale).slice(0, 3);

  return (
    <Container>
      <Hero locale={locale} dictionary={dictionary} />

      <section id="about" className="reveal grid gap-10 border-t border-border py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="about-title">
        <div id="about-title">
          <SectionHeading eyebrow={dictionary.sections.about.eyebrow} title={dictionary.sections.about.title} />
        </div>
        <div className="max-w-2xl space-y-5 text-base leading-8 text-muted sm:text-lg">
          {profile.about.map((paragraph) => <p key={paragraph[locale]}>{paragraph[locale]}</p>)}
          <Link href={localePath(locale, "/about")} className="link-underline inline-block rounded-sm pt-2 text-sm font-medium text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
            {dictionary.sections.about.more} →
          </Link>
        </div>
      </section>

      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="featured-projects-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="featured-projects-title">
            <SectionHeading eyebrow={dictionary.sections.projects.eyebrow} title={dictionary.sections.projects.title} description={dictionary.sections.projects.description} />
          </div>
          <Link href={localePath(locale, "/projects")} className="link-underline w-fit rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
            {dictionary.sections.projects.all} →
          </Link>
        </div>
        <div className="mt-12 border-b border-border">
          {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} locale={locale} dictionary={dictionary} />)}
        </div>
      </section>

      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="capabilities-title">
        <div id="capabilities-title">
          <SectionHeading eyebrow={dictionary.sections.capabilities.eyebrow} title={dictionary.sections.capabilities.title} description={dictionary.sections.capabilities.description} />
        </div>
        <div className="mt-10"><SkillList groups={skillGroups} locale={locale} emptyMessage={dictionary.empty.skills} /></div>
      </section>

      <section id="experience" className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="experience-title">
        <div id="experience-title"><SectionHeading eyebrow={dictionary.sections.experience.eyebrow} title={dictionary.sections.experience.title} /></div>
        <div className="mt-10"><TimelineList items={experiences} locale={locale} emptyMessage={dictionary.empty.experience} /></div>
      </section>

      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="education-title">
        <div id="education-title"><SectionHeading eyebrow={dictionary.sections.education.eyebrow} title={dictionary.sections.education.title} /></div>
        <div className="mt-10"><TimelineList items={education} locale={locale} emptyMessage={dictionary.empty.education} /></div>
      </section>

      <section className="reveal border-t border-border py-16 sm:py-24" aria-labelledby="latest-posts-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="latest-posts-title"><SectionHeading eyebrow={dictionary.sections.writing.eyebrow} title={dictionary.sections.writing.title} description={dictionary.sections.writing.description} /></div>
          <Link href={localePath(locale, "/blog")} className="link-underline w-fit rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">
            {dictionary.sections.writing.all} →
          </Link>
        </div>
        <div className="mt-12 border-b border-border">
          {latestPosts.length > 0 ? latestPosts.map((post) => <PostCard key={post.slug} post={post} locale={locale} dictionary={dictionary} />) : <EmptyState>{dictionary.empty.posts}</EmptyState>}
        </div>
      </section>

      <section id="contact" className="reveal grid gap-8 border-t border-border py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" aria-labelledby="contact-title">
        <div id="contact-title"><SectionHeading eyebrow={dictionary.sections.contact.eyebrow} title={dictionary.sections.contact.title} /></div>
        <div className="max-w-2xl">
          <p className="text-pretty text-base leading-8 text-muted sm:text-lg">{dictionary.sections.contact.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {profile.socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="link-underline rounded-sm text-sm font-medium text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">{link.label} ↗︎</a>)}
            {profile.email ? <a href={`mailto:${profile.email}`} className="link-underline rounded-sm text-sm font-medium text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4">Email ↗︎</a> : null}
          </div>
        </div>
      </section>
    </Container>
  );
}
