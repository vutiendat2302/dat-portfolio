---
title: "Khởi đầu DAT Portfolio"
description: "Cách DAT Portfolio giữ kiến trúc đơn giản với Next.js, TypeScript và Markdown."
date: "2026-08-26"
category: "Web Development"
tags:
  - nextjs
  - typescript
  - markdown
published: true
language: "vi"
featured: true
---

# Một portfolio content-first

DAT Portfolio được xây dựng với một mục tiêu rõ ràng: nội dung phải dễ viết, website phải nhanh và kiến trúc phải đủ đơn giản để duy trì lâu dài.

Thay vì tạo backend, database và trang quản trị, repository Git được dùng làm nguồn dữ liệu duy nhất:

- Dữ liệu portfolio nằm trong `data/*.ts`.
- Bài viết nằm trong `content/posts/*.md`.
- Hình ảnh và tài nguyên tĩnh nằm trong `public/`.

## Vì sao dùng Markdown?

Markdown phù hợp với technical blog vì cú pháp ngắn gọn, dễ review bằng Git và hỗ trợ tốt các nội dung thường gặp như danh sách, bảng và code block.

```ts
export const stack = ["Next.js", "TypeScript", "TailwindCSS", "Markdown"];
```

Mỗi bài viết có YAML frontmatter để lưu metadata. Trong quá trình build, Next.js đọc file, kiểm tra dữ liệu và render nội dung thành HTML ngay trên server.

## Nguyên tắc tiếp theo

Website sẽ tiếp tục ưu tiên Server Components, Static Site Generation, accessibility và lượng JavaScript gửi xuống trình duyệt ở mức tối thiểu.
