"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import type { SocialLink } from "@/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { BlogTranslationEntry } from "@/lib/posts";

interface MobileMenuProps {
  locale: Locale;
  dictionary: Dictionary;
  links: Array<{ label: string; href: string }>;
  socialLinks: SocialLink[];
  blogTranslations: BlogTranslationEntry[];
}

export function MobileMenu({
  locale,
  dictionary,
  links,
  socialLinks,
  blogTranslations,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? dictionary.navigation.closeMenu : dictionary.navigation.menu}
        className="grid size-11 place-items-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="font-mono text-lg" aria-hidden="true">
          {open ? "×" : "≡"}
        </span>
      </button>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-surface px-5 py-6 shadow-[0_16px_30px_var(--shadow-color)] motion-safe:animate-[menu-in_180ms_ease-out]"
      >
        <nav aria-label={dictionary.navigation.menu}>
          <ul className="grid">
            {links.map((link) => (
              <li key={link.href} className="border-b border-border last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
          <LanguageSwitcher
            locale={locale}
            label={dictionary.language.label}
            blogTranslations={blogTranslations}
          />
          <ThemeSwitcher labels={dictionary.theme} />
        </div>

        <div className="mt-6 flex flex-wrap gap-5 border-t border-border pt-5 text-sm text-muted">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="link-underline rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {link.label} ↗︎
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
