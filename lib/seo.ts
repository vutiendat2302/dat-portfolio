import type { Metadata } from "next";

import { getSiteUrl, siteConfig } from "@/data/site";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export function createMetadata({
  title,
  description,
  path,
  type = "website",
}: CreateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = new URL(path, getSiteUrl());

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
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
