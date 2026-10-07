# AGENTS.md — Quy ước kỹ thuật của Repository

> **Dự án**: DAT Portfolio
> **Loại**: Portfolio cá nhân & Blog kỹ thuật
> **Kiến trúc cốt lõi**: Next.js App Router static + nội dung Markdown (Git-driven)

Tài liệu này định nghĩa các quy tắc kỹ thuật cấp repository dành cho tất cả AI coding agent làm việc trên DAT Portfolio.

Các quyết định và quy tắc riêng của repository này **được ưu tiên hơn các mặc định hoặc quy ước chung**.

---

## 1. Mục đích và đặc điểm dự án

DAT Portfolio là một website portfolio cá nhân hiện đại, hiệu năng cao dành cho software engineer.

Mục tiêu chính:

* Giới thiệu thông tin cá nhân, nền tảng, kỹ năng, học vấn và kinh nghiệm.
* Giới thiệu các dự án phần mềm tiêu biểu cùng link demo và repository.
* Chia sẻ ghi chú kỹ thuật, tutorial và quá trình học tập thông qua Markdown.
* Cung cấp thông tin liên hệ và các liên kết mạng xã hội chuyên nghiệp.

Phong cách giao diện:

* Sạch sẽ.
* Mang tính kỹ thuật.
* Tối giản.
* Chuyên nghiệp.
* Cao cấp.
* Ưu tiên nội dung.

---

## 2. Công nghệ chính thức

```text
Framework:       Next.js (App Router)
Library:         React (mặc định sử dụng React Server Components)
Language:        TypeScript (Strict mode)
Styling:         TailwindCSS
Content:         Markdown (.md với YAML frontmatter)
Hosting/Deploy:  Vercel
```

---

## 3. Các quy tắc bắt buộc

### 3.1. Không thêm backend hoặc hệ thống quản trị nội dung

Không được thêm:

* Backend.
* Database.
* ORM.
* Authentication.
* Admin dashboard.
* CMS.
* Internal API endpoint dành cho nội dung local.

### 3.2. Không tạo API route chỉ để đọc dữ liệu local

Không tạo:

```text
app/api/*
```

chỉ để đọc:

* Markdown.
* TypeScript data.
* Nội dung local khác.

React Server Components phải đọc dữ liệu local trực tiếp ở thời điểm build hoặc request.

### 3.3. Git repository là nguồn dữ liệu duy nhất

Toàn bộ dữ liệu của portfolio được quản lý trực tiếp trong Git repository:

```text
data/source/*.json         # Nguồn dữ liệu tiếng Việt (tác giả nhập liệu tại đây)
data/translations/*.json   # Dữ liệu 3 ngôn ngữ (tự động dịch qua npm run translate)
data/*.ts                  # Typed data exports cho React Server Components
```

```text
content/posts/{locale}/*.md
```

chứa các bài blog.

```text
public/
```

chứa static assets.

### 3.4. Không sử dụng MDX

Không sử dụng MDX trừ khi người dùng yêu cầu rõ ràng.

Các bài viết phải tiếp tục sử dụng Markdown chuẩn:

```text
.md
```

---

## 4. Kiến trúc và cơ chế render

### 4.1. App Router

Tất cả route phải nằm trong:

```text
app/
```

và sử dụng Next.js App Router.

### 4.2. Server Components là mặc định

Mặc định sử dụng React Server Components.

Chỉ đánh dấu `"use client"` cho các component ở tầng lá khi thực sự cần tương tác phía trình duyệt, ví dụ:

* `useState`.
* `useEffect`.
* Event listener.
* Search/filter tương tác.
* Theme toggle.
* Modal.
* Các browser API.

Không được biến toàn bộ page thành Client Component chỉ vì một component con cần interactivity.

Ví dụ không nên làm:

```text
Page
└── "use client"
    ├── Static content
    ├── Blog
    ├── Projects
    └── ThemeToggle
```

Thay vào đó:

```text
Page (Server Component)
├── Static content
├── Blog
├── Projects
└── ThemeToggle ("use client")
```

### 4.3. Dynamic routes

Các route:

```text
/blog/[slug]
/projects/[slug]
```

phải triển khai:

```ts
generateStaticParams()
```

Nếu dynamic route hoàn toàn static thì phải sử dụng:

```ts
dynamicParams = false
```

### 4.4. Route không tồn tại

Nếu slug:

* Không tồn tại.
* Không được publish.

thì phải gọi:

```ts
notFound()
```

từ:

```ts
next/navigation
```

### 4.5. Markdown

Markdown và frontmatter phải được parse:

* Ở phía server.
* Hoặc trong quá trình build.

Không được parse Markdown bằng JavaScript phía client.

Các trường frontmatter phải được kiểm tra kiểu dữ liệu khi load nội dung.

Nếu cho phép raw HTML trong Markdown thì phải sanitize HTML trước khi render.

---

## 5. Nội dung Markdown

Blog được lưu trong:

```text
content/posts/
```

theo locale.

Ví dụ:

```text
content/
└── posts/
    ├── vi/
    │   └── hoc-nextjs-co-ban.md
    ├── en/
    │   └── learning-nextjs-basics.md
    └── zh-TW/
        └── nextjs-basics.md
```

Mỗi bài viết sử dụng Markdown chuẩn với YAML frontmatter.

Ví dụ:

```md
---
title: "Học Next.js cơ bản"

description: "Những kiến thức đầu tiên khi làm quen với Next.js."

date: "2026-08-26"

category: "Web Development"

tags:
  - nextjs
  - typescript

published: true
---
```

### 5.1. Các field bắt buộc

Các field bắt buộc:

```text
title
description
date
tags
published
```

### 5.2. Các field tùy chọn

Các field tùy chọn:

```text
category
coverImage
updatedAt
language
featured
```

### 5.3. Bài viết chưa publish

Nếu:

```yaml
published: false
```

thì bài viết đó **không được xuất hiện ở bất kỳ đâu**, bao gồm:

* Blog listing.
* Search.
* `generateStaticParams()`.
* Related posts.
* `sitemap.ts`.

### 5.4. Locale

Mỗi bài viết phải khai báo locale tương ứng với thư mục chứa nó:

```text
vi
en
zh-TW
```

Ví dụ:

```text
content/posts/vi/my-post.md
```

phải có locale:

```text
vi
```

`translationKey` là field tùy chọn để liên kết các bản dịch thực sự của cùng một bài viết.

Không được tự tạo hoặc giả định bản dịch nếu bản dịch không tồn tại.

Không được tạo public route cho bản dịch không tồn tại.

---

## 6. Dữ liệu Portfolio

Dữ liệu có cấu trúc của portfolio được quản lý theo mô hình phân tầng:

### 6.1. Tầng nhập liệu nguồn tiếng Việt (`data/source/*.json`)
Tác giả chỉ cần viết tiếng Việt đơn thuần tại thư mục này, không cần khai báo lặp lại `{ vi, en, zh-TW }`:
- `data/source/profile.json`
- `data/source/projects.json`
- `data/source/skills.json`
- `data/source/experience.json`
- `data/source/education.json`

### 6.2. Tầng dịch tự động (`data/translations/*.json`)
Script `npm run translate` sẽ dịch nội dung tiếng Việt sang `en` và `zh-TW` (sử dụng thuật ngữ IT chuẩn Đài Loan), so sánh hash qua `.hashes.json` để tránh gọi API trùng lặp, và xuất ra file JSON đa ngôn ngữ đầy đủ.

### 6.3. Tầng TypeScript Data (`data/*.ts`)
Cung cấp typed interface cho các Server Component của ứng dụng:
- `data/profile.ts`
- `data/projects.ts`
- `data/skills.ts`
- `data/experience.ts`
- `data/education.ts`

Mỗi entity nên có **một array dữ liệu đầy đủ duy nhất**.

Ví dụ:

```ts
export const projects: Project[] = projectsData as Project[];
```

Nếu cần danh sách project nổi bật thì phải derive từ array này:

```ts
export const featuredProjects = projects.filter(
  (project) => project.featured
);
```

Không được copy và duy trì hai bộ dữ liệu riêng biệt.

Mục tiêu:

```text
projects
   │
   ├── tất cả project
   │
   └── featuredProjects
          ↑
          derive từ projects
```

thay vì:

```text
projects
featuredProjects
```

với dữ liệu bị lặp lại.

---

## 7. Routes và Static Site Generation

Các route chính:

```text
/{locale}                         Trang chủ

/{locale}/about                   Giới thiệu, học vấn, kinh nghiệm

/{locale}/projects                Danh sách dự án

/{locale}/projects/[slug]         Chi tiết dự án

/{locale}/blog                    Blog kỹ thuật và ghi chú

/{locale}/blog/[slug]             Trang đọc bài viết
```

Locale được hỗ trợ:

```text
vi
en
zh-TW
```

`vi` là locale mặc định và là target của redirect mặc định.

Ví dụ:

```text
/       → /vi
/en     → English
/vi     → Tiếng Việt
/zh-TW  → Traditional Chinese
```

Các bản dịch giao diện phải nằm trong dictionary có type rõ ràng ở:

```text
i18n/
```

Nội dung domain đã được bản địa hóa phải nằm cùng entity tương ứng trong:

```text
data/*.ts
```

Tiếng Trung phải sử dụng **Traditional Chinese phù hợp với Đài Loan**.

Không được thay thế `zh-TW` bằng `zh-CN`.

---

## 8. TypeScript và quy tắc đặt tên

Sử dụng TypeScript strict mode.

Không được có:

```text
implicit any
```

Không sử dụng các type cast không an toàn nếu có thể tránh.

Mọi thứ sau phải có type rõ ràng:

* Component props.
* Domain entity.
* Helper function return value.

### 8.1. Import

Sử dụng alias:

```text
@/*
```

cho các import nội bộ.

Ví dụ:

```ts
import { profile } from "@/data/profile";
```

Không ưu tiên relative import dài như:

```ts
import { profile } from "../../../data/profile";
```

### 8.2. Quy tắc đặt tên

Component:

```text
PascalCase.tsx
```

Ví dụ:

```text
ProjectCard.tsx
TimelineList.tsx
```

Utility và data:

```text
camelCase.ts
```

Ví dụ:

```text
getDictionary.ts
profile.ts
projects.ts
```

Route folder:

```text
kebab-case
```

Markdown:

```text
kebab-case.md
```

---

## 9. UI, Accessibility và Performance

### 9.1. Styling

Sử dụng TailwindCSS thống nhất.

Hạn chế inline style nếu có thể giải quyết bằng Tailwind utilities.

### 9.2. Responsive

Website phải hoạt động tốt trên:

* Mobile.
* Tablet.
* Desktop.

Không được xuất hiện horizontal overflow không mong muốn.

### 9.3. Blog

Nội dung bài viết phải có layout dễ đọc, ví dụ:

```text
max-w-3xl
```

kết hợp với:

```text
prose
```

### 9.4. Code block và table

Code block và table phải có khả năng scroll ngang trên màn hình nhỏ.

Không được làm vỡ layout mobile.

### 9.5. Semantic HTML

Sử dụng đúng semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Sử dụng đúng element cho từng loại tương tác:

```html
<button>
<a>
```

và Next.js:

```tsx
<Link>
```

khi điều hướng nội bộ.

### 9.6. Hình ảnh

Mọi hình ảnh phải có:

```text
alt
```

mang ý nghĩa.

Ưu tiên:

```tsx
next/image
```

với:

* Explicit dimensions.
* Hoặc `fill`.

### 9.7. Font

Sử dụng:

```text
next/font
```

để quản lý font.

### 9.8. Client-side JavaScript

Giữ lượng JavaScript phía client ở mức tối thiểu.

### 9.9. Theme

Website phải hỗ trợ:

```text
Light
Dark
System
```

Mặc định:

```text
System
```

Màu sắc theme phải sử dụng semantic CSS tokens thay vì lặp lại các cặp màu ở từng component.

### 9.10. Theme và language controls

Theme control và language control phải:

* Có thể sử dụng bằng bàn phím.
* Có accessible name.
* Hoạt động tốt trên mobile.
* Được cô lập thành Client Component.

Theme preference có thể được lưu phía client.

Language state được biểu diễn thông qua locale trong URL, không cần account hoặc database.

### 9.11. Animation

Animation phải tôn trọng:

```text
prefers-reduced-motion
```

Animation không được làm chậm hoặc cản trở navigation.

---

## 10. SEO

Sử dụng Next.js Metadata API.

### Static pages

Các static page sử dụng:

```ts
metadata
```

### Dynamic pages

Các dynamic page sử dụng:

```ts
generateMetadata()
```

### Title

Title phải có format:

```text
[Page Title] | Dat
```

Ví dụ:

```text
Projects | Dat
```

hoặc:

```text
About | Dat
```

### Metadata

Các public page cần có:

* Unique title.
* Description.
* OpenGraph metadata.
* Twitter `summary_large_image`.

### Sitemap và robots

Phải duy trì:

```text
app/sitemap.ts
app/robots.ts
```

Sitemap không được chứa draft/unpublished posts.

### Locale-aware SEO

Các thành phần sau phải hỗ trợ locale:

* Metadata.
* OpenGraph locale.
* Canonical URL.
* `hreflang`.
* Sitemap entries.

Chỉ liệt kê những bản dịch blog thực sự tồn tại.

Không được tạo `hreflang` tới bản dịch giả định.

---

## 11. Tính toàn vẹn của nội dung

Không bao giờ tự tạo hoặc bịa thông tin cá nhân.

Không được tự bịa:

* Thông tin cá nhân.
* Kinh nghiệm làm việc.
* Công ty.
* Dự án.
* Bằng cấp.
* Kỹ năng.
* Số liệu.
* Giải thưởng.
* Social URL.

Nếu thiếu thông tin, sử dụng placeholder rõ ràng:

```text
TODO: Add LinkedIn URL
```

hoặc thiết kế field thành optional nếu phù hợp.

AI agent không được tự suy đoán thông tin cá nhân để hoàn thành UI.

---

## 12. Quy tắc quản lý dependency

Trước khi cài package mới:

### Bước 1

Kiểm tra:

```text
package.json
```

### Bước 2

Xác định xem:

* Next.js.
* React.
* Browser API.

đã giải quyết được vấn đề hay chưa.

### Bước 3

Chỉ thêm dependency khi thực sự cần thiết.

Ví dụ hợp lý:

```text
Markdown parser
Frontmatter parser
```

### Bước 4

Không cài nhiều thư viện cạnh tranh cho cùng một chức năng.

Ví dụ không được tùy tiện cài:

```text
markdown-it
remark
marked
```

cùng lúc nếu chỉ cần một Markdown parser.

---

## 13. Quy trình làm việc của AI Agent

AI agent phải làm việc theo quy trình:

```text
1. Inspect
   ↓
   Đọc package.json, routes, components, data và styles.

2. Understand
   ↓
   Hiểu convention hiện tại và data flow.

3. Implement
   ↓
   Thực hiện thay đổi tập trung, type-safe.

4. Verify
   ↓
   Chạy type checking, linting, build
   và kiểm tra UI liên quan.

5. Report
   ↓
   Tóm tắt thay đổi, lý do,
   file đã chỉnh sửa và kết quả kiểm tra.
```

Nếu project có các script tương ứng, sử dụng:

```bash
npm run typecheck
npm run lint
npm run build
```

Nếu project chưa được bootstrap hoặc một command không thể chạy được, phải báo rõ giới hạn đó.

Không được giả vờ rằng kiểm tra đã thành công nếu command thực tế không chạy.

---

## 14. Các hành vi bị cấm

Không được:

* Tạo backend.
* Tạo database.
* Tạo ORM.
* Tạo authentication.
* Tạo admin panel.
* Tích hợp CMS.
* Tạo API route cho local content.
* Chuyển Server Component page thành Client Component nếu không cần thiết.
* Parse Markdown phía client.
* Bịa thông tin cá nhân.
* Bịa portfolio item.
* Cài dependency không cần thiết.
* Chuyển từ Markdown sang MDX nếu chưa được yêu cầu.
* Để lại implementation logic chưa hoàn thiện dưới dạng TODO.

`TODO` chỉ được sử dụng cho thông tin cá nhân còn thiếu.

Không được thực hiện massive refactoring không liên quan đến task.

Mỗi thay đổi nên có phạm vi nhỏ, rõ ràng và phù hợp với kiến trúc hiện tại.

---

## 15. Definition of Done

Một task chỉ được xem là hoàn thành khi:

* Đáp ứng đầy đủ yêu cầu.
* Không vi phạm các quy tắc kiến trúc.
* TypeScript compile thành công, không có type error.
* `npm run lint` chạy thành công, không có error.
* `npm run build` thành công nếu project có thể chạy build.
* UI responsive.
* Không có horizontal scroll không mong muốn.
* SEO metadata được cấu hình cho public pages.
* Semantic HTML được sử dụng phù hợp.
* Accessibility được đảm bảo ở mức hợp lý.
* Không thêm dependency không cần thiết.
* Không thêm backend.
* Không thêm database.
* Không thêm CMS.
* Không thay đổi kiến trúc ngoài phạm vi task.
