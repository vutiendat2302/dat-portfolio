"use client";

import { usePathname } from "next/navigation";

import {
  localeConfig,
  locales,
  isLocale,
  type Locale,
} from "@/i18n/config";
import type { BlogTranslationEntry } from "@/lib/posts";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  blogTranslations: BlogTranslationEntry[];
  compact?: boolean;
}

function getLocalizedPath(
  pathname: string,
  currentLocale: Locale,
  nextLocale: Locale,
  blogTranslations: BlogTranslationEntry[],
): string {
  const segments = pathname.split("/").filter(Boolean);
  const isBlogPost = segments[1] === "blog" && segments.length >= 3;

  if (isBlogPost) {
    const currentSlug = segments[2];
    const translation = blogTranslations.find(
      (entry) => entry.slugs[currentLocale] === currentSlug,
    );
    const nextSlug = translation?.slugs[nextLocale];

    return nextSlug ? `/${nextLocale}/blog/${nextSlug}` : `/${nextLocale}/blog`;
  }

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  segments[0] = nextLocale;
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({
  locale,
  label,
  blogTranslations,
  compact = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <label className={compact ? "block" : "grid gap-2"}>
      <span className={compact ? "sr-only" : "text-xs font-medium text-muted"}>
        {label}
      </span>
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value;

          if (isLocale(nextLocale)) {
            const nextPath = getLocalizedPath(pathname, locale, nextLocale, blogTranslations);
            window.location.href = new URL(
              `${nextPath}${window.location.hash}`,
              window.location.origin,
            ).toString();
          }
        }}
        aria-label={`${label}: ${localeConfig[locale].displayName}`}
        className="h-11 min-w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 md:h-9 md:min-w-18 md:text-xs"
      >
        {locales.map((optionLocale) => (
          <option key={optionLocale} value={optionLocale}>
            {compact
              ? localeConfig[optionLocale].shortLabel
              : localeConfig[optionLocale].displayName}
          </option>
        ))}
      </select>
    </label>
  );
}
