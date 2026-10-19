---
title: "The Beginning of DAT Portfolio"
description: "How DAT Portfolio keeps architecture simple with Next.js, TypeScript, and Markdown."
date: "2026-08-26"
category: "Web Development"
tags:
  - nextjs
  - typescript
  - markdown
published: true
locale: "en"
translationKey: "dat-portfolio-introduction"
featured: true
sourceHash: "6162e5dd"
autoTranslated: false
---

# A Content-First Portfolio

DAT Portfolio was built with a clear goal: content must be easy to write, the website must be fast, and the architecture must be simple enough to maintain long term.

Instead of setting up a backend, database, and admin dashboard, the Git repository serves as the single source of truth:

- Portfolio data lives in `data/*.ts`.
- Blog posts live in `content/posts/{locale}/*.md`.
- Images and static assets live in `public/`.

## Why Markdown?

Markdown is ideal for technical blogs due to its concise syntax, straightforward Git review workflow, and excellent support for common elements like lists, tables, and code blocks.

```ts
export const stack = ["Next.js", "TypeScript", "TailwindCSS", "Markdown"];
```

Each post includes YAML frontmatter to store metadata. During build time, Next.js reads files, validates data, and renders content directly to HTML on the server.

## Next Principles

The website will continue to prioritize React Server Components, Static Site Generation, accessibility, and minimal client-side JavaScript.
