import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";
import { getPublishedPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = ["/", "/about", "/projects", "/blog"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
    lastModified: new Date(`${post.updatedAt ?? post.date}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
