import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CertificateGallery } from "@/components/about/CertificateGallery";
import { Container } from "@/components/common/Container";
import { FormattedText } from "@/components/common/FormattedText";
import { InterestList } from "@/components/common/InterestList";
import { SectionHeading } from "@/components/common/SectionHeading";
import { aboutFocusAreas, aboutPrinciples, certificates } from "@/data/about";
import { profile } from "@/data/profile";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({
    title: dictionary.metadata.aboutTitle,
    description: dictionary.metadata.aboutDescription,
    locale,
    path: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* 1. Thông tin cá nhân (Header) */}
      <SectionHeading
        title={dictionary.aboutPage.title}
        description={dictionary.aboutPage.description}
        level={1}
      />

      {/* 2. Phần giới thiệu cá nhân ban đầu (profile.about) */}
      <div className="mt-6 border-t border-border pt-6 sm:mt-10">
        <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {profile.about.map((paragraph, index) => (
            <p key={index}>
              <FormattedText text={paragraph[locale]} />
            </p>
          ))}
        </div>
      </div>

      {/* 3. Sở thích */}
      <section
        id="interests"
        className="mt-6 border-t border-border pt-6 sm:mt-6"
        aria-labelledby="interests-title"
      >
        <h2
          id="interests-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.interests}
        </h2>
        <div className="mt-6">
          <InterestList locale={locale} />
        </div>
      </section>

      {/* 4. Quan điểm */}
      <section
        id="principles"
        className="mt-6 border-t border-border pt-6 sm:mt-6"
        aria-labelledby="principles-title"
      >
        <h2
          id="principles-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.principles}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {aboutPrinciples.map((paragraph, index) => (
            <p key={index}>
              <FormattedText text={paragraph[locale] || paragraph.vi} />
            </p>
          ))}
        </div>
      </section>

      {/* 5. Chủ đề quan tâm */}
      <section
        id="focus-areas"
        className="mt-6 border-t border-border pt-6 sm:mt-6"
        aria-labelledby="focus-title"
      >
        <h2
          id="focus-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.focusAreas}
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
          {aboutFocusAreas.map((item) => (
            <span
              key={item.name[locale]}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-2xs transition-colors hover:border-accent hover:text-accent"
            >
              {item.emoji && (
                <span className="text-base select-none" aria-hidden="true">
                  {item.emoji}
                </span>
              )}
              <span>{item.name[locale]}</span>
            </span>
          ))}
        </div>
      </section>

      {/* 6. Album ảnh */}
      <section
        id="album"
        className="mt-6 border-t border-border pt-6 sm:mt-6"
        aria-labelledby="album-title"
      >
        <h2
          id="album-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.album}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {dictionary.aboutPage.albumDescription}
        </p>
        <div className="mt-6">
          <a
            href="https://photos.app.goo.gl/vkkN7eCtBJ9x4zow8"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-2xs transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-xs active:scale-[0.98]"
          >
            <span className="text-base select-none" aria-hidden="true">
              📸
            </span>
            <span>{dictionary.aboutPage.albumButton}</span>
            <span
              className="text-xs text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </section>

      {/* 7. Thành tích & Chứng nhận */}
      <section
        id="achievements"
        className="mt-6 border-t border-border pt-6 sm:mt-6"
        aria-labelledby="achievements-title"
      >
        <h2
          id="achievements-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.achievements}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {dictionary.aboutPage.achievementsDescription}
        </p>
        <CertificateGallery items={certificates} locale={locale} />
      </section>
    </Container>
  );
}
