import type { LocalizedText } from "@/data/types";

export interface FocusArea {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  tags: string[];
}

export interface PrincipleItem {
  title: LocalizedText;
  description: LocalizedText;
}

export const aboutContext: LocalizedText[] = [
  {
    vi: "Mình sinh ra và lớn lên tại Hà Nội, hiện là sinh viên năm thứ 4 chuyên ngành Toán - Tin học tại [Trường Đại học Khoa học Tự nhiên](https://hus.vnu.edu.vn/), Đại học Quốc gia Hà Nội.",
    en: "Born and raised in Hanoi, I am currently a senior majoring in Mathematics and Computer Science at [VNU University of Science](https://hus.vnu.edu.vn/), Vietnam National University, Hanoi.",
    "zh-TW": "我在越南河內成長，目前就讀於[河內國家大學所屬自然科學大學](https://hus.vnu.edu.vn/)數學與資訊科學系四年級。",
  },
  {
    vi: "Xuất phát điểm từ Toán học đã định hình cách mình tiếp cận thế giới công nghệ: luôn muốn đào sâu vào bản chất bài toán, cơ sở lý thuyết và tính chặt chẽ của thuật toán trước khi viết dòng code đầu tiên.",
    en: "A strong foundation in mathematical thinking shaped how I approach software engineering: striving to understand problem fundamentals, theoretical underpinnings, and algorithmic soundness before writing code.",
    "zh-TW": "深厚的數學背景塑造了我理解技術世界的方式：在動筆撰寫第一行程式碼之前，總是習慣探究問題本質、理論根基與演算法的嚴謹性。",
  },
  {
    vi: "Trong suốt quá trình học tập và làm dự án, mình dần nhận ra niềm say mê lớn nhất của bản thân là biến những mô hình toán học và logic trừu tượng thành các sản phẩm phần mềm thực tế, ổn định và có giá trị sử dụng cao.",
    en: "Throughout my studies and technical projects, I discovered my greatest passion: transforming abstract mathematical logic into practical, reliable, and high-impact software systems.",
    "zh-TW": "在求學與專案開發歷程中，我逐漸確立了自己最熱衷的方向：將抽象的數學邏輯轉化為可靠、實用且具備高度價值的軟體系統。",
  },
];

export const aboutPerspective: LocalizedText[] = [
  {
    vi: "Công nghệ, thư viện và framework thay đổi liên tục, nhưng nền tảng cốt lõi — cấu trúc dữ liệu, giải thuật, mạng máy tính và tư duy kiến trúc hệ thống — là những giá trị có tính trường tồn.",
    en: "Frameworks and libraries evolve rapidly, but core fundamentals — data structures, algorithms, networking, and system architecture — remain timeless.",
    "zh-TW": "框架與工具日新月異，但核心基礎——資料結構、演算法、網路通訊與系統架構思維——始終具備持久的價值。",
  },
  {
    vi: "Một hệ thống tốt không chỉ dừng lại ở việc chạy đúng chức năng, mà cần được thiết kế rõ ràng, dễ bảo trì, có khả năng mở rộng (scalability) và giải quyết đúng bài toán thực tế mà người dùng gặp phải.",
    en: "Great software goes beyond merely working; it must be clean, maintainable, resilient under scale, and solve real-world problems effectively.",
    "zh-TW": "優秀的軟體系統不僅在於功能運作正確，更在於架構清晰、易於維護、具備良好的擴展性，並能切實解決真實世界的痛點。",
  },
  {
    vi: "Mình ưu tiên 'học sâu' hơn là học lướt: hiểu rõ cơ chế vận hành bên dưới (under the hood) của từng công cụ mình sử dụng thay vì chỉ dừng ở mức gọi API bên ngoài.",
    en: "I prioritize deep understanding over superficial breadth: digging into how tools operate under the hood rather than just consuming APIs.",
    "zh-TW": "我重視「深入底層」而非走馬看花：力求理解所使用工具的底層運作機制，而非僅停留在呼叫 API 的層次。",
  },
];

export const aboutPrinciples: PrincipleItem[] = [
  {
    title: {
      vi: "Tiến bộ từng ngày (Continuous Progress)",
      en: "Continuous Progress",
      "zh-TW": "持續積累與進步",
    },
    description: {
      vi: "Không cần phải hoàn hảo ngay từ đầu, nhưng cần sự tích lũy bền bỉ. Mình ghi lại những gì mình làm để nhìn lại và biết bản thân đang tốt hơn mỗi ngày.",
      en: "Perfection isn't required on day one; compounding consistency is. I document what I do so I can look back and see steady improvement over time.",
      "zh-TW": "無須在一開始就苛求完美，但必須保持長期的複利積累。記錄所學所做，是為了回顧時能看見自己正在穩步前行。",
    },
  },
  {
    title: {
      vi: "Kỷ luật tạo nên sự tự do",
      en: "Discipline Breeds Freedom",
      "zh-TW": "自律帶來自由",
    },
    description: {
      vi: "Sự nhất quán trong lối sống và rèn luyện thể chất (chạy bộ, gym, thể thao) là nền tảng giúp duy trì năng lượng và sự tập trung cao độ cho kỹ thuật.",
      en: "Consistency in daily habits and physical training (running, gym, sports) builds the endurance and mental stamina necessary for demanding technical work.",
      "zh-TW": "規律的生活作息與持之以恆的體能鍛鍊（慢跑、重訓、運動），是支撐高強度腦力工作與長期專注力的根本基石。",
    },
  },
  {
    title: {
      vi: "Trung thực với tri thức",
      en: "Intellectual Honesty",
      "zh-TW": "對知識保持誠實",
    },
    description: {
      vi: "Biết rõ những gì mình đã nắm vững và khiêm tốn thừa nhận những gì mình chưa biết để luôn giữ được tinh thần tò mò và học hỏi.",
      en: "Being clear about what I master and humble about what I don't know yet, staying curious and eager to learn from peers and the community.",
      "zh-TW": "清楚認知自己的能力邊界，對未知保持謙遜，並隨時準備向優秀的同儕與社群學習。",
    },
  },
];

export const aboutFocusAreas: FocusArea[] = [
  {
    id: "backend",
    title: {
      vi: "Kiến trúc Hệ thống & Kỹ thuật Backend",
      en: "System Architecture & Backend Engineering",
      "zh-TW": "系統架構與後端工程",
    },
    description: {
      vi: "Thiết kế RESTful APIs hiệu năng cao, tối ưu hóa cơ sở dữ liệu, giải pháp bộ nhớ đệm (caching), kiến trúc microservices và khả năng chịu tải.",
      en: "Designing high-performance RESTful APIs, database optimization, distributed caching, microservices, and reliable throughput under scale.",
      "zh-TW": "設計高吞吐量 RESTful API、資料庫最佳化、快取架構、微服務整合與高負載擴展能力。",
    },
    tags: ["Java Spring Boot", "FastAPI", "MySQL", "Redis", "Docker", "Microservices"],
  },
  {
    id: "ai-data",
    title: {
      vi: "Trí tuệ nhân tạo & Mô hình hóa Dữ liệu",
      en: "AI, RAG & Data Modeling",
      "zh-TW": "人工智慧與資料建模",
    },
    description: {
      vi: "Ứng dụng RAG, tìm kiếm ngữ nghĩa theo vector (Vector Search), embeddings và các mô hình dự báo chuỗi thời gian dựa trên đồ thị.",
      en: "Applying RAG, vector semantic search, embeddings, and graph-based models for spatiotemporal time-series forecasting.",
      "zh-TW": "實作 RAG 檢索增強生成、向量語意搜尋、Embedding 技術，以及應用於時空序列預測的圖類神經網路。",
    },
    tags: ["RAG", "Vector Search", "Qdrant", "Python", "PyTorch", "GNNs"],
  },
  {
    id: "optimization",
    title: {
      vi: "Toán học ứng dụng & Tối ưu hóa",
      en: "Applied Mathematics & Optimization",
      "zh-TW": "應用數學與最佳化",
    },
    description: {
      vi: "Mô hình hóa toán học, các bài toán tối ưu tổ hợp, quy hoạch toán học (Linear/Integer Programming) và ứng dụng thực tiễn.",
      en: "Mathematical modeling, combinatorial optimization, linear/integer programming, and practical problem solving.",
      "zh-TW": "數學建模、組合最佳化、線性與整數規劃，以及將數學演算法實際落地解決真實問題。",
    },
    tags: ["Optimization", "Gurobi", "Linear Programming", "Graph Theory", "Linear Algebra"],
  },
  {
    id: "craftsmanship",
    title: {
      vi: "Kỹ nghệ Phần mềm & Mã sạch",
      en: "Software Craftsmanship & Clean Code",
      "zh-TW": "軟體工藝與簡潔程式碼",
    },
    description: {
      vi: "Viết mã rõ ràng, dễ bảo trì, tư duy kiểm thử chặt chẽ, tối ưu trải nghiệm lập trình và tự động hóa quy trình với CI/CD.",
      en: "Writing clean, maintainable code, test-driven mindset, modern developer tooling, and automated deployment pipelines.",
      "zh-TW": "編寫清晰且易維護的程式碼、嚴謹的測試思維、現代化工程工具鏈與自動化部署流程。",
    },
    tags: ["TypeScript", "Next.js", "Clean Code", "Git", "CI/CD"],
  },
];
