# DAT Portfolio

Website portfolio cá nhân và blog kỹ thuật của Dat.

Project tập trung vào việc giới thiệu bản thân, các dự án đã thực hiện, kỹ năng và những bài viết trong quá trình học tập. Nội dung blog được lưu dưới dạng Markdown trong repository, không sử dụng backend hoặc database.

## Mục tiêu

- Giới thiệu bản thân và định hướng nghề nghiệp.
- Showcase các project cá nhân.
- Chia sẻ kiến thức, technical notes và learning journey.
- Có giao diện responsive, dễ sử dụng trên desktop và mobile.
- Dễ triển khai và dễ bảo trì.

## Công nghệ

- Next.js
- TypeScript
- TailwindCSS
- React
- Markdown cho blog và learning notes
- Vercel để deploy

## Tính năng

### Portfolio

- Trang chủ với phần giới thiệu.
- About me.
- Skills và công nghệ sử dụng.
- Danh sách project.
- Chi tiết từng project.
- Experience và education.
- Thông tin liên hệ.
- Link đến GitHub, LinkedIn và các nền tảng khác.

### Blog

- Viết bài bằng file `.md`.
- Hỗ trợ tiêu đề, đoạn văn, hình ảnh, code block, link và danh sách.
- Phân loại bài viết bằng category và tags.
- URL thân thiện theo slug.
- Trang danh sách bài viết và trang chi tiết bài viết.
- Có thể hỗ trợ tiếng Việt và tiếng Anh.

## Cấu trúc project dự kiến

```text
dat-portfolio/
├── app/
│   ├── about/
│   ├── blog/
│   │   └── [slug]/
│   ├── projects/
│   │   └── [slug]/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── home/
│   ├── blog/
│   └── project/
│
├── content/
│   └── posts/
│       ├── bai-viet-1.md
│       └── bai-viet-2.md
│
├── data/
│   ├── profile.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
│
├── public/
│   ├── images/
│   └── projects/
│
├── lib/
│   ├── markdown.ts
│   └── posts.ts
│
├── styles/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Định dạng bài viết

Mỗi bài viết được lưu trong `content/posts/` dưới dạng file Markdown.

Ví dụ `content/posts/hoc-nextjs-co-ban.md`:

````md
---
title: Học Next.js cơ bản
description: Những kiến thức đầu tiên khi làm quen với Next.js.
date: 2026-08-26
tags:
  - nextjs
  - typescript
published: true
---

# Học Next.js cơ bản

Nội dung bài viết được viết bằng Markdown.

```ts
const message = 'Hello Next.js'
console.log(message)
```
````

Ứng dụng sẽ đọc frontmatter và nội dung Markdown, sau đó render thành trang blog tương ứng.

## Routing

```text
/                  Trang chủ
/about             Giới thiệu
/projects          Danh sách project
/projects/[slug]   Chi tiết project
/blog              Danh sách bài viết
/blog/[slug]       Chi tiết bài viết
```

## Chạy project

### Cài đặt dependencies

```bash
npm install
```

### Chạy môi trường development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

### Build production

```bash
npm run build
npm run start
```

## Cách thêm bài viết

1. Tạo file mới trong `content/posts/`.
2. Thêm frontmatter gồm `title`, `description`, `date`, `tags` và `published`.
3. Viết nội dung bằng Markdown.
4. Thêm hình ảnh vào `public/images/` nếu cần.
5. Commit và push lên GitHub.
6. Deploy lại website.

## Deployment

Website có thể deploy trực tiếp lên Vercel bằng cách kết nối với repository GitHub.

Mỗi lần push code mới, Vercel sẽ tự động build và deploy phiên bản mới.

## Nguyên tắc

Project ưu tiên sự đơn giản:

- Không backend.
- Không database.
- Không authentication.
- Không admin dashboard.
- Nội dung được quản lý bằng Git và Markdown.

Nếu sau này cần cập nhật nội dung qua giao diện quản trị hoặc có nhiều người cùng chỉnh sửa, có thể cân nhắc thêm CMS. Hiện tại Markdown là đủ cho portfolio cá nhân.
