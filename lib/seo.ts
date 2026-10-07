import type { Metadata } from "next";

import { getSiteUrl, siteConfig } from "@/data/site";
import { localeConfig, localePath, locales, type Locale } from "@/i18n/config";

interface CreateMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  type?: "website" | "article";
  alternatePaths?: Partial<Record<Locale, string>>;
  canonicalPath?: string;
}

export function getLocaleAlternatePaths(path = ""): Record<Locale, string> {
  return {
    vi: localePath("vi", path),
    en: localePath("en", path),
    "zh-TW": localePath("zh-TW", path),
  };
}

export function createMetadata({
  title,
  description,
  locale,
  path,
  type = "website",
  alternatePaths = getLocaleAlternatePaths(path),
  canonicalPath,
}: CreateMetadataOptions): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const url = new URL(canonicalPath ?? localePath(locale, path), getSiteUrl());
  const languages: Record<string, string> = {};

  for (const alternateLocale of locales) {
    const alternatePath = alternatePaths[alternateLocale];

    if (alternatePath) {
      languages[localeConfig[alternateLocale].htmlLang] = new URL(
        alternatePath,
        getSiteUrl(),
      ).toString();
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: url.toString(),
      languages,
    },
    openGraph: {
      type,
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locales
        .filter(
          (alternateLocale) =>
            alternateLocale !== locale && Boolean(alternatePaths[alternateLocale]),
        )
        .map((alternateLocale) => localeConfig[alternateLocale].openGraphLocale),
      siteName: siteConfig.title,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
