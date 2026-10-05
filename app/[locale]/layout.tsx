import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSiteUrl, siteConfig } from "@/data/site";
import { isLocale, localeConfig, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getBlogTranslations } from "@/lib/posts";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = getDictionary(localeParam);
  const canonical = new URL(localePath(localeParam), getSiteUrl());
  const languages = {
    vi: new URL(localePath("vi"), getSiteUrl()).toString(),
    en: new URL(localePath("en"), getSiteUrl()).toString(),
    "zh-TW": new URL(localePath("zh-TW"), getSiteUrl()).toString(),
  };

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: dictionary.metadata.homeTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: dictionary.metadata.siteDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: localeConfig[localeParam].openGraphLocale,
      siteName: siteConfig.title,
      title: dictionary.metadata.homeTitle,
      description: dictionary.metadata.siteDescription,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.homeTitle,
      description: dictionary.metadata.siteDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dictionary = getDictionary(localeParam);
  const blogTranslations = getBlogTranslations();

  return (
    <html lang={localeConfig[localeParam].htmlLang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header
              locale={localeParam}
              dictionary={dictionary}
              blogTranslations={blogTranslations}
            />
            <main className="flex-1">{children}</main>
            <Footer locale={localeParam} dictionary={dictionary} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
