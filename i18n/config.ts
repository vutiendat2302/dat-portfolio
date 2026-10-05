export const locales = ["vi", "en", "zh-TW"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeConfig: Record<
  Locale,
  { shortLabel: string; displayName: string; htmlLang: string; openGraphLocale: string }
> = {
  vi: {
    shortLabel: "VI",
    displayName: "Tiếng Việt",
    htmlLang: "vi",
    openGraphLocale: "vi_VN",
  },
  en: {
    shortLabel: "EN",
    displayName: "English",
    htmlLang: "en",
    openGraphLocale: "en_US",
  },
  "zh-TW": {
    shortLabel: "繁中",
    displayName: "繁體中文",
    htmlLang: "zh-TW",
    openGraphLocale: "zh_TW",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localePath(locale: Locale, path = ""): string {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}
