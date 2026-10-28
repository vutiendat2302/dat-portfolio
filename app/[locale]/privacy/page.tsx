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
      <Link
        href={localePath(locale, "")}
        className="link-underline rounded-sm font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        ← {locale === "vi" ? "Về trang chủ" : locale === "en" ? "Back to home" : "返回首頁"}
      </Link>

      <article className="mt-8 max-w-3xl">
        <SectionHeading
          title={dictionary.footer.privacyPolicy}
          description={privacy.updatedAt[locale]}
          level={1}
        />

        <div className="mt-10 border-t border-border pt-10 space-y-10">
          {privacy.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                {section.title[locale]}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base leading-relaxed text-foreground/85"
                >
                  {p[locale]}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
