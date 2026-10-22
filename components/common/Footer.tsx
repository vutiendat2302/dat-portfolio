import Link from "next/link";

import { Container } from "@/components/common/Container";
import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface FooterProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Footer({ locale, dictionary }: FooterProps) {
  const githubLink =
    profile.socialLinks.find((l) => l.label.toLowerCase().includes("github"))?.href ||
    "https://github.com/vutiendat2302";

  const linkedinLink =
    profile.socialLinks.find((l) => l.label.toLowerCase().includes("linkedin"))?.href ||
    "https://www.linkedin.com/in/dat-vu-tien-8b492b35b/";

  const email = profile.email || "vutiendat23022005@gmail.com";

  return (
    <footer className="theme-surface border-t border-border bg-surface py-6 text-sm text-muted">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: GitHub & LinkedIn */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="GitHub"
          >
            <svg
              className="size-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href={linkedinLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="LinkedIn"
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
        </div>

        {/* Right: Professional Copyright, Email & Privacy Policy line */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-subtle">
          <span className="font-medium text-subtle">Copyright@2026</span>
          <span className="text-border-strong select-none">•</span>
          <a
            href={`mailto:${email}`}
            className="transition-colors hover:text-accent hover:underline underline-offset-4"
          >
            {email}
          </a>
          <span className="text-border-strong select-none">•</span>
          <Link
            href={localePath(locale, "/privacy")}
            className="transition-colors hover:text-accent hover:underline underline-offset-4"
          >
            {dictionary.footer.privacyPolicy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
