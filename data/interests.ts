import type { LocalizedText } from "@/data/types";

export interface SimpleInterest {
  emoji: string;
  name: LocalizedText;
}

export const simpleInterests: SimpleInterest[] = [
  {
    emoji: "🏃",
    name: {
      vi: "Chạy bộ",
      en: "Running",
      "zh-TW": "慢跑",
    },
  },
  {
    emoji: "🏋️",
    name: {
      vi: "Gym",
      en: "Gym",
      "zh-TW": "健身",
    },
  },
  {
    emoji: "⚽",
    name: {
      vi: "Đá bóng",
      en: "Football",
      "zh-TW": "足球",
    },
  },
  {
    emoji: "📷",
    name: {
      vi: "Chụp ảnh",
      en: "Photography",
      "zh-TW": "攝影",
    },
  },
  {
    emoji: "🎸",
    name: {
      vi: "Đánh đàn",
      en: "Guitar & Music",
      "zh-TW": "彈琴",
    },
  },
];
