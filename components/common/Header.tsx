import Link from "next/link";

import { Container } from "@/components/common/Container";
import { MobileMenu } from "@/components/common/MobileMenu";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { BlogTranslationEntry } from "@/lib/posts";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary;
  blogTranslations: BlogTranslationEntry[];
}

export function Header({ locale, dictionary, blogTranslations }: HeaderProps) {
  const navigation = [
    { label: dictionary.navigation.about, href: localePath(locale, "/about"), desktop: true },
    { label: dictionary.navigation.projects, href: localePath(locale, "/projects"), desktop: true },
    { label: dictionary.navigation.blog, href: localePath(locale, "/blog"), desktop: true },
    {
      label: dictionary.navigation.experience,
      href: localePath(locale, "/about#experience"),
      desktop: false,
    },
    {
      label: dictionary.navigation.contact,
      href: localePath(locale, "/#contact"),
      desktop: false,
    },
  ];

  return (
    <header className="theme-surface sticky top-0 z-50 border-b border-border bg-background/95">
      <Container className="relative flex min-h-16 items-center justify-between gap-5 py-2 sm:min-h-18">
        <Link
          href={localePath(locale)}
          className="rounded-sm text-lg font-semibold tracking-[-0.03em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="DAT Portfolio"
        >
          {profile.name.toUpperCase()}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav aria-label={dictionary.navigation.menu}>
            <ul className="flex items-center gap-x-5 text-sm text-muted lg:gap-x-7">
              {navigation.map((item) => (
                <li key={item.href} className={item.desktop ? "" : "hidden xl:block"}>
                  <Link
                    href={item.href}
                    className="link-underline rounded-sm py-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 border-l border-border pl-4">
            <LanguageSwitcher
              locale={locale}
              label={dictionary.language.label}
              blogTranslations={blogTranslations}
              compact
            />
            <ThemeSwitcher labels={dictionary.theme} compact />
          </div>
        </div>

        <MobileMenu
          locale={locale}
          dictionary={dictionary}
          links={navigation.map(({ label, href }) => ({ label, href }))}
          socialLinks={profile.socialLinks}
          blogTranslations={blogTranslations}
        />
      </Container>
    </header>
  );
}
