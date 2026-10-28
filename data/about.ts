import type { LocalizedText } from "@/data/types";
import aboutData from "@/data/translations/about.json";

export interface FocusArea {
  name: LocalizedText;
  emoji?: string;
}

export interface Certificate {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  year?: string;
  category: LocalizedText;
  file: string;
  fileType: "image" | "pdf";
}

export const aboutPrinciples: LocalizedText[] = aboutData.principles as LocalizedText[];
export const aboutFocusAreas: FocusArea[] = aboutData.focusAreas as FocusArea[];
export const certificates: Certificate[] = (aboutData.achievements || []) as Certificate[];
