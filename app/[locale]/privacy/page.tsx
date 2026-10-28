import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { privacy } from "@/data/privacy";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({
    title: dictionary.metadata.privacyTitle,
    description: dictionary.metadata.privacyDescription,
    locale,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Header section with SectionHeading on left and Back to home button on right */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeading
          title={dictionary.footer.privacyPolicy}
          description={privacy.updatedAt[locale]}
          level={1}
        />

        <Link
          href={localePath(locale, "")}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer"
        >
          <span aria-hidden="true">←</span>
          <span>{dictionary.notFound.home}</span>
        </Link>
      </div>

      {/* Main Privacy content: full container width */}
      <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-6 space-y-6 sm:space-y-6">
        {privacy.sections.map((section, idx) => (
          <section key={idx} className="space-y-3.5">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
              {section.title[locale]}
            </h2>
            <div className="space-y-3">
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-lg leading-relaxed text-muted sm:leading-8"
                >
                  {p[locale]}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
