---
description: |
  Kỹ năng kỹ thuật dùng để thiết kế, triển khai, debug, refactor và duy
  trì dự án DAT Portfolio được xây dựng với Next.js, TypeScript,
  TailwindCSS và Markdown.
name: dat-portfolio
---

# DAT Portfolio --- Quy tắc kỹ thuật dành cho AI Agent

Skill này quy định tư duy kỹ thuật, ranh giới kiến trúc, thiết kế
component, pipeline nội dung và các tiêu chuẩn chất lượng cho dự án
**DAT Portfolio**. AI agent phải làm việc với tư duy của một Senior
Frontend Architect và tuân thủ nghiêm ngặt các hướng dẫn này.

Các quy tắc riêng của repository được định nghĩa trong `AGENTS.md` ở thư
mục gốc sẽ được ưu tiên nếu có khác biệt với skill này.

------------------------------------------------------------------------

## 1. Tổng quan dự án và triết lý kiến trúc

**DAT Portfolio** là một portfolio cá nhân dành cho developer, hiện đại
và có hiệu năng cao, đồng thời có blog kỹ thuật.

-   **Kiến trúc cốt lõi**: Static Site Generation (SSG) + nội dung
    Markdown được quản lý bằng Git.
-   **Hosting**: Vercel (Static CDN / Edge).
-   **Nguồn dữ liệu duy nhất**:
    -   Dữ liệu có cấu trúc của portfolio: `data/`
    -   Bài viết blog kỹ thuật: `content/posts/`
    -   Media tĩnh: `public/`
-   **Triết lý thiết kế**: Tối giản, mang tính kỹ thuật, sạch sẽ, chuyên
    nghiệp, cao cấp và ưu tiên nội dung.

------------------------------------------------------------------------

## 2. Ranh giới kiến trúc và các giới hạn bắt buộc

AI agent phải tuân thủ nghiêm ngặt các ranh giới sau:

-   **Không Backend và Không Database**: Tuyệt đối không thêm backend
    framework (Express, NestJS, FastAPI, Spring Boot) hoặc hệ thống
    database/ORM (PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase,
    Prisma, Drizzle).
-   **Không Authentication và Không CMS**: Không tạo luồng đăng nhập,
    JWT, session, admin dashboard hoặc tích hợp headless CMS bên ngoài.
-   **Không Internal Content API**: Tuyệt đối không tạo Route Handler
    (`app/api/*`) chỉ để đọc Markdown hoặc dữ liệu TypeScript local.
    Server Components phải đọc trực tiếp filesystem trong quá trình
    build/render.
-   **Không sử dụng MDX nếu chưa được yêu cầu rõ ràng**: Blog phải tiếp
    tục sử dụng Markdown chuẩn.

------------------------------------------------------------------------

## 3. Server Components và Client Components

### Quy tắc mặc định: React Server Components (RSC)

-   Tất cả page, layout và presentational container phải tiếp tục là
    Server Component.
-   Server Component chịu trách nhiệm lấy dữ liệu, truy cập filesystem
    và render HTML tĩnh.

### Quy tắc Client Component ở tầng lá

-   Chỉ đánh dấu component bằng `"use client"` **ở mức thấp nhất có
    thể** khi thực sự cần tương tác chỉ có ở trình duyệt, chẳng hạn:
    -   `useState`
    -   `useEffect`
    -   event listener
    -   tìm kiếm/lọc tương tác
    -   lọc theo tag
    -   chuyển đổi theme
    -   modal
-   **Anti-pattern nghiêm cấm**: Không được chuyển toàn bộ route hoặc
    page thành Client Component chỉ vì một component con cần state hoặc
    tương tác.
-   Dữ liệu được lấy ở server phải được truyền dưới dạng props có thể
    serialize vào các Client Component ở tầng lá.

------------------------------------------------------------------------

## 4. Hệ thống nội dung Markdown

### Schema của Frontmatter

Các bài viết trong `content/posts/` phải sử dụng YAML frontmatter với
các trường sau:

### Bắt buộc

-   `title`: Tiêu đề bài viết.
-   `description`: Mô tả ngắn dùng cho preview và SEO.
-   `date`: Ngày xuất bản (`YYYY-MM-DD`).
-   `tags`: Mảng các tag kỹ thuật liên quan.
-   `published`: Cờ boolean xác định bài viết đã được xuất bản hay chưa.

### Tùy chọn

-   `category`: Danh mục chủ đề tổng quát.
-   `coverImage`: Đường dẫn tới ảnh cover trong `public/`.
-   `updatedAt`: Ngày chỉnh sửa gần nhất.
-   `language`: Mã ngôn ngữ (`vi` hoặc `en`).
-   `featured`: Cờ boolean xác định bài viết có được đánh dấu nổi bật
    hay không.

### Pipeline xử lý phía Server

-   Đọc file Markdown từ filesystem chỉ trong quá trình build/server.
-   Trích xuất YAML frontmatter và chuyển Markdown thành HTML ở phía
    server.
-   Gửi HTML đã được render sẵn tới client để tránh chi phí bundle do
    parse Markdown phía client.
-   Kiểm tra các trường frontmatter bắt buộc và kiểu dữ liệu khi load
    nội dung; nếu bài viết không hợp lệ thì phải làm build thất bại với
    thông báo lỗi hữu ích.
-   Sanitize HTML sau khi render nếu pipeline Markdown cho phép raw
    HTML.

### Quy tắc đối với bài viết nháp

Bất kỳ bài viết nào có:

``` yaml
published: false
```

**TUYỆT ĐỐI KHÔNG ĐƯỢC** xuất hiện trong:

-   Danh sách blog public và các view tìm kiếm.
-   Quá trình tạo static path (`generateStaticParams`).
-   Sitemap public (`app/sitemap.ts`).
-   Bài viết liên quan hoặc các đề xuất bài viết.

------------------------------------------------------------------------

## 5. Kiến trúc dữ liệu Portfolio

-   **Vị trí**: Dữ liệu domain nằm trong các file TypeScript bên dưới
    `data/`, ví dụ:
    -   `profile.ts`
    -   `projects.ts`
    -   `skills.ts`
    -   `experience.ts`
    -   `education.ts`
-   **Ưu tiên suy ra dữ liệu thay vì sao chép**:
    -   Lưu dữ liệu trong một array đầy đủ duy nhất cho mỗi entity.
    -   Tạo các tập con (ví dụ featured projects hoặc recent highlights)
        bằng các array method thay vì duy trì các array bị trùng lặp.

------------------------------------------------------------------------

## 6. Routing và Static Site Generation (SSG)

### Cấu trúc route

-   `/`: Trang chủ / Tổng quan.
-   `/about`: Giới thiệu, nền tảng, học vấn, kinh nghiệm.
-   `/projects`: Danh sách các dự án tiêu biểu.
-   `/projects/[slug]`: Chi tiết dự án.
-   `/blog`: Danh sách blog kỹ thuật và ghi chú.
-   `/blog/[slug]`: Trang đọc bài viết.
-   Có thể có thêm `/contact` nếu cần.

### Static Generation

Các dynamic route:

``` text
/blog/[slug]
/projects/[slug]
```

phải triển khai `generateStaticParams()` để pre-render hoàn toàn ở dạng
static.

### An toàn đối với static route

Các dynamic route hoàn toàn static nên đặt:

``` ts
dynamicParams = false
```

Nếu không sử dụng cách này thì mọi slug không tồn tại hoặc chưa publish
phải gọi `notFound()` một cách rõ ràng.

### Xử lý lỗi

Slug không tồn tại hoặc chưa publish phải ngay lập tức gọi:

``` ts
notFound()
```

từ `next/navigation` để hiển thị trang 404 rõ ràng.

------------------------------------------------------------------------

## 7. SEO, Metadata và tiêu chuẩn công cụ tìm kiếm

### Next.js Metadata API

-   Static page: export một object `metadata` tĩnh.
-   Dynamic page: export một hàm async `generateMetadata()`.

### Yêu cầu Metadata

-   `title` phải duy nhất cho từng page và tuân theo quy ước:
    `[Page Title] | Dat`
-   `description` có nội dung mô tả rõ ràng.
-   OpenGraph gồm:
    -   title
    -   description
    -   image
    -   type
-   Twitter Card sử dụng: `summary_large_image`

### File dành cho Search Engine

-   `app/sitemap.ts`: Tạo sitemap động chứa static pages, project detail
    routes và các bài blog đã publish; không đưa draft vào sitemap.
-   `app/robots.ts`: Cho phép public indexing và liên kết tới sitemap.

------------------------------------------------------------------------

## 8. UI, Responsive Design và Typography

### Định hướng giao diện

-   Hiện đại.
-   Sạch sẽ.
-   Tối giản.
-   Mang tính kỹ thuật.
-   Chuyên nghiệp.
-   Cao cấp.
-   Ưu tiên nội dung.

Tránh:

-   Các kiểu SaaS landing page sáo rỗng.
-   Widget kiểu admin dashboard.
-   Phong cách crypto/gaming.
-   Animation quá mức hoặc không cần thiết.

### Typography cho Blog và nội dung dài

-   Giới hạn chiều rộng container bài viết ở mức phù hợp để đọc, ví dụ:
    `max-w-3xl` / `prose`.
-   Xây dựng hệ thống phân cấp trực quan đầy đủ cho:
    -   `h1`--`h6`
    -   paragraph
    -   blockquote
    -   list
    -   link
    -   table
-   Inline code phải có background tương phản nhẹ và font monospace.
-   Code block phải có:
    -   syntax styling
    -   padding phù hợp
    -   khả năng scroll ngang trên mobile (`overflow-x-auto`)
-   Table phải được bọc trong container hỗ trợ scroll ngang trên màn
    hình nhỏ.

### Tiêu chuẩn Responsive

Website phải responsive hoàn toàn trên:

-   Mobile: `360px–640px`
-   Tablet: `768px–1024px`
-   Desktop: `1280px+`

Không được có:

-   horizontal layout overflow
-   viewport clipping

Navigation menu phải thích ứng mượt với màn hình mobile.

------------------------------------------------------------------------

## 9. Tiêu chuẩn Accessibility (a11y)

### Semantic HTML

Sử dụng các landmark element:

``` html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

### Element tương tác

-   Sử dụng `<button>` cho action và trigger.
-   Sử dụng `<a>` hoặc Next.js `<Link>` cho navigation.

### Điều hướng bằng bàn phím và Focus

Cung cấp focus ring rõ ràng và nhìn thấy được thông qua `focus-visible`
cho tất cả interactive element.

### Hình ảnh có khả năng truy cập

Mọi `next/image` phải có `alt` mô tả đúng nội dung.

Không sử dụng các placeholder chung chung như:

``` text
image
img
```

### Độ tương phản màu

Duy trì tỷ lệ tương phản đạt chuẩn WCAG AA trên cả light theme và dark
theme.

------------------------------------------------------------------------

## 10. Tối ưu hiệu năng

### Không có Client JS không cần thiết

Giữ việc render Markdown và nội dung tĩnh hoàn toàn ở phía server.

### Tối ưu hình ảnh bằng Next.js

Sử dụng `next/image` với:

-   kích thước rõ ràng,
-   hoặc `fill`.

Đặt `priority` cho hero image nằm above-the-fold để tối ưu Largest
Contentful Paint (LCP).

### Tối ưu Font bằng Next.js

Sử dụng `next/font` để tránh layout shift và cải thiện Cumulative Layout
Shift (CLS).

### Transition nhẹ

Sử dụng CSS/Tailwind transition tiêu chuẩn thay vì các thư viện
animation JavaScript cồng kềnh.

------------------------------------------------------------------------

## 11. Quy ước code và cấu trúc project

### Quy tắc đặt tên

-   Component file: `PascalCase.tsx`
-   Utility và data file: `camelCase.ts`
-   Route folder: `kebab-case`
-   Markdown post file: `kebab-case.md`

### Import

Sử dụng path alias `@/*` cho tất cả internal import.

Ví dụ:

``` ts
import { profile } from "@/data/profile";
```

### TypeScript

Sử dụng strict mode với type rõ ràng cho:

-   props
-   model
-   helper return value

Không được sử dụng `any` để né type checking.

------------------------------------------------------------------------

## 12. Tính toàn vẹn nội dung --- Không được bịa dữ liệu

### Nghiêm cấm

Không được tự tạo, hallucinate hoặc bịa:

-   Kinh nghiệm làm việc.
-   Tên công ty.
-   Lịch sử học tập.
-   Chi tiết dự án.
-   Kỹ năng.
-   Số liệu.
-   URL bên ngoài.

### Quy tắc Placeholder

Khi người dùng chưa cung cấp thông tin cá nhân, sử dụng placeholder rõ
ràng cho developer, ví dụ:

``` text
TODO: Add LinkedIn URL
```

hoặc định nghĩa field là optional trong TypeScript interface.

------------------------------------------------------------------------

## 13. Chính sách quản lý Dependency

Trước khi cài bất kỳ package nào:

1.  Kiểm tra `package.json` để xác nhận dependency hiện có.
2.  Kiểm tra xem Next.js, React hoặc browser API native đã cung cấp giải
    pháp hay chưa.
3.  Chỉ thêm các thư viện chuyên biệt, tối thiểu khi thực sự cần thiết,
    ví dụ công cụ xử lý frontmatter và Markdown chuẩn.
4.  Không bao giờ cài các package trùng chức năng hoặc cạnh tranh cho
    cùng một mục đích.

------------------------------------------------------------------------

## 14. Quy trình làm việc từng bước của AI Agent

### 1. Inspect --- Kiểm tra

Đọc:

-   `package.json`
-   cấu trúc thư mục hiện tại
-   routes
-   components
-   data

trước khi thay đổi code.

### 2. Understand --- Hiểu

Xác định:

-   convention hiện tại
-   data flow
-   reusable components

Không được tự giả định hoặc đoán.

### 3. Implement --- Triển khai

Thực hiện các thay đổi:

-   tập trung
-   type-safe
-   tuân thủ nghiêm ngặt ranh giới kiến trúc.

### 4. Verify --- Kiểm tra

Kiểm tra:

-   TypeScript types
-   lint
-   build
-   responsive
-   accessibility

### 5. Report --- Báo cáo

Cung cấp bản tóm tắt ngắn gọn về:

-   thay đổi đã thực hiện
-   lý do
-   kết quả kiểm tra

Khi các script tồn tại, sử dụng:

``` bash
npm run typecheck
npm run lint
npm run build
```

Nếu project chưa được bootstrap hoặc một bước kiểm tra không thể chạy
trong môi trường hiện tại, phải báo rõ giới hạn đó thay vì tuyên bố rằng
việc kiểm tra đã thành công.

------------------------------------------------------------------------

## 15. Các điều AI Agent TUYỆT ĐỐI KHÔNG ĐƯỢC làm

-   **KHÔNG ĐƯỢC** tạo backend, database, ORM, authentication, admin
    panel hoặc CMS integration.
-   **KHÔNG ĐƯỢC** chuyển các page Server Component thành Client
    Component.
-   **KHÔNG ĐƯỢC** tạo API route để phục vụ dữ liệu Markdown hoặc
    TypeScript local.
-   **KHÔNG ĐƯỢC** parse Markdown trong client-side bundle.
-   **KHÔNG ĐƯỢC** bịa dữ liệu portfolio hoặc thông tin cá nhân.
-   **KHÔNG ĐƯỢC** cài dependency không cần thiết hoặc chuyển sang MDX
    nếu chưa có chỉ dẫn rõ ràng.
-   **KHÔNG ĐƯỢC** để lại implementation logic chưa hoàn thành dưới dạng
    TODO.

------------------------------------------------------------------------

## 16. Definition of Done (DoD)

Một task chỉ được xem là hoàn thành khi:

-   [ ] Đã triển khai đầy đủ yêu cầu mà không vi phạm các ràng buộc kiến
    trúc.
-   [ ] TypeScript compile thành công với strict types và không có
    error.
-   [ ] `npm run lint` chạy thành công, không có error.
-   [ ] `npm run build` thành công nếu môi trường cho phép chạy.
-   [ ] UI responsive hoàn toàn trên mobile, tablet và desktop, không có
    horizontal scroll không mong muốn.
-   [ ] SEO metadata được cấu hình đúng cho các public route.
-   [ ] Semantic HTML và các tiêu chuẩn accessibility được tuân thủ.
-   [ ] Không thêm dependency, backend hoặc database không cần thiết.