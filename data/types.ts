import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: LocalizedText;
  introduction: LocalizedText;
  about: LocalizedText[];
  location?: string;
  email?: string;
  socialLinks: SocialLink[];
}

export interface Project {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText[];
  technologies: string[];
  status: LocalizedText;
  featured: boolean;
  image?: string;
  imageAlt?: LocalizedText;
  repositoryUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  category: LocalizedText;
  skills: string[];
}

export interface TimelineItem {
  title: LocalizedText;
  organization: LocalizedText;
  period: string;
  description?: LocalizedText;
}
