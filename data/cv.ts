import type { LocalizedText } from "@/data/types";
import cvData from "@/data/translations/cv.json";

export interface CvContact {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface CvEducation {
  institution: LocalizedText;
  location: LocalizedText;
  period: LocalizedText;
  degree: LocalizedText;
  coursework: LocalizedText;
}

export interface CvExperienceProject {
  name: LocalizedText;
  githubUrl: string;
  technologies: string;
  highlights: LocalizedText[];
}

export interface CvExperienceItem {
  role: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  project: CvExperienceProject;
}

export interface CvProjectItem {
  name: LocalizedText;
  githubUrl: string;
  technologies: string;
  highlights: LocalizedText[];
}

export interface CvSkillItem {
  category: LocalizedText;
  skills: string;
}

export interface CvData {
  name: LocalizedText;
  contact: CvContact;
  profile: LocalizedText[];
  education: CvEducation;
  experience: CvExperienceItem[];
  projects: CvProjectItem[];
  skills: CvSkillItem[];
  activities: LocalizedText[];
}

export const cv: CvData = cvData as unknown as CvData;
