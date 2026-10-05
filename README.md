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
├── app/
│   ├── [locale]/
│   │   ├── about/
│   │   ├── blog/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── blog/
│   ├── common/
│   ├── home/
│   ├── i18n/
│   ├── project/
│   └── theme/
├── content/posts/
│   ├── vi/
│   ├── en/
│   └── zh-TW/
├── data/
├── i18n/
│   ├── dictionaries/
│   ├── config.ts
│   ├── getDictionary.ts
│   └── types.ts
├── lib/
└── public/
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

`translationKey` là optional và dùng để liên kết các bản dịch. Một bài không bắt buộc có đủ ba ngôn ngữ. Bản dịch không tồn tại sẽ không có route và không xuất hiện trong sitemap. Bài có `published: false` không được public.

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
