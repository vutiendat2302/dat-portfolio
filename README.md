# DAT Portfolio

Portfolio cá nhân và technical blog của Dat, xây dựng bằng Next.js App Router, TypeScript, TailwindCSS và Markdown. Website chạy hoàn toàn theo kiến trúc static/Git-driven, không có backend hoặc database.

## Tính năng chính

- Giao diện Modern Light Tech Portfolio, responsive và content-first.
- Ba chế độ giao diện: Light, Dark và System; mặc định theo hệ điều hành và lưu preference.
- Ba ngôn ngữ theo URL: Tiếng Việt (`vi`), English (`en`) và 繁體中文 Đài Loan (`zh-TW`).
- Portfolio data type-safe trong `data/*.ts` và không duplicate dữ liệu theo locale.
- Technical blog bằng Markdown chuẩn, parse và sanitize ở server/build time.
- Static generation, metadata, OpenGraph, `hreflang`, sitemap và robots locale-aware.
- Server Components mặc định; chỉ theme, language và mobile menu dùng Client Components nhỏ.

## Công nghệ

- Next.js 16 App Router và React Server Components
- TypeScript strict mode
- TailwindCSS 4
- `next-themes` cho Light/Dark/System
- `gray-matter`, Remark và Rehype cho Markdown
- Vercel để deploy

## Cấu trúc

```text
dat-portfolio/                                                                              
    ├── app/                       # Next.js App Router                                         
    │   ├── [locale]/              # Routing đa ngôn ngữ (/vi, /en, /zh-TW)                     
    │   │   ├── layout.tsx         # Layout chính: Header, Footer, ThemeProvider, SEO           
    │   │   ├── page.tsx           # Trang chủ (Hero, dự án tiêu biểu, bài viết mới)            
    │   │   ├── about/page.tsx     # Trang giới thiệu, kỹ năng, kinh nghiệm & học vấn           
    │   │   ├── projects/          # Danh sách dự án & chi tiết dự án ([slug])                  
    │   │   └── blog/              # Danh sách bài viết & đọc bài viết ([slug])                 
    │   ├── sitemap.ts & robots.ts # Tự động tạo Sitemap và Robots chuẩn SEO đa ngôn ngữ        
    │   └── globals.css            # Tailwind CSS và biến màu semantic theme (Light/Dark)       
    │                                                                                           
    ├── content/                   # Nội dung bài viết Blog (.md)                               
    │   └── posts/                                                                              
    │       ├── vi/                # Bài viết tiếng Việt                                        
    │       ├── en/                # Bài viết tiếng Anh                                         
    │       └── zh-TW/             # Bài viết tiếng Trung phồn thể                              
    │                                                                                           
    ├── data/                      # Quản lý dữ liệu Portfolio                                  
    │   ├── source/                # Nguồn nhập liệu tiếng Việt (chỉ cần viết tại đây)          
    │   │   ├── profile.json       # Thông tin cá nhân, vai trò, giới thiệu, link mạng xã hội   
    │   │   ├── projects.json      # Danh sách dự án, mô tả, công nghệ, link demo/code          
    │   │   ├── skills.json        # Danh sách kỹ năng                                          
    │   │   ├── experience.json    # Lịch sử làm việc (timeline)                                
    │   │   └── education.json     # Học vấn / chứng chỉ                                        
    │   ├── translations/          # Dữ liệu 3 thứ tiếng (tự động sinh qua npm run translate)   
    │   ├── types.ts               # Định nghĩa TypeScript Types cho toàn bộ domain data        
    │   ├── site.ts                # Cấu hình website (tên, domain canonical, SEO mặc định)     
    │   └── *.ts                   # Typed exports cho Server Components (profile.ts, ...)      
    │                                                                                           
    ├── i18n/                      # Hệ thống đa ngôn ngữ                                       
    │   ├── config.ts              # Danh sách locale: 'vi', 'en', 'zh-TW', mặc định 'vi'       
    │   ├── getDictionary.ts       # Hàm lấy từ điển theo ngôn ngữ                              
    │   └── dictionaries/          # Từ điển UI cho từng ngôn ngữ (vi.ts, en.ts, zh-TW.ts)      
    │                                                                                           
    ├── lib/                       # Utility & Logic xử lý                                      
    │   ├── posts.ts               # Đọc và parse Markdown, tính thời gian đọc, sanitize HTML   
    │   ├── seo.ts                 # Helper sinh Metadata API cho SEO, OpenGraph, Canonical     
    │   └── formatDate.ts          # Định dạng ngày tháng theo từng ngôn ngữ                    
    │                                                                                           
    ├── components/                # UI Components tái sử dụng                                  
    │   ├── common/                # Header, Footer, Container, TimelineList, SkillList,...     
    │   ├── home/                  # Hero section                                               
    │   ├── project/               # ProjectCard                                                
    │   ├── blog/                  # PostCard                                                   
    │   ├── i18n/                  # LanguageSwitcher (chuyển ngôn ngữ)                         
    │   └── theme/                 # ThemeSwitcher, ThemeProvider (Dark/Light/System)           
    │                                                                                           
    ├── scripts/                   # CLI Scripts hỗ trợ tự động hóa                             
    │   └── translate.ts           # Script dịch Markdown tự động sang en & zh-TW qua Claude API
    │                                                                                           
    └── public/                    # Chứa assets tĩnh: ảnh, svg, pdf 
```

Các thư mục locale trong `content/posts/` chỉ cần tồn tại khi có bài viết tương ứng.

## Routing

Locale mặc định là `vi`; `/` redirect tới `/vi`.

```text
/{locale}                         Trang chủ
/{locale}/about                   Giới thiệu
/{locale}/projects                Danh sách project
/{locale}/projects/[slug]         Chi tiết project
/{locale}/blog                    Danh sách bài viết
/{locale}/blog/[slug]             Chi tiết bài viết
```

Locale hợp lệ: `vi`, `en`, `zh-TW`. Không dùng `zh-CN` cho phiên bản Đài Loan.

## Thêm bài viết Markdown

Tạo file kebab-case trong locale tương ứng, ví dụ `content/posts/vi/hoc-nextjs-co-ban.md`:

```md
---
title: "Học Next.js cơ bản"
description: "Những kiến thức đầu tiên khi làm quen với Next.js."
date: "2026-08-26"
locale: "vi"
translationKey: "learning-nextjs-basics"
category: "Web Development"
tags:
  - nextjs
  - typescript
published: true
---

# Học Next.js cơ bản

Nội dung bài viết được viết bằng Markdown.
```

`translationKey` dùng để liên kết các bản dịch của cùng một bài viết giữa các ngôn ngữ.

### Cơ chế hiển thị & Fallback bản dịch
- **Fallback khi thiếu bản dịch**: Nếu bài viết mới chỉ có bản tiếng Việt (`vi`) mà chưa có bản tiếng Anh (`en`) hay tiếng Trung (`zh-TW`), khi người đọc truy cập route ngôn ngữ đó hoặc chuyển đổi qua selector, website sẽ **hiển thị bản gốc tiếng Việt kèm banner thông báo rõ ràng**: *"This article has not been translated into English yet. Displaying the original Vietnamese version."* (thay vì bị redirect về trang danh sách như trước).
- **SEO & Canonical**: Trang fallback tự động đặt thẻ `canonical` trỏ về bài viết gốc tiếng Việt để tránh bị Google coi là trùng lặp nội dung. `hreflang` chỉ liệt kê các locale thực sự có file dịch tồn tại.
- **Badge Dịch bởi AI**: Những bài viết được dịch tự động có cờ `autoTranslated: true` sẽ hiển thị huy hiệu `🤖 AI Translated` / `🤖 Dịch bởi AI`. Sau khi bạn review xong có thể đổi thành `autoTranslated: false` hoặc gỡ bỏ cờ này.

## Dịch tự động bằng AI (AI Translation Workflow)

Quy trình cập nhật nội dung (Blog & Dữ liệu Portfolio):
```text
Sửa Markdown (vi) hoặc JSON (data/source/) ➔ npm run translate ➔ Tự sinh en & zh-TW ➔ Review git diff ➔ Commit
```

### 1. Cấu hình API Key
Script sử dụng Anthropic Claude SDK (mặc định model `claude-3-5-sonnet-latest`, có bộ từ điển thuật ngữ kỹ thuật IT chuẩn Đài Loan cho `zh-TW`):
```bash
# Thêm vào .env.local hoặc xuất biến môi trường
export ANTHROPIC_API_KEY="sk-ant-..."
```

### 2. Quản lý dữ liệu Portfolio (`data/source/*.json`)
Bạn **không cần khai báo lặp lại 3 thứ tiếng** `{ vi, en, zh-TW }`. Bạn chỉ cần mở các file trong `data/source/` và viết tiếng Việt đơn thuần:
* `data/source/profile.json`: Tên, vai trò, giới thiệu, link mạng xã hội.
* `data/source/projects.json`: Danh sách dự án, tóm tắt, mô tả, công nghệ, link demo/github.
* `data/source/skills.json`: Kỹ năng phân loại theo nhóm.
* `data/source/experience.json` & `education.json`: Quá trình làm việc và học vấn.

### 3. Chạy dịch tự động
```bash
npm run translate
```
- **Xử lý cả 2 phần**:
  1. **Bài viết Blog**: Quét `content/posts/vi/*.md` và sinh bản dịch sang `content/posts/en/` và `content/posts/zh-TW/`.
  2. **Dữ liệu Portfolio**: Quét `data/source/*.json` và sinh dữ liệu 3 ngôn ngữ vào `data/translations/*.json`.
- **So sánh Hash (`sourceHash` & `.hashes.json`)**: Script so sánh mã băm của nội dung tiếng Việt. Nếu nội dung chưa thay đổi, script sẽ **tự động bỏ qua** để tiết kiệm chi phí token và thời gian chạy.
- **Chỉ dịch khi cần**: Chỉ dịch những bài/mục chưa có bản dịch hoặc file tiếng Việt vừa có thay đổi nội dung.
- **Chạy độc lập bằng tay**: Không gắn vào `next build` nhằm tránh phát sinh chi phí API ngoài ý muốn và giữ tốc độ build production luôn ở mức tối đa.

## Chạy project

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`; ứng dụng sẽ redirect tới `/vi`.

Kiểm tra trước khi deploy:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Kết nối repository với Vercel. Mỗi commit cập nhật TypeScript data hoặc Markdown content sẽ tạo lại static pages khi deploy.

## Nguyên tắc kiến trúc

- Không backend, database, authentication, admin dashboard hoặc CMS.
- Không API route để đọc dữ liệu local.
- Không MDX nếu chưa có yêu cầu rõ ràng.
- Git là source of truth cho data, nội dung và static assets.
- Không tự bịa dữ liệu cá nhân hoặc bản dịch nội dung chưa có.

