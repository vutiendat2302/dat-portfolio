# AGENTS.md — Repository Engineering Contract

> **Project**: DAT Portfolio  
> **Type**: Personal Developer Portfolio & Technical Blog  
> **Core Architecture**: Static Next.js App Router + Markdown Content (Git-driven)

This document is the repository-level engineering contract for all AI coding agents working on DAT Portfolio. Repository-specific decisions here take precedence over generic defaults.

## 1. Project Identity & Purpose

DAT Portfolio is a modern, high-performance personal portfolio and technical blog for a software engineer.

Primary goals:

- Showcase personal identity, background, skills, education, and experience.
- Showcase curated software projects with live demos and repository links.
- Document technical notes, tutorials, and learning journeys via Markdown.
- Provide contact information and professional social links.

The aesthetic is clean, technical, minimal, professional, premium, and content-first.

## 2. Official Technology Stack

```text
Framework:       Next.js (App Router)
Library:         React (React Server Components by default)
Language:        TypeScript (Strict mode)
Styling:         TailwindCSS
Content:         Markdown (.md files with YAML frontmatter)
Hosting/Deploy:  Vercel
```

## 3. Non-Negotiable Rules

1. Do not add a backend, database, ORM, authentication system, admin dashboard, CMS, or internal API endpoint for local content.
2. Do not create `app/api/*` routes just to read local Markdown or TypeScript data. Server Components must read local data directly at build/request time.
3. The Git repository is the single source of truth:
   - Portfolio data lives in `data/*.ts`.
   - Blog articles live in `content/posts/*.md`.
   - Static assets live in `public/`.
4. Do not use MDX unless the user explicitly requests it. Articles must remain standard `.md` files.

## 4. Architecture & Rendering

- All routes reside in `app/` and use the Next.js App Router.
- Use React Server Components by default.
- Mark only leaf components with `"use client"` when browser-only interactivity is strictly needed, such as state, effects, event listeners, interactive search/filter, theme toggling, or modals.
- Never convert an entire page to a Client Component because one child needs interactivity.
- Dynamic routes `/blog/[slug]` and `/projects/[slug]` must implement `generateStaticParams()`.
- Fully static dynamic routes should set `dynamicParams = false`.
- Missing or unpublished slugs must call `notFound()` from `next/navigation`.
- Markdown parsing and frontmatter extraction must happen server-side or at build time.
- Validate frontmatter fields and types while loading content.
- Sanitize rendered HTML if raw HTML is enabled.

## 5. Markdown Content

Blog posts are stored in `content/posts/` as standard Markdown with YAML frontmatter:

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

Required fields are `title`, `description`, `date`, `tags`, and `published`. Optional fields include `category`, `coverImage`, `updatedAt`, `language`, and `featured`.

Articles with `published: false` must never appear in blog listings, search, `generateStaticParams()`, related posts, or `sitemap.ts`.

## 6. Portfolio Data

Structured domain data belongs in TypeScript files under `data/`, such as:

```text
data/profile.ts
data/projects.ts
data/skills.ts
data/experience.ts
data/education.ts
```

Keep one comprehensive array per entity and derive subsets such as featured projects with array methods. Do not duplicate data.

## 7. Routes & SSG

```text
/                  Homepage
/about             About, education, experience
/projects          Project showcase
/projects/[slug]   Project details
/blog              Technical blog and notes
/blog/[slug]       Article reader view
/contact           Optional contact page
```

## 8. TypeScript & Naming

- Use strict TypeScript with no implicit `any` or unsafe casts.
- Give every component prop, domain entity, and helper return value an explicit type.
- Use the `@/*` path alias for internal imports.
- Components use `PascalCase.tsx`.
- Utilities and data files use `camelCase.ts`.
- Route folders use `kebab-case`.
- Markdown files use `kebab-case.md`.

## 9. UI, Accessibility & Performance

- Use TailwindCSS consistently; avoid inline styles when Tailwind utilities suffice.
- Pages must be responsive on mobile, tablet, and desktop with no horizontal overflow.
- Blog content should use a readable `max-w-3xl`/`prose` layout.
- Code blocks and tables must scroll horizontally on small screens.
- Use semantic HTML landmarks and correct interactive elements (`button`, `a`, `Link`).
- Every image must have a meaningful `alt` attribute.
- Provide visible `focus-visible` indicators and accessible color contrast.
- Use `next/image` with explicit dimensions or fill mode.
- Use `next/font` and keep client-side JavaScript minimal.
- Markdown must never be parsed in client-side JavaScript.

## 10. SEO

- Use the Next.js Metadata API.
- Static pages export `metadata`.
- Dynamic pages export `generateMetadata()`.
- Use unique titles in the format `[Page Title] | Dat`, descriptions, OpenGraph data, and Twitter `summary_large_image` cards.
- Maintain `app/sitemap.ts` and `app/robots.ts`.
- The sitemap must exclude draft posts.

## 11. Content Integrity

Never fabricate personal data, work experience, companies, projects, degrees, skills, statistics, awards, or social URLs. When information is missing, use a clear placeholder such as `TODO: Add LinkedIn URL` or make the field optional.

## 12. Dependency Policy

Before installing a package:

1. Inspect `package.json`.
2. Check whether Next.js, React, or browser APIs already solve the problem.
3. Add dependencies only when strictly necessary, such as a Markdown parser or frontmatter parser.
4. Never install competing libraries for the same feature.

## 13. Agent Workflow

```text
1. Inspect    → Read package.json, routes, components, data, and styles.
2. Understand → Identify existing conventions and data flows.
3. Implement  → Apply focused, type-safe changes.
4. Verify     → Run type checking, linting, build, and relevant UI checks.
5. Report     → Summarize changes, rationale, files, and verification.
```

Use these commands when scripts exist:

```bash
npm run typecheck
npm run lint
npm run build
```

If the project is not bootstrapped or a command cannot run, report that limitation explicitly.

## 14. Prohibitions

- Do not create backends, databases, ORMs, authentication, admin panels, CMS integrations, or content API routes.
- Do not convert Server Component pages into Client Components unnecessarily.
- Do not parse Markdown on the client.
- Do not invent personal information or fake portfolio items.
- Do not install unneeded dependencies.
- Do not migrate to MDX without an explicit request.
- Do not leave unfinished implementation logic as TODOs; TODOs are only for missing personal content.
- Do not perform massive unrelated refactoring.

## 15. Definition of Done

A task is complete only when:

- Requirements are met without violating the architecture rules.
- TypeScript compiles cleanly with no type errors.
- `npm run lint` passes without errors.
- `npm run build` succeeds when runnable.
- The UI is responsive with no horizontal scroll leaks.
- SEO metadata is configured for public pages.
- Semantic HTML and accessibility standards are respected.
- No unnecessary dependencies, backend, database, or CMS were introduced.
