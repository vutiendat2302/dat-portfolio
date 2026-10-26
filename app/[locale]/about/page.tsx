import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { FormattedText } from "@/components/common/FormattedText";
import { InterestList } from "@/components/common/InterestList";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  aboutContext,
  aboutFocusAreas,
  aboutPerspective,
  aboutPrinciples,
} from "@/data/about";
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
      <div className="mt-12 border-t border-border pt-10 sm:mt-14">
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {profile.about.map((paragraph, index) => (
            <p key={index}>
              <FormattedText text={paragraph[locale]} />
            </p>
          ))}
        </div>
      </div>

      {/* 3. Bối cảnh */}
      <section
        id="context"
        className="mt-14 border-t border-border pt-10 sm:mt-16"
        aria-labelledby="context-title"
      >
        <h2
          id="context-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.context}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {aboutContext.map((item, index) => (
            <p key={index}>
              <FormattedText text={item[locale]} />
            </p>
          ))}
        </div>
      </section>

      {/* 4. Sở thích */}
      <section
        id="interests"
        className="mt-14 border-t border-border pt-10 sm:mt-16"
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

      {/* 5. Góc nhìn */}
      <section
        id="perspective"
        className="mt-14 border-t border-border pt-10 sm:mt-16"
        aria-labelledby="perspective-title"
      >
        <h2
          id="perspective-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.perspective}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
          {aboutPerspective.map((item, index) => (
            <p key={index}>
              <FormattedText text={item[locale]} />
            </p>
          ))}
        </div>
      </section>

      {/* 6. Quan điểm */}
      <section
        id="principles"
        className="mt-14 border-t border-border pt-10 sm:mt-16"
        aria-labelledby="principles-title"
      >
        <h2
          id="principles-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.principles}
        </h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {aboutPrinciples.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <h3 className="text-base font-medium text-foreground sm:text-lg">
                {item.title[locale]}
              </h3>
              <p className="text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
                {item.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Chủ đề quan tâm */}
      <section
        id="focus-areas"
        className="mt-14 border-t border-border pt-10 sm:mt-16"
        aria-labelledby="focus-title"
      >
        <h2
          id="focus-title"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {dictionary.aboutPage.focusAreas}
        </h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {aboutFocusAreas.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <h3 className="text-base font-medium text-foreground sm:text-lg">
                {item.title[locale]}
              </h3>
              <p className="text-base leading-relaxed text-muted sm:text-lg sm:leading-8">
                {item.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
