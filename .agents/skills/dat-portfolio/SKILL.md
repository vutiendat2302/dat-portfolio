---
name: dat-portfolio
description: >
  Engineering skill for designing, implementing, debugging,
  refactoring and maintaining the DAT Portfolio project built
  with Next.js, TypeScript, TailwindCSS and Markdown.
---

# DAT Portfolio — AI Agent Engineering Skill

This skill governs the engineering mindset, architectural boundaries, component design, content pipeline, and quality standards for the **DAT Portfolio** project. AI agents must operate as a Senior Frontend Architect and strictly adhere to these guidelines.

Repository-specific instructions in the root `AGENTS.md` take precedence if they differ from this skill.

---

## 1. Project Overview & Architecture Philosophy

**DAT Portfolio** is a modern, high-performance personal developer portfolio and technical blog.

* **Core Architecture**: Static Site Generation (SSG) + Git-driven Markdown Content.
* **Hosting**: Vercel (Static CDN / Edge).
* **Single Source of Truth**:
  * Portfolio structured data: `data/`
  * Technical blog articles: `content/posts/`
  * Static media: `public/`
* **Design Philosophy**: Minimal, technical, clean, professional, premium, and content-first.

---

## 2. Hard Constraints & Architectural Boundaries

AI agents must strictly respect these boundaries:

* **No Backend & No Database**: Absolutely no backend frameworks (Express, NestJS, FastAPI, Spring Boot) or database/ORM systems (PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase, Prisma, Drizzle).
* **No Authentication & No CMS**: No login flows, JWT, sessions, admin dashboards, or external headless CMS.
* **No Internal Content APIs**: Never create Route Handlers (`app/api/*`) just to read local Markdown or TypeScript data. Server Components must read the filesystem directly during build/render time.
* **No MDX without Explicit Request**: Keep blog posts in standard Markdown format.

---

## 3. Server Components vs. Client Components

### Default Rule: React Server Components (RSC)
* All pages, layouts, and presentational containers must remain Server Components.
* Server Components handle data fetching, filesystem access, and static HTML rendering.

### Leaf Component Rule for Client Interactivity
* Mark components with `"use client"` **only at the lowest leaf level** where browser-only interactivity is strictly needed (such as `useState`, `useEffect`, event listeners, interactive search/tag filters, theme toggling, or modals).
* **Strict Anti-Pattern**: Never convert an entire route or page component into a Client Component just because one child component requires state or interaction.
* Pass server-fetched data as serializable props into interactive client leaf components.

---

## 4. Markdown Content System

### Frontmatter Schema
Blog posts in `content/posts/` must use YAML frontmatter with the following fields:
* **Required**:
  * `title`: Post title
  * `description`: Short summary for previews and SEO
  * `date`: Publication date (YYYY-MM-DD)
  * `tags`: Array of relevant technical tags
  * `published`: Boolean flag indicating publication status
* **Optional**:
  * `category`: Broad topic category
  * `coverImage`: Path to cover image in `public/`
  * `updatedAt`: Last revised date
  * `language`: Language code (`vi` or `en`)
  * `featured`: Boolean flag for featured highlights

### Server-Side Processing Pipeline
* Read Markdown files from the filesystem strictly at build/server time.
* Extract YAML frontmatter and transform Markdown to HTML server-side.
* Deliver pre-rendered HTML to the client to ensure zero client-side parsing bundle overhead.
* Validate required frontmatter fields and types while loading content; fail the build with a useful error for invalid posts.
* Sanitize rendered HTML if raw HTML is enabled by the Markdown pipeline.

### Draft Articles Rule
* Any article with `published: false` **MUST NEVER** appear in:
  * Public blog listings and search views.
  * Static path generation (`generateStaticParams`).
  * Public sitemap (`app/sitemap.ts`).
  * Related posts or recommendations.

---

## 5. Portfolio Data Architecture

* **Location**: Domain data resides in TypeScript files under `data/` (e.g., `profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `education.ts`).
* **Derivation over Duplication**:
  * Store data in a single comprehensive array per entity.
  * Compute subsets (such as featured projects or recent highlights) dynamically using array methods rather than maintaining duplicate arrays.

---

## 6. Routing & Static Site Generation (SSG)

* **Route Hierarchy**:
  * `/`: Homepage / Overview
  * `/about`: About me, background, education, experience
  * `/projects`: Curated project showcase
  * `/projects/[slug]`: Project details
  * `/blog`: Technical blog & notes listing
  * `/blog/[slug]`: Article reader view
  * Optional: `/contact`
* **Static Generation**: Dynamic routes (`/blog/[slug]`, `/projects/[slug]`) must implement `generateStaticParams()` for full static pre-rendering.
* **Static Route Safety**: Fully static dynamic routes should set `dynamicParams = false`; otherwise, every missing or unpublished slug must explicitly call `notFound()`.
* **Error Handling**: Missing or unpublished slugs must immediately trigger `notFound()` from `next/navigation` to render a clean 404 page.

---

## 7. SEO, Metadata & Search Engine Standards

* **Next.js Metadata API**:
  * Static pages: Export a static `metadata` object.
  * Dynamic pages: Export an async `generateMetadata()` function.
* **Metadata Requirements**:
  * Unique, page-specific `title` following the convention: `[Page Title] | Dat`
  * Descriptive `description`
  * OpenGraph (title, description, image, type)
  * Twitter cards (summary_large_image)
* **Search Engine Files**:
  * `app/sitemap.ts`: Generate dynamic sitemap containing static pages, project detail routes, and published blog posts (excluding drafts).
  * `app/robots.ts`: Allow public indexing and link to the sitemap.

---

## 8. UI, Responsive Design & Typography

### Visual Direction
* Modern, clean, minimal, technical, professional, premium, and content-first.
* Avoid SaaS landing page cliches, admin dashboard widgets, crypto/gaming aesthetics, or gratuitous animations.

### Blog Typography & Long-Form Reading
* Restrict article container width to an optimal reading measure (e.g., `max-w-3xl` / `prose`).
* Comprehensive visual hierarchy for headings (`h1`–`h6`), paragraphs, blockquotes, lists, links, and tables.
* Inline code must have subtle background contrast and monospaced font.
* Code blocks must include syntax styling, proper padding, and horizontal scroll capability on mobile devices (`overflow-x-auto`).
* Tables must be wrapped to support horizontal scrolling on smaller screens.

### Responsive Standards
* Fully responsive across mobile (360px–640px), tablet (768px–1024px), and desktop (1280px+).
* Zero horizontal layout overflow or viewport clipping.
* Navigation menu must adapt seamlessly to mobile viewports.

---

## 9. Accessibility (a11y) Standards

* **Semantic HTML**: Utilize landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Interactive Elements**:
  * Use `<button>` for actions and triggers.
  * Use `<a>` or Next.js `<Link>` for navigation.
* **Keyboard Navigation & Focus**: Provide clear, visible focus rings (`focus-visible`) for all interactive elements.
* **Accessible Images**: Every `next/image` must have a descriptive `alt` attribute (never generic placeholders like "image" or "img").
* **Color Contrast**: Maintain WCAG AA compliant contrast ratios across light and dark themes.

---

## 10. Performance Optimization

* **Zero Unnecessary Client JS**: Keep Markdown rendering and static content strictly on the server.
* **Next.js Image Optimization**: Use `next/image` with explicit dimensions or fill mode, and set `priority` for above-the-fold hero images to optimize Largest Contentful Paint (LCP).
* **Next.js Font Optimization**: Use `next/font` for zero layout shifts (CLS).
* **Subtle Transitions**: Use standard CSS/Tailwind transitions instead of bulky JavaScript animation libraries.

---

## 11. Code Conventions & Project Structure

* **Naming Conventions**:
  * Component files: `PascalCase.tsx`
  * Utility and data files: `camelCase.ts`
  * Route folders: `kebab-case`
  * Markdown post files: `kebab-case.md`
* **Imports**: Use the `@/*` path alias for all internal imports.
* **TypeScript**: Strict mode with explicit types for props, models, and helper return values. No `any` escapes.

---

## 12. Content Integrity (Zero Fabrication Rule)

* **Strict Prohibition**: Never invent, hallucinate, or fabricate work experience, company names, educational history, project details, skills, metrics, or external URLs.
* **Placeholder Guidelines**: When personal details are not yet provided by the user, use clear developer placeholders (such as `TODO: Add LinkedIn URL`) or define fields as optional in TypeScript interfaces.

---

## 13. Dependency Management Policy

Before installing any package:
1. Inspect `package.json` to verify existing dependencies.
2. Evaluate if native Next.js, React, or browser APIs already provide the solution.
3. Only add minimal, specialized libraries when strictly necessary (e.g., standard Markdown frontmatter and transformation tools).
4. Never install duplicate or competing packages for the same functionality.

---

## 14. Step-by-Step AI Agent Workflow

1. **Inspect**: Read `package.json`, existing directory structure, routes, components, and data before making changes.
2. **Understand**: Identify conventions, data flows, and reusable components without assuming or guessing.
3. **Implement**: Apply focused, type-safe modifications adhering strictly to architectural boundaries.
4. **Verify**: Test TypeScript types, run linting, and verify builds, responsiveness, and accessibility.
5. **Report**: Provide a concise summary of changes, rationale, and verification results.

Use `npm run typecheck`, `npm run lint`, and `npm run build` when these scripts are available. If the project is not yet bootstrapped or a check cannot run in the environment, report that limitation instead of claiming verification.

---

## 15. AI Agent Prohibitions ("Must NOT")

* **MUST NOT** create backends, databases, ORMs, authentication, admin panels, or CMS integrations.
* **MUST NOT** convert Server Component pages into Client Components.
* **MUST NOT** create API routes to serve local Markdown or TypeScript data.
* **MUST NOT** parse Markdown in client-side bundles.
* **MUST NOT** invent fake portfolio data or personal background.
* **MUST NOT** install unneeded dependencies or migrate to MDX without explicit instruction.
* **MUST NOT** leave incomplete implementation logic as TODOs.

---

## 16. Definition of Done (DoD)

A task is complete only when:
* [ ] Requirements are fully implemented without violating architecture constraints.
* [ ] TypeScript compiles cleanly with strict types and zero errors.
* [ ] `npm run lint` passes without errors.
* [ ] `npm run build` succeeds (when runnable in the environment).
* [ ] UI is fully responsive across mobile, tablet, and desktop with no horizontal scroll leaks.
* [ ] SEO metadata is properly configured for public routes.
* [ ] Semantic HTML and accessibility standards are respected.
* [ ] No unnecessary dependencies, backends, or databases were introduced.
