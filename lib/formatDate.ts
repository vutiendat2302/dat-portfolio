import type { Locale } from "@/i18n/config";

const dateLocales: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
  "zh-TW": "zh-TW",
};

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
