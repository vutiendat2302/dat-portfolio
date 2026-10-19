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

export function formatPeriod(period: string, locale: Locale): string {
  if (!period) return "";
  if (locale === "vi") {
    return period
      .replace(/Jan(?:uary)?/gi, "01/")
      .replace(/Feb(?:ruary)?/gi, "02/")
      .replace(/Mar(?:ch)?/gi, "03/")
      .replace(/Apr(?:il)?/gi, "04/")
      .replace(/May/gi, "05/")
      .replace(/Jun(?:e)?/gi, "06/")
      .replace(/Jul(?:y)?/gi, "07/")
      .replace(/Aug(?:ust)?/gi, "08/")
      .replace(/Sep(?:tember)?/gi, "09/")
      .replace(/Oct(?:ober)?/gi, "10/")
      .replace(/Nov(?:ember)?/gi, "11/")
      .replace(/Dec(?:ember)?/gi, "12/")
      .replace(/\s+/g, " ")
      .replace(/Present/gi, "Hiện tại");
  }
  if (locale === "zh-TW") {
    return period
      .replace(/Jan(?:uary)?/gi, "1月")
      .replace(/Feb(?:ruary)?/gi, "2月")
      .replace(/Mar(?:ch)?/gi, "3月")
      .replace(/Apr(?:il)?/gi, "4月")
      .replace(/May/gi, "5月")
      .replace(/Jun(?:e)?/gi, "6月")
      .replace(/Jul(?:y)?/gi, "7月")
      .replace(/Aug(?:ust)?/gi, "8月")
      .replace(/Sep(?:tember)?/gi, "9月")
      .replace(/Oct(?:ober)?/gi, "10月")
      .replace(/Nov(?:ember)?/gi, "11月")
      .replace(/Dec(?:ember)?/gi, "12月")
      .replace(/Present/gi, "目前");
  }
  return period;
}
