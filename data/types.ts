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

export interface PhotoExif {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string | number;
  focalLength?: string;
}

export interface PhotoExtra {
  software?: string;
  dimensions?: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  title: LocalizedText;
  date: string;
  location: LocalizedText;
  story?: LocalizedText;
  exif?: PhotoExif;
  extra?: PhotoExtra;
  tags?: LocalizedText[];
  aspectRatio?: "square" | "portrait" | "landscape";
  width?: number;
  height?: number;
}

export interface PhotoAlbum {
  id: string;
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  story?: LocalizedText;
  category: "me" | "everyone";
  year: string;
  date?: LocalizedText;
  location?: LocalizedText;
  camera?: string;
  lens?: string;
  stats?: LocalizedText;
  coverImage: string;
  photos: PhotoItem[];
}

