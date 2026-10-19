import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);

  return createMetadata({
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription,
    locale,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const labels = dictionary.contactPage;

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      <SectionHeading
        eyebrow={labels.eyebrow}
        title={labels.title}
        description={labels.description}
        level={1}
      />

      <div className="mt-12 grid gap-12 border-t border-border pt-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        {/* Left column: Direct info & Availability */}
        <div className="space-y-8">
          {/* Direct channels */}
          <section aria-labelledby="direct-contact-title">
            <h2
              id="direct-contact-title"
              className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle"
            >
              {labels.directContact}
            </h2>

            <div className="mt-5 space-y-4">
              {profile.email && (
                <div className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {labels.email}
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1 block text-base font-medium text-foreground transition-colors hover:text-accent sm:text-lg break-all sm:break-normal"
                  >
                    {profile.email}
                  </a>
                </div>
              )}

              {profile.phone && (
                <div className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {labels.phone}
                  </p>
                  <a
                    href={`tel:${profile.phone}`}
                    className="mt-1 block text-base font-medium text-foreground transition-colors hover:text-accent sm:text-lg"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}

              {profile.location && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">
                    {labels.location}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground sm:text-lg">
                    {typeof profile.location === "string" ? profile.location : profile.location[locale]}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Availability Card */}
          <section
            aria-labelledby="availability-title"
            className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-5 dark:border-emerald-500/30 dark:bg-emerald-500/[0.06]"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <h2
                id="availability-title"
                className="text-sm font-semibold text-emerald-800 dark:text-emerald-300"
              >
                {labels.availabilityStatus}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              {labels.availabilityNotice}
            </p>
            <p className="mt-3 border-t border-emerald-500/10 pt-2.5 text-xs text-subtle dark:border-emerald-500/20">
              ⚡ {labels.responseTimeNotice}
            </p>
          </section>

          {/* Social Links */}
          <section aria-labelledby="social-links-title">
            <h2
              id="social-links-title"
              className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-subtle"
            >
              {labels.social}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between sm:inline-flex sm:justify-start gap-2 rounded-md border border-border bg-card px-3.5 py-2.5 sm:px-4 sm:py-2 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
                >
                  <span className="truncate">{link.label}</span>
                  <span
                    className="text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Interactive email form */}
        <div>
          <ContactForm
            recipientEmail={profile.email ?? "vutiendat23022005@gmail.com"}
            labels={labels}
          />
        </div>
      </div>
    </Container>
  );
}
