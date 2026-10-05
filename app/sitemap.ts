import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";
import { localeConfig, localePath, locales, type Locale } from "@/i18n/config";
import { getPostAlternatePaths, getPublishedPosts } from "@/lib/posts";

function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

function alternateLanguages(paths: Partial<Record<Locale, string>>): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const path = paths[locale];

    if (path) {
      languages[localeConfig[locale].htmlLang] = absoluteUrl(path);
    }
  }

  return languages;
}

function localizedPaths(path = ""): Record<Locale, string> {
  return {
    vi: localePath("vi", path),
    en: localePath("en", path),
    "zh-TW": localePath("zh-TW", path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/blog"];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) => {
    const paths = localizedPaths(route);
    return locales.map((locale) => ({
      url: absoluteUrl(paths[locale]),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: { languages: alternateLanguages(paths) },
    }));
  });

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const paths = localizedPaths(`/projects/${project.slug}`);
    return locales.map((locale) => ({
      url: absoluteUrl(paths[locale]),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: alternateLanguages(paths) },
    }));
  });

  const postEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => {
      const paths = getPostAlternatePaths(post);
      return {
        url: absoluteUrl(localePath(locale, `/blog/${post.slug}`)),
        lastModified: new Date(`${post.updatedAt ?? post.date}T00:00:00.000Z`),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: alternateLanguages(paths) },
      };
    }),
  );

  return [...staticEntries, ...projectEntries, ...postEntries];
}
