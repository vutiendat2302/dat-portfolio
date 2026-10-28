import type { LocalizedText } from "@/data/types";
import privacyData from "@/data/translations/privacy.json";

export interface PrivacySection {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

export interface PrivacyData {
  updatedAt: LocalizedText;
  sections: PrivacySection[];
}

export const privacy: PrivacyData = privacyData as unknown as PrivacyData;
