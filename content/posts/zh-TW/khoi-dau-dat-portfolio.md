---
title: "DAT Portfolio 的起點"
description: "DAT Portfolio 如何透過 Next.js、TypeScript 與 Markdown 保持極簡架構。"
date: "2026-08-26"
category: "Web Development"
tags:
  - nextjs
  - typescript
  - markdown
published: true
locale: "zh-TW"
translationKey: "dat-portfolio-introduction"
featured: true
sourceHash: "6162e5dd"
autoTranslated: false
---

# 內容為先的工程師作品集

DAT Portfolio 的設計初衷非常明確：內容必須易於撰寫、網站必須輕快迅速，且架構必須足夠簡單以便長期維護。

捨棄了後端伺服器、資料庫與後台管理系統，Git 儲存庫成為唯一的資料來源（Single Source of Truth）：

- 作品集資料集中在 `data/*.ts`。
- 技術文章位於 `content/posts/{locale}/*.md`。
- 圖片與靜態資源放置於 `public/`。

## 為什麼選擇 Markdown？

Markdown 語法簡潔、利於 Git 審查（Code Review），並且能良好支援清單、表格與程式碼區塊（Code Block），是撰寫技術部落格的理想格式。

```ts
export const stack = ["Next.js", "TypeScript", "TailwindCSS", "Markdown"];
```

每篇文章皆包含 YAML frontmatter 來記錄中繼資料（Metadata）。在建置階段（Build Time），Next.js 會讀取檔案、驗證資料格式，並在伺服器端將內容轉譯為 HTML。

## 未來原則

本站將持續優先採用 React Server Components、靜態網站生成（SSG）、網頁無障礙設計（Accessibility），並將傳送至瀏覽器的用戶端 JavaScript 降至最低。
