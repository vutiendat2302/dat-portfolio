import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({
    title: dictionary.metadata.privacyTitle,
    description: dictionary.metadata.privacyDescription,
    locale,
    path: "/privacy",
  });
}

const contentByLocale: Record<
  Locale,
  {
    updatedAt: string;
    sections: { title: string; paragraphs: string[] }[];
  }
> = {
  vi: {
    updatedAt: "Cập nhật lần cuối: Tháng 10, 2026",
    sections: [
      {
        title: "1. Mục đích và Phạm vi",
        paragraphs: [
          "Website này (vtdat.com) là portfolio cá nhân và blog kỹ thuật phi thương mại của Vũ Tiến Đạt, được xây dựng nhằm mục đích giới thiệu nền tảng học vấn, chia sẻ các dự án mã nguồn mở và ghi chép kinh nghiệm lập trình.",
          "Mình tôn trọng quyền riêng tư của mọi khách truy cập và cam kết minh bạch tuyệt đối về cách website hoạt động.",
        ],
      },
      {
        title: "2. Thu thập và Xử lý Dữ liệu",
        paragraphs: [
          "Website là trang web tĩnh (Static Site) hoàn toàn không sử dụng cơ sở dữ liệu để lưu trữ thông tin người dùng ẩn danh.",
          "Website không cài đặt bất kỳ công cụ theo dõi quảng cáo, không theo dõi chéo giữa các trang web (cross-site tracking) và không bán, trao đổi hoặc chia sẻ bất kỳ thông tin nào của bạn với bất kỳ bên thứ ba nào.",
        ],
      },
      {
        title: "3. Dữ liệu khi Gửi Thư Liên hệ",
        paragraphs: [
          "Khi bạn tương tác với biểu mẫu tại trang Liên hệ, chức năng này chỉ hỗ trợ soạn thảo nội dung và chuyển hướng trực tiếp tới ứng dụng email mặc định của bạn (mailto:) hoặc giao diện Gmail do bạn trực tiếp gửi.",
          "Thông tin bạn chủ động cung cấp (tên, email, nội dung trao đổi) chỉ được sử dụng cho mục đích phản hồi thư và trao đổi chuyên môn cá nhân giữa bạn và Vũ Tiến Đạt.",
        ],
      },
      {
        title: "4. Liên kết đến Bên thứ ba",
        paragraphs: [
          "Website có chứa các liên kết dẫn tới các nền tảng bên ngoài (chẳng hạn như GitHub, LinkedIn, Facebook, Instagram, v.v.). Khi bạn nhấp vào các liên kết này, bạn sẽ chịu sự quản lý của chính sách quyền riêng tư và điều khoản sử dụng riêng của từng nền tảng tương ứng.",
        ],
      },
      {
        title: "5. Quyền của Bạn và Thông tin Liên hệ",
        paragraphs: [
          "Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào liên quan đến chính sách quyền riêng tư của website, bạn luôn có thể liên hệ trực tiếp với mình qua email: vutiendat23022005@gmail.com.",
        ],
      },
    ],
  },
  en: {
    updatedAt: "Last updated: October 2026",
    sections: [
      {
        title: "1. Purpose and Scope",
        paragraphs: [
          "This website (vtdat.com) is a non-commercial personal portfolio and technical blog authored by Felix Vu (Vu Tien Dat) to showcase academic background, share open-source projects, and document engineering experiences.",
          "I deeply respect visitor privacy and maintain complete transparency regarding how this site operates.",
        ],
      },
      {
        title: "2. Data Collection and Processing",
        paragraphs: [
          "This is a static website and does not utilize any server-side database to collect, track, or profile visitors.",
          "The website does not employ third-party advertising trackers, cookies for cross-site tracking, nor do I ever sell, trade, or share visitor data with third parties.",
        ],
      },
      {
        title: "3. Contact Inquiries",
        paragraphs: [
          "When you compose a message on the Contact page, it initiates a direct email interaction through your own default email client or Gmail interface.",
          "Any information you voluntarily provide (name, email address, message content) is used strictly for private correspondence and technical discussion between you and Felix Vu.",
        ],
      },
      {
        title: "4. External Third-Party Links",
        paragraphs: [
          "This site includes external links to professional platforms such as GitHub, LinkedIn, and social profiles. Visiting those external sites is governed by their respective privacy terms and policies.",
        ],
      },
      {
        title: "5. Your Rights and Contact",
        paragraphs: [
          "If you have any questions or feedback regarding this privacy statement, feel free to reach out directly via email at: vutiendat23022005@gmail.com.",
        ],
      },
    ],
  },
  "zh-TW": {
    updatedAt: "最後更新時間：2026 年 10 月",
    sections: [
      {
        title: "1. 網站宗旨與適用範圍",
        paragraphs: [
          "本網站（vtdat.com）為五進達（Vu Tien Dat）所建立之非商業性質個人作品集與技術部落格，旨在呈現學術背景、開源專案與軟體開發筆記。",
          "本人高度重視訪客隱私權，並對網站之運作方式秉持完全透明原則。",
        ],
      },
      {
        title: "2. 資料蒐集與處理",
        paragraphs: [
          "本網站屬於靜態網站（Static Site），並未建置任何資料庫以追蹤或分析匿名訪客。",
          "網站無投放任何第三方廣告追蹤器，亦不使用跨站追蹤技術，絕不會販售、交換或提供訪客資訊予任何第三方機構。",
        ],
      },
      {
        title: "3. 聯絡資訊傳遞",
        paragraphs: [
          "當您透過「聯絡我」頁面撰寫訊息時，系統僅協助格式化內容並直接調用您本機的電子郵件軟體或 Gmail 介面進行發送。",
          "您主動提供之姓名、信箱與通訊內容，僅供本人進行專業交流與回信溝通之用。",
        ],
      },
      {
        title: "4. 第三方外部連結",
        paragraphs: [
          "本網站包含連往外部專業平台（如 GitHub、LinkedIn 等）之超連結。造訪該等第三方網站時，相關權益皆由各該平台之隱私政策與條款規範。",
        ],
      },
      {
        title: "5. 權利主張與聯絡方式",
        paragraphs: [
          "若您對本隱私權聲明有任何疑慮或建議，隨時歡迎透過電子郵件與本人聯繫：vutiendat23022005@gmail.com。",
        ],
      },
    ],
  },
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const data = contentByLocale[locale];

  return (
    <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24">
      <Link
        href={localePath(locale, "")}
        className="link-underline rounded-sm font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        ← {locale === "vi" ? "Về trang chủ" : locale === "en" ? "Back to home" : "返回首頁"}
      </Link>

      <article className="mt-8 max-w-3xl">
        <SectionHeading
          title={dictionary.footer.privacyPolicy}
          description={data.updatedAt}
          level={1}
        />

        <div className="mt-10 border-t border-border pt-10 space-y-10">
          {data.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base leading-relaxed text-foreground/85"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
