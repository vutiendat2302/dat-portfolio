import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DirectContactCards } from "@/components/contact/DirectContactCards";
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

function getSocialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("github")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }
  if (l.includes("linkedin")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
      </svg>
    );
  }
  if (l.includes("facebook")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (l.includes("instagram")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (l.includes("threads")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.186 24C5.518 24 0 18.673 0 12.005 0 5.337 5.518 0 12.186 0c6.643 0 11.793 5.309 11.793 11.968 0 .685-.058 1.365-.173 2.033h-4.372c.046-.35.07-.707.07-1.07 0-4.04-3.287-7.327-7.318-7.327-4.032 0-7.318 3.287-7.318 7.327 0 4.04 3.286 7.327 7.318 7.327 1.838 0 3.517-.68 4.802-1.803l3.084 3.084C17.653 22.84 15.034 24 12.186 24z" />
      </svg>
    );
  }
  if (l.includes("locket")) {
    return (
      <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className="size-4 shrink-0 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const labels = dictionary.contactPage;

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      <SectionHeading
        title={labels.title}
        description={labels.description}
        level={1}
      />

      <div className="mt-6 border-t border-border pt-6 sm:mt-6 sm:pt-6 space-y-6">
        {/* 1. Kênh liên hệ trực tiếp: Email & Số điện thoại */}
        <section aria-labelledby="direct-contact-title">
          <h2
            id="direct-contact-title"
            className="text-sm font-semibold uppercase text-muted"
          >
            {labels.directContact}
          </h2>

          <div className="mt-4">
            <DirectContactCards
              email={profile.email}
              phone={profile.phone}
              labels={{
                email: labels.email,
                phone: labels.phone,
                copy: labels.copy,
                copied: labels.copied,
                openEmail: labels.openEmail,
              }}
            />
          </div>
        </section>

        {/* 2. Mạng xã hội & Kỹ thuật: Đồng bộ phong cách với Footer */}
        <section aria-labelledby="social-links-title">
          <h2
            id="social-links-title"
            className="text-sm font-semibold uppercase text-muted"
          >
            {labels.social}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
            {profile.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={link.label}
              >
                {getSocialIcon(link.label)}
                <span>{link.label}</span>
                <span
                  className="text-xs text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
