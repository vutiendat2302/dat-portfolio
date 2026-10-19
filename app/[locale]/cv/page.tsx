import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { CvActions } from "@/components/cv/CvActions";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { formatPeriod } from "@/lib/formatDate";
import { createMetadata } from "@/lib/seo";

interface CvPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.metadata.cvTitle,
    description: dictionary.metadata.cvDescription,
    locale,
    path: "/cv",
  });
}

function resolveText(text: string | Record<Locale, string> | undefined, locale: Locale): string {
  if (!text) return "";
  if (typeof text === "string") return text;
  return text[locale] || text.vi || "";
}

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  // Technical projects from data
  const technicalProjects = projects.filter((p) => p.slug !== "dat-portfolio");

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Top Bar with Title and Actions (hidden on print) */}
      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            {dictionary.cvPage.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dictionary.cvPage.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {dictionary.cvPage.description}
          </p>
        </div>

        <CvActions
          printLabel={dictionary.cvPage.print}
          downloadLabel={dictionary.cvPage.downloadPdf}
        />
      </div>

      {/* Printable Resume Sheet - Formatted to match CV_example.pdf */}
      <article className="mx-auto max-w-4xl rounded-xl border border-border bg-surface p-4 sm:p-8 lg:p-12 shadow-xs print:max-w-none print:border-none print:bg-transparent print:p-0 print:shadow-none text-foreground font-sans">
        
        {/* Header: Centered Name & Contact Info */}
        <header className="text-center border-b border-border/60 pb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-foreground">
            {locale === "vi" ? (
              profile.name.vi.toUpperCase()
            ) : locale === "en" ? (
              <>
                VU TIEN DAT{" "}
                <span className="block sm:inline sm:ml-2 text-base sm:text-xl font-medium text-muted">
                  ({profile.name.en})
                </span>
              </>
            ) : (
              <>
                {profile.name["zh-TW"]}{" "}
                <span className="block sm:inline sm:ml-2 text-base sm:text-xl font-medium text-muted">
                  (VU TIEN DAT)
                </span>
              </>
            )}
          </h2>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-muted">
            {/* GitHub */}
            {profile.socialLinks.find((l) => l.label.toLowerCase().includes("github")) ? (
              <a
                href={profile.socialLinks.find((l) => l.label.toLowerCase().includes("github"))?.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground hover:text-accent hover:underline transition-colors"
              >
                <svg
                  className="size-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            ) : null}

            <span className="hidden sm:inline text-border-strong font-mono">|</span>

            {/* LinkedIn */}
            {profile.socialLinks.find((l) => l.label.toLowerCase().includes("linkedin")) ? (
              <a
                href={profile.socialLinks.find((l) => l.label.toLowerCase().includes("linkedin"))?.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground hover:text-accent hover:underline transition-colors"
              >
                <svg
                  className="size-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            ) : null}

            {profile.email ? (
              <>
                <span className="hidden sm:inline text-border-strong font-mono">|</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent hover:underline transition-colors"
                >
                  <svg
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{profile.email}</span>
                </a>
              </>
            ) : null}

            {profile.phone ? (
              <>
                <span className="hidden sm:inline text-border-strong font-mono">|</span>
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent hover:underline transition-colors"
                >
                  <svg
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{profile.phone}</span>
                </a>
              </>
            ) : null}
          </div>
        </header>

        {/* 1. Profile Section */}
        <section className="mt-5" aria-labelledby="section-profile">
          <div className="border-b border-foreground/35 pb-1">
            <h3
              id="section-profile"
              className="text-base font-bold uppercase tracking-wider text-foreground"
            >
              {dictionary.cvPage.summary}
            </h3>
          </div>
          <ul className="mt-2.5 list-disc ml-5 space-y-1.5 text-xs sm:text-sm text-foreground/90 leading-relaxed marker:text-foreground/60">
            {profile.about.map((paragraph, index) => (
              <li key={index}>{paragraph[locale]}</li>
            ))}
          </ul>
        </section>

        {/* 2. Education Section */}
        <section className="mt-6" aria-labelledby="section-education">
          <div className="border-b border-foreground/35 pb-1">
            <h3
              id="section-education"
              className="text-base font-bold uppercase tracking-wider text-foreground"
            >
              {dictionary.cvPage.education}
            </h3>
          </div>

          <div className="mt-2.5 space-y-4">
            {education.map((item, index) => (
              <div key={index} className="text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-0.5 gap-x-4">
                  <span className="font-bold text-foreground">
                    {item.organization[locale]}
                  </span>
                  <span className="text-xs sm:text-sm text-muted">
                    {resolveText(item.location, locale)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-0.5 gap-x-4 mt-0.5">
                  <span className="italic font-medium text-foreground/90">
                    {item.title[locale]}{item.gpa ? `. GPA: [${item.gpa}]` : ""}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground/90 font-mono">
                    {formatPeriod(item.period, locale)}
                  </span>
                </div>
                {item.coursework ? (
                  <ul className="mt-1.5 list-disc ml-5 text-xs sm:text-sm text-foreground/85 leading-relaxed marker:text-foreground/60">
                    <li>{item.coursework[locale]}</li>
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Experience Section */}
        <section className="mt-6" aria-labelledby="section-experience">
          <div className="border-b border-foreground/35 pb-1">
            <h3
              id="section-experience"
              className="text-base font-bold uppercase tracking-wider text-foreground"
            >
              {dictionary.cvPage.experience}
            </h3>
          </div>

          <div className="mt-2.5 space-y-4">
            {experiences.map((item, index) => (
              <div key={index} className="text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-0.5 gap-x-4">
                  <span className="font-bold text-foreground">
                    {item.title[locale]}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-foreground/90 font-mono">
                    {formatPeriod(item.period, locale)}
                  </span>
                </div>
                <p className="font-medium text-muted mt-0.5">
                  {item.organization[locale]}
                </p>

                {item.projectName ? (
                  <div className="mt-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <span className="text-foreground/60">•</span>
                      <span>{item.projectName[locale]}</span>
                      {item.projectUrl ? (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-accent hover:underline font-mono ml-1 print:hidden"
                        >
                          [GitHub ↗]
                        </a>
                      ) : null}
                    </p>

                    {item.technologies && item.technologies.length > 0 ? (
                      <p className="mt-0.5 ml-4 text-xs text-muted italic">
                        {item.technologies.join(", ")}
                      </p>
                    ) : null}

                    {item.highlights && item.highlights.length > 0 ? (
                      <ul className="mt-1.5 ml-4 space-y-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        {item.highlights.map((highlight, hIndex) => (
                          <li
                            key={hIndex}
                            className="relative pl-3.5 before:content-['–'] before:absolute before:left-0 before:text-foreground/60"
                          >
                            {highlight[locale]}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Technical Experience / Projects */}
        <section className="mt-6" aria-labelledby="section-projects">
          <div className="border-b border-foreground/35 pb-1">
            <h3
              id="section-projects"
              className="text-base font-bold uppercase tracking-wider text-foreground"
            >
              {dictionary.cvPage.projects}
            </h3>
          </div>

          <div className="mt-2.5 space-y-4">
            {technicalProjects.map((project) => (
              <div key={project.slug} className="text-xs sm:text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="text-foreground/60">•</span>
                    <span>{project.title[locale]}</span>
                    {project.repositoryUrl ? (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-accent hover:underline font-mono ml-1 print:hidden"
                      >
                        [GitHub ↗]
                      </a>
                    ) : null}
                  </p>
                </div>

                {project.technologies && project.technologies.length > 0 ? (
                  <p className="mt-0.5 ml-4 text-xs text-muted italic">
                    {project.technologies.join(", ")}
                  </p>
                ) : null}

                {project.highlights && project.highlights.length > 0 ? (
                  <ul className="mt-1.5 ml-4 space-y-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    {project.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="relative pl-3.5 before:content-['–'] before:absolute before:left-0 before:text-foreground/60"
                      >
                        {highlight[locale]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-1.5 ml-4 space-y-1 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    {project.description.map((desc, dIndex) => (
                      <li
                        key={dIndex}
                        className="relative pl-3.5 before:content-['–'] before:absolute before:left-0 before:text-foreground/60"
                      >
                        {desc[locale]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Languages and Technologies */}
        <section className="mt-6" aria-labelledby="section-skills">
          <div className="border-b border-foreground/35 pb-1">
            <h3
              id="section-skills"
              className="text-base font-bold uppercase tracking-wider text-foreground"
            >
              {dictionary.cvPage.skills}
            </h3>
          </div>

          <ul className="mt-2.5 list-disc ml-5 space-y-1.5 text-xs sm:text-sm text-foreground/90 leading-relaxed marker:text-foreground/60">
            {skillGroups.map((group, index) => (
              <li key={index}>
                <span className="font-semibold text-foreground">
                  {group.category[locale]}:
                </span>{" "}
                <span className="text-foreground/85">
                  {group.skills.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Activities & Awards */}
        {profile.activities && profile.activities.length > 0 ? (
          <section className="mt-6" aria-labelledby="section-activities">
            <div className="border-b border-foreground/35 pb-1">
              <h3
                id="section-activities"
                className="text-base font-bold uppercase tracking-wider text-foreground"
              >
                {dictionary.cvPage.activities}
              </h3>
            </div>

            <ul className="mt-2.5 list-disc ml-5 space-y-1.5 text-xs sm:text-sm text-foreground/90 leading-relaxed marker:text-foreground/60">
              {profile.activities.map((activity, index) => (
                <li key={index}>{activity[locale]}</li>
              ))}
            </ul>
          </section>
        ) : null}

      </article>
    </Container>
  );
}
