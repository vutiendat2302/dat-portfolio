import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: LocalizedText;
  initials: string;
  role: LocalizedText;
  introduction: LocalizedText;
  about: LocalizedText[];
  location?: LocalizedText | string;
  email?: string;
  phone?: string;
  socialLinks: SocialLink[];
  activities?: LocalizedText[];
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
  highlights?: LocalizedText[];
  period?: string;
}

export interface SkillGroup {
  category: LocalizedText;
  skills: string[];
}

export interface TimelineItem {
  title: LocalizedText;
  organization: LocalizedText;
  period: string;
  location?: LocalizedText | string;
  gpa?: string;
  coursework?: LocalizedText;
  projectName?: LocalizedText;
  projectUrl?: string;
  technologies?: string[];
  description?: LocalizedText;
  highlights?: LocalizedText[];
}
