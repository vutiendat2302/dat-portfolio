export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  introduction: string;
  about: string[];
  location?: string;
  email?: string;
  socialLinks: SocialLink[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  technologies: string[];
  status: string;
  featured: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description?: string;
}
