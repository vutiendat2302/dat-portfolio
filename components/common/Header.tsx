import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/Container";
import { HeaderNav, type NavItem } from "@/components/common/HeaderNav";
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
  // Thứ tự menu: Home, Projects, Blog, About, Contact, CV
  const navigation: NavItem[] = [
    { label: dictionary.navigation.home, href: localePath(locale, "") },
    { label: dictionary.navigation.projects, href: localePath(locale, "/projects") },
    { label: dictionary.navigation.blog, href: localePath(locale, "/blog") },
    { label: dictionary.navigation.about, href: localePath(locale, "/about") },
    { label: dictionary.navigation.contact, href: localePath(locale, "/contact") },
    { label: dictionary.navigation.cv, href: localePath(locale, "/cv") },
  ];

  return (
    <header className="theme-surface sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <Container className="relative flex min-h-16 items-center justify-between gap-5 py-2 sm:min-h-18">
        {/* Logo Hình ảnh */}
        <Link
          href={localePath(locale, "")}
          className="group flex items-center rounded-sm transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label={`${profile.name[locale]} Portfolio`}
        >
          {/* Logo chữ đen dùng cho Light Theme (nền trắng) */}
          <Image
            src="/images/logo_text_ngang_full.png"
            alt={`${profile.name[locale]} Logo`}
            width={130}
            height={43}
            priority
            className="header-logo-light h-8 w-auto object-contain sm:h-9"
          />
          {/* Logo chữ trắng dùng cho Dark Theme (nền đen) */}
          <Image
            src="/images/logo_text_nang_den_full.png"
            alt={`${profile.name[locale]} Logo`}
            width={130}
            height={43}
            priority
            className="header-logo-dark h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex">
          <HeaderNav
            items={navigation}
            locale={locale}
            ariaLabel={dictionary.navigation.menu}
          />

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

        {/* Mobile Navigation */}
        <MobileMenu
          locale={locale}
          dictionary={dictionary}
          links={navigation}
          socialLinks={profile.socialLinks}
          blogTranslations={blogTranslations}
        />
      </Container>
    </header>
  );
}
