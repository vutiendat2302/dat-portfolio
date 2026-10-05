import type { Profile } from "@/data/types";

export const profile: Profile = {
  name: "Dat",
  initials: "D",
  role: {
    vi: "Kỹ sư phần mềm",
    en: "Software Engineer",
    "zh-TW": "軟體工程師",
  },
  introduction: {
    vi: "Nơi mình giới thiệu những gì đang xây dựng và ghi lại kiến thức trong quá trình học tập.",
    en: "A place where I share what I am building and document what I learn along the way.",
    "zh-TW": "這裡記錄我正在打造的產品，以及一路上的學習與技術心得。",
  },
  about: [
    {
      vi: "DAT Portfolio là website cá nhân được xây dựng theo hướng tối giản, ưu tiên nội dung và tốc độ.",
      en: "DAT Portfolio is a personal website built with a minimal, content-first, and performance-focused approach.",
      "zh-TW": "DAT Portfolio 是一個重視簡潔、內容與效能的個人網站。",
    },
    {
      vi: "Thông tin về kinh nghiệm, học vấn và định hướng cá nhân sẽ được bổ sung khi nội dung sẵn sàng.",
      en: "Experience, education, and personal direction will be added when the content is ready.",
      "zh-TW": "經歷、學歷與個人方向將在內容準備完成後補上。",
    },
  ],
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/vutiendat2302",
    },
  ],
};
