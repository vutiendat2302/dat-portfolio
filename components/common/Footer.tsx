import { Container } from "@/components/common/Container";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface FooterProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Footer({ locale, dictionary }: FooterProps) {
  return (
    <footer className="theme-surface border-t border-border bg-surface py-8 text-sm text-muted">
      <Container className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1">{profile.role[locale]}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-wrap gap-5">
            {profile.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label} ↗︎
              </a>
            ))}
          </div>
          <p className="text-xs text-subtle">
            {dictionary.footer.builtWith} · © {new Date().getUTCFullYear()} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
