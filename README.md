# DAT Portfolio (v2.0)

> Portfolio cá nhân & Blog, được xây dựng theo kiến trúc **Static / Git-driven** hiện đại với **Next.js App Router**, **React 19**, **TypeScript** và **TailwindCSS 4**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Translation_Pipeline-orange?style=flat&logo=google)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Những điểm mới nổi bật trong Version 2.0

* **📄 Trang Sơ yếu lý lịch chuẩn PDF (`/[locale]/cv`)**:
  * Giao diện mô phỏng resume chuẩn A4, hiển thị chính xác theo từng chi tiết của file hồ sơ PDF gốc.
  * Tích hợp chức năng in trực tiếp (`Print`) với bộ CSS tối ưu in ấn và nút tải file PDF 1 chạm.
* **📬 Trang Liên hệ trực tiếp (`/[locale]/contact`)**:
  * Thẻ liên lạc nhanh với chức năng sao chép Email và Số điện thoại chỉ với 1 cú click.
  * Mở nhanh trình soạn thư mặc định (`mailto:`) hoặc Gmail trên trình duyệt.
  * Liên kết mạng xã hội chuyên nghiệp (GitHub, LinkedIn, Facebook, Instagram, Threads, Locket).
* **🔒 Trang Chính sách quyền riêng tư (`/[locale]/privacy`)**:
  * Minh bạch tuyệt đối về việc không thu thập dữ liệu cá nhân, không cài đặt tracker bên thứ ba.
  * Bố cục tràn viền thoáng đãng, đồng bộ với phong cách chung của website.
* **🎓 Thư viện Chứng chỉ & Bằng khen (`CertificateGallery`)**:
  * Trưng bày các chứng nhận, giải thưởng và học bổng.
  * Tích hợp modal xem trước tài liệu toàn màn hình (lightbox) hỗ trợ cả định dạng PDF nhúng và hình ảnh chất lượng cao.
* **🤖 Pipeline Dịch tự động với Google Gemini AI**:
  * Tác giả chỉ cần viết tiếng Việt tại `data/source/*.json` hoặc `content/posts/vi/*.md`.
  * Lệnh `npm run translate` sử dụng Google Gemini AI tự động dịch sang tiếng Anh (`en`) và tiếng Trung Phồn thể Đài Loan chuẩn thuật ngữ IT (`zh-TW`).
  * Cơ chế so sánh mã băm (`.hashes.json` & `sourceHash`) giúp **chỉ dịch những nội dung có sự thay đổi**, tối ưu chi phí và thời gian.
* **⚡ Nâng cấp hiệu năng & Tương thích React 19**:
  * Xử lý triệt để cảnh báo inline-script của `next-themes` trên React 19.
  * TailwindCSS 4 với semantic CSS variables (Light, Dark, System) không gây giật lag khi chuyển đổi giao diện.

---

## 🛠️ Công nghệ cốt lõi

* **Framework**: Next.js 16 (App Router, Static Site Generation - SSG).
* **Thư viện UI**: React 19 (mặc định React Server Components, Client Components cô lập ở tầng lá).
* **Ngôn ngữ**: TypeScript Strict Mode.
* **Styling**: TailwindCSS 4, `@tailwindcss/typography`.
* **Quản lý Theme**: `next-themes` (Light / Dark / System).
* **Xử lý nội dung Markdown**: `gray-matter`, `unified`, `remark-parse`, `remark-rehype`, `rehype-sanitize`, `rehype-stringify`.
* **AI Engine**: Google Gemini API (`@google/genai` qua fetch REST API) tự động hóa bản địa hóa 3 ngôn ngữ.
* **Deploy & Hosting**: Vercel Edge Network.

---

## 📁 Cấu trúc thư mục

```text
dat-portfolio/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Routing đa ngôn ngữ (/vi, /en, /zh-TW)
│   │   ├── layout.tsx             # Root layout: ThemeProvider, Header, Footer
│   │   ├── page.tsx               # Trang chủ: Hero, Dự án nổi bật, Bài viết mới
│   │   ├── about/page.tsx         # Giới thiệu, Triết lý, Sở thích, Thư viện chứng chỉ
│   │   ├── projects/              # Danh sách dự án & Chi tiết dự án ([slug])
│   │   ├── blog/                  # Danh sách bài viết & Đọc bài viết ([slug])
│   │   ├── cv/page.tsx            # Trang Sơ yếu lý lịch chuẩn in ấn & tải PDF
│   │   ├── contact/page.tsx       # Trang kết nối & Thông tin liên hệ nhanh
│   │   ├── privacy/page.tsx       # Chính sách bảo mật & quyền riêng tư
│   │   └── not-found.tsx          # Trang 404 đa ngôn ngữ
│   ├── sitemap.ts & robots.ts     # Tự động tạo Sitemap & Robots chuẩn SEO
│   └── globals.css                # Semantic CSS tokens & Typography styles
│
├── content/posts/                 # Kho bài viết kỹ thuật dạng Markdown (.md)
│   ├── vi/                        # Bài viết gốc tiếng Việt
│   ├── en/                        # Bản dịch tiếng Anh (tự động dịch bởi AI)
│   └── zh-TW/                     # Bản dịch tiếng Trung Phồn thể Đài Loan
│
├── data/                          # Kiến trúc dữ liệu phân tầng Git-driven
│   ├── source/                    # Nguồn nhập liệu tiếng Việt (chỉ cần viết tại đây)
│   │   ├── profile.json           # Thông tin cá nhân, mạng xã hội, giới thiệu
│   │   ├── projects.json          # Danh sách dự án, mô tả, công nghệ, link demo/repo
│   │   ├── skills.json            # Kỹ năng phân nhóm chuyên môn
│   │   ├── experience.json        # Lịch sử kinh nghiệm công tác
│   │   ├── education.json         # Quá trình đào tạo & học vấn
│   │   ├── about.json             # Quan điểm sống & chủ đề quan tâm
│   │   ├── cv.json                # Dữ liệu Sơ yếu lý lịch chuẩn theo bản in PDF
│   │   └── privacy.json           # Nội dung chính sách quyền riêng tư
│   ├── translations/              # Bản dịch 3 thứ tiếng (sinh tự động qua npm run translate)
│   ├── types.ts                   # Định nghĩa TypeScript interface cho domain data
│   └── *.ts                       # Typed exports cho React Server Components
│
├── i18n/                          # Hệ thống quản lý đa ngôn ngữ
│   ├── config.ts                  # Cấu hình danh sách locale (vi, en, zh-TW)
│   ├── getDictionary.ts           # Helper đọc từ điển theo locale
│   ├── types.ts                   # Định nghĩa Type nghiêm ngặt cho từ điển UI
│   └── dictionaries/              # Nhãn giao diện tĩnh (vi.ts, en.ts, zh-TW.ts)
│
├── components/                    # UI Components tái sử dụng
│   ├── about/                     # CertificateGallery, lightbox chứng chỉ
│   ├── blog/                      # PostCard
│   ├── project/                   # ProjectCard
│   ├── contact/                   # DirectContactCards
│   ├── cv/                        # CvActions (Print, Download PDF)
│   ├── home/                      # Hero, TypewriterText
│   ├── i18n/                      # LanguageSwitcher
│   ├── theme/                     # ThemeProvider, ThemeSwitcher
│   └── common/                    # Header, Footer, Container, SectionHeading,...
│
├── lib/                           # Utility & Xử lý nghiệp vụ
│   ├── posts.ts                   # Parse Markdown, tính thời gian đọc, xử lý fallback
│   ├── seo.ts                     # Helper sinh OpenGraph, Canonical, hreflang
│   └── formatDate.ts              # Định dạng ngày tháng theo locale
│
├── scripts/
│   └── translate.ts               # CLI script dịch tự động qua Google Gemini AI
│
└── public/                        # Tài nguyên tĩnh: hình ảnh, logo, chứng chỉ, PDF
    ├── cert/                      # Ảnh & PDF chứng chỉ
    ├── images/                    # Logo, ảnh đại diện, cover ảnh bài viết
    └── pdf/                       # Bản in PDF gốc (CV_example.pdf)
```

---

## 🌐 Hệ thống Định tuyến (Routes)

Ngôn ngữ mặc định là tiếng Việt (`vi`). Khi người dùng vào `/`, hệ thống tự động redirect về `/vi`.

| Đường dẫn URL | Chức năng |
| :--- | :--- |
| `/{locale}` | Trang chủ (Hero, Dự án tiêu biểu, Ghi chép mới nhất) |
| `/{locale}/about` | Giới thiệu cá nhân, quan điểm, sở thích & chứng chỉ |
| `/{locale}/projects` | Danh sách tất cả dự án kỹ thuật |
| `/{locale}/projects/[slug]` | Chi tiết dự án, công nghệ, kiến trúc, link demo/source code |
| `/{locale}/blog` | Blog kỹ thuật & ghi chép phát triển sản phẩm |
| `/{locale}/blog/[slug]` | Đọc bài viết Markdown với typography tối ưu |
| `/{locale}/cv` | Sơ yếu lý lịch chuẩn trang in A4 kèm PDF download |
| `/{locale}/contact` | Kênh kết nối & thông tin liên hệ trực tiếp |
| `/{locale}/privacy` | Chính sách quyền riêng tư & bảo vệ dữ liệu khách truy cập |

---

## 🤖 Quy trình Dịch tự động bằng Google Gemini AI

```text
[Nhập liệu tiếng Việt]                     [Tự động dịch thuật]                   [Kiểm tra & Xuất bản]
content/posts/vi/*.md       ───────┐
                                   ├────►   npm run translate   ────►  Git Diff ────► Commit & Deploy
data/source/*.json          ───────┘        (Gemini 2.0 Flash)
```

### 1. Cấu hình biến môi trường
Tạo file `.env.local` hoặc `.env` tại thư mục gốc và điền API Key từ [Google AI Studio](https://aistudio.google.com/):
```bash
GEMINI_API_KEY="your_api_key_here"
```

### 2. Thực thi lệnh dịch
```bash
npm run translate
```
* Tự động quét và dịch toàn bộ bài viết mới tại `content/posts/vi/` sang `en/` và `zh-TW/`.
* Tự động quét và dịch các file dữ liệu tại `data/source/` sang `data/translations/`.
* Quản lý trạng thái qua mã băm `.hashes.json`, không dịch lại nếu nội dung tiếng Việt không thay đổi.

---

## 🚀 Cài đặt và Khởi chạy

### Yêu cầu môi trường
* Node.js 18.18+ hoặc Node.js 20+
* Trình quản lý gói `npm`

### Cài đặt dependencies
```bash
npm install
```

### Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Truy cập `http://localhost:3000` trên trình duyệt để kiểm tra.

### Kiểm tra tính toàn vẹn mã nguồn (Definition of Done)
Trước khi commit hoặc deploy lên Vercel, luôn chạy bộ 3 lệnh kiểm thử:
```bash
# 1. Kiểm tra lỗi kiểu dữ liệu TypeScript
npm run typecheck

# 2. Kiểm tra chất lượng mã nguồn & convention
npm run lint

# 3. Kiểm tra quá trình tạo trang tĩnh (Static Generation)
npm run build
```

---

## 🚢 Triển khai (Deployment)

Dự án được tối ưu hoàn hảo cho nền tảng **Vercel**:
1. Đẩy mã nguồn lên GitHub/GitLab.
2. Kết nối kho lưu trữ với Vercel.
3. Thêm biến môi trường `GEMINI_API_KEY` (nếu cần dùng script translate trên CI/CD, hoặc chỉ chạy local trước khi commit).
4. Vercel tự động build và xuất bản các trang tĩnh với hiệu suất tải trang đạt điểm tối đa (100 Lighthouse).

---

## 📜 Nguyên tắc kiến trúc (Architectural Rules)

* **Git là nguồn dữ liệu duy nhất (Git-driven Single Source of Truth)**: Không sử dụng database, CMS bên ngoài, hay API route nội bộ chỉ để đọc file local.
* **Server Components First**: Giữ bundle JavaScript phía client ở mức tối thiểu để tối ưu tốc độ và SEO.
* **Nói không với dữ liệu hư cấu**: Mọi thông tin cá nhân, học vấn, kinh nghiệm và dự án đều phản ánh hồ sơ thực tế.
* **Bảo vệ quyền riêng tư**: Không lưu cookie theo dõi, tôn trọng người đọc.

---

© 2026 Vũ Tiến Đạt. Mã nguồn phát hành dưới giấy phép [MIT License](LICENSE).
