import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
// Automatically load environment variables from .env.local or .env if present
for (const envFile of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(envFile);
  } catch {
    // File not found or not readable, skip silently
  }
}

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_AI_API_KEY ||
  process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("\n❌ Error: GEMINI_API_KEY (hoặc GOOGLE_API_KEY) chưa được thiết lập.");
  console.error("Vui lòng lấy API key tại Google AI Studio (https://aistudio.google.com/) và thêm vào file .env.local hoặc .env:\n");
  console.error('  GEMINI_API_KEY="your_gemini_api_key"\n');
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const TARGETS: Record<string, { label: string; markdownPrompt: string; jsonPrompt: string }> = {
  en: {
    label: "English",
    markdownPrompt:
      "Translate this Markdown document from Vietnamese to fluent, natural technical English. " +
      "Keep unchanged: brand names, technology names (Next.js, React, TypeScript, TailwindCSS, GitHub, Markdown, API, etc.), " +
      "all code blocks, inline code snippets, URLs, file paths, and HTML tags. " +
      "Preserve the exact YAML frontmatter structure. Output ONLY the translated Markdown document without explanations.",
    jsonPrompt:
      "Translate all Vietnamese human-readable text values in this JSON payload to fluent, natural technical English. " +
      "Keep JSON keys, URLs, code, brand names, and technology names unchanged. Return ONLY valid JSON.",
  },
  "zh-TW": {
    label: "Traditional Chinese (Taiwan / zh-TW)",
    markdownPrompt:
      "Translate this Markdown document from Vietnamese to Traditional Chinese as used in Taiwan (zh-TW). " +
      "Strictly use Taiwan technical and IT vocabulary: 程式 (not 软件/程序), 伺服器 (not 服务器), 軟體 (not 软件), 專案 (not 项目), 佈署 (not 部署), 支援 (not 支持), 預設 (not 默认). " +
      "Never use Simplified Chinese (zh-CN) or mainland terminology. " +
      "Keep unchanged: brand names, technology names (Next.js, React, TypeScript, TailwindCSS, GitHub, Markdown, API, etc.), " +
      "all code blocks, inline code snippets, URLs, file paths, and HTML tags. " +
      "Preserve the exact YAML frontmatter structure. Output ONLY the translated Markdown document without explanations.",
    jsonPrompt:
      "Translate all Vietnamese human-readable text values in this JSON payload to Traditional Chinese as used in Taiwan (zh-TW). " +
      "Strictly use Taiwan technical and IT vocabulary: 程式, 伺服器, 軟體, 專案, 佈署, 支援, 預設. Never use Simplified Chinese (zh-CN) or mainland terminology. " +
      "Keep JSON keys, URLs, code, brand names, and technology names unchanged. Return ONLY valid JSON.",
  },
};

const POSTS_SRC_DIR = path.join(process.cwd(), "content", "posts", "vi");
const DATA_SRC_DIR = path.join(process.cwd(), "data", "source");
const DATA_OUT_DIR = path.join(process.cwd(), "data", "translations");
const DATA_HASHES_FILE = path.join(DATA_OUT_DIR, ".hashes.json");

interface SourceProfile {
  name: string;
  initials: string;
  role: string;
  introduction: string;
  about: string[];
  location?: string;
  email?: string;
  socialLinks?: Array<{ label: string; href: string }>;
}

interface TranslatedProfileFields {
  role?: string;
  introduction?: string;
  about?: string[];
}

interface SourceProject {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  technologies: string[];
  status: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  repositoryUrl?: string;
  liveUrl?: string;
}

interface TranslatedProjectItem {
  title?: string;
  summary?: string;
  description?: string[];
  status?: string;
  imageAlt?: string;
}

interface SourceSkillGroup {
  category: string;
  skills: string[];
}

interface TranslatedSkillCategory {
  category?: string;
}

interface SourceTimelineItem {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

interface TranslatedTimelineItem {
  title?: string;
  organization?: string;
  description?: string;
}

const hash = (content: string) =>
  crypto.createHash("sha1").update(content).digest("hex").slice(0, 8);

interface GenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

function cleanAiOutput(text: string): string {
  let cleaned = text.trim();
  const codeBlockMatch = cleaned.match(/^```(?:json|markdown|md)?\s*\n([\s\S]*?)\n```$/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  if (cleaned.startsWith("```json") && cleaned.endsWith("```")) {
    cleaned = cleaned.slice(7, -3).trim();
  } else if (cleaned.startsWith("```markdown") && cleaned.endsWith("```")) {
    cleaned = cleaned.slice(11, -3).trim();
  } else if (cleaned.startsWith("```md") && cleaned.endsWith("```")) {
    cleaned = cleaned.slice(5, -3).trim();
  } else if (cleaned.startsWith("```") && cleaned.endsWith("```")) {
    cleaned = cleaned.slice(3, -3).trim();
  }
  return cleaned;
}

async function translateText(
  text: string,
  systemPrompt: string,
  isJson = false,
): Promise<string> {
  const modelName = MODEL.replace(/^models\//, "");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${apiKey}`;

  const body: Record<string, unknown> = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        parts: [{ text }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      ...(isJson ? { responseMimeType: "application/json" } : {}),
    },
  };

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 429 || res.status >= 500) {
      const waitMs = attempt * 2000;
      console.warn(`    ⚠️  Google AI API rate limit/status ${res.status}. Retrying in ${waitMs / 1000}s (attempt ${attempt}/${maxRetries})...`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Google AI Studio API error (${res.status}): ${errorText}`);
    }

    const data = (await res.json()) as GenerateContentResponse;
    if (data.error) {
      throw new Error(`Google AI Studio API error: ${data.error.message}`);
    }

    const candidate = data.candidates?.[0];
    const rawOutput = candidate?.content?.parts?.map((p) => p.text || "").join("") ?? "";

    if (!rawOutput) {
      throw new Error(`Google AI Studio returned empty response (finishReason: ${candidate?.finishReason})`);
    }

    return cleanAiOutput(rawOutput);
  }

  throw new Error(`Failed after ${maxRetries} attempts due to rate limit or server error.`);
}

async function translateJsonPayload<T>(payload: unknown, systemPrompt: string): Promise<T> {
  const inputJson = JSON.stringify(payload, null, 2);
  const translatedRaw = await translateText(inputJson, systemPrompt, true);
  return JSON.parse(translatedRaw) as T;
}

async function translateBlogPosts() {
  console.log(`\n📝 [1/2] Checking Blog Markdown posts...`);
  try {
    await fs.access(POSTS_SRC_DIR);
  } catch {
    console.log(`No blog source directory found at ${POSTS_SRC_DIR}`);
    return;
  }

  const files = (await fs.readdir(POSTS_SRC_DIR)).filter((file) => file.endsWith(".md"));
  if (files.length === 0) {
    console.log("No markdown files in content/posts/vi.");
    return;
  }

  for (const file of files) {
    const srcPath = path.join(POSTS_SRC_DIR, file);
    const raw = await fs.readFile(srcPath, "utf8");
    const sourceHash = hash(raw);
    const sourceParsed = matter(raw);

    for (const [locale, config] of Object.entries(TARGETS)) {
      const outDir = path.join(process.cwd(), "content", "posts", locale);
      const outPath = path.join(outDir, file);

      const existingRaw = await fs.readFile(outPath, "utf8").catch(() => null);
      if (existingRaw) {
        try {
          const existingParsed = matter(existingRaw);
          if (existingParsed.data.sourceHash === sourceHash) {
            console.log(`  ⏭️  [posts/${locale}] ${file} (unchanged)`);
            continue;
          }
        } catch {
          // Re-translate if invalid
        }
      }

      console.log(`  ⏳ Translating [posts/${locale}] ${file}...`);
      try {
        const translatedRaw = await translateText(raw, config.markdownPrompt);
        const translatedParsed = matter(translatedRaw);

        translatedParsed.data.locale = locale;
        translatedParsed.data.sourceHash = sourceHash;
        translatedParsed.data.autoTranslated = true;
        if (sourceParsed.data.translationKey) {
          translatedParsed.data.translationKey = sourceParsed.data.translationKey;
        }
        if (sourceParsed.data.published !== undefined) {
          translatedParsed.data.published = sourceParsed.data.published;
        }
        if (sourceParsed.data.date) {
          translatedParsed.data.date = sourceParsed.data.date;
        }

        await fs.mkdir(outDir, { recursive: true });
        const finalContent = matter.stringify(
          translatedParsed.content,
          translatedParsed.data,
        );
        await fs.writeFile(outPath, finalContent, "utf8");
        console.log(`  ✓ [posts/${locale}] ${file}`);
      } catch (error) {
        console.error(`  ❌ Failed to translate [posts/${locale}] ${file}:`, error);
      }
    }
  }
}

async function translateDataFiles() {
  console.log(`\n📦 [2/2] Checking Portfolio Data (data/source/)...`);
  try {
    await fs.access(DATA_SRC_DIR);
  } catch {
    console.log(`No data source directory found at ${DATA_SRC_DIR}`);
    return;
  }

  let hashes: Record<string, string> = {};
  try {
    const rawHashes = await fs.readFile(DATA_HASHES_FILE, "utf8");
    hashes = JSON.parse(rawHashes);
  } catch {
    hashes = {};
  }

  await fs.mkdir(DATA_OUT_DIR, { recursive: true });

  // 1. profile.json
  const profileSrcPath = path.join(DATA_SRC_DIR, "profile.json");
  const profileRaw = await fs.readFile(profileSrcPath, "utf8").catch(() => null);
  if (profileRaw) {
    const currentHash = hash(profileRaw);
    if (hashes["profile.json"] === currentHash) {
      console.log(`  ⏭️  [data] profile.json (unchanged)`);
    } else {
      console.log(`  ⏳ Translating [data] profile.json...`);
      try {
        const src = JSON.parse(profileRaw) as SourceProfile;
        const transPayload = {
          role: src.role,
          introduction: src.introduction,
          about: src.about,
        };

        const enTrans = await translateJsonPayload<TranslatedProfileFields>(
          transPayload,
          TARGETS.en.jsonPrompt,
        );
        const zhTrans = await translateJsonPayload<TranslatedProfileFields>(
          transPayload,
          TARGETS["zh-TW"].jsonPrompt,
        );

        const translatedProfile = {
          name: src.name,
          initials: src.initials,
          role: { vi: src.role, en: enTrans.role || src.role, "zh-TW": zhTrans.role || src.role },
          introduction: {
            vi: src.introduction,
            en: enTrans.introduction || src.introduction,
            "zh-TW": zhTrans.introduction || src.introduction,
          },
          about: (src.about || []).map((p: string, i: number) => ({
            vi: p,
            en: enTrans.about?.[i] || p,
            "zh-TW": zhTrans.about?.[i] || p,
          })),
          location: src.location,
          email: src.email,
          socialLinks: src.socialLinks || [],
        };

        await fs.writeFile(
          path.join(DATA_OUT_DIR, "profile.json"),
          JSON.stringify(translatedProfile, null, 2) + "\n",
          "utf8",
        );
        hashes["profile.json"] = currentHash;
        console.log(`  ✓ [data] profile.json`);
      } catch (err) {
        console.error(`  ❌ Failed to translate [data] profile.json:`, err);
      }
    }
  }

  // 2. projects.json
  const projectsSrcPath = path.join(DATA_SRC_DIR, "projects.json");
  const projectsRaw = await fs.readFile(projectsSrcPath, "utf8").catch(() => null);
  if (projectsRaw) {
    const currentHash = hash(projectsRaw);
    if (hashes["projects.json"] === currentHash) {
      console.log(`  ⏭️  [data] projects.json (unchanged)`);
    } else {
      console.log(`  ⏳ Translating [data] projects.json...`);
      try {
        const srcList = JSON.parse(projectsRaw) as SourceProject[];
        const transPayload = srcList.map((p: SourceProject) => ({
          title: p.title,
          summary: p.summary,
          description: p.description,
          status: p.status,
          imageAlt: p.imageAlt,
        }));

        const enList = await translateJsonPayload<TranslatedProjectItem[]>(
          transPayload,
          TARGETS.en.jsonPrompt,
        );
        const zhList = await translateJsonPayload<TranslatedProjectItem[]>(
          transPayload,
          TARGETS["zh-TW"].jsonPrompt,
        );

        const translatedProjects = srcList.map((p: SourceProject, i: number) => {
          const enP = enList[i] || {};
          const zhP = zhList[i] || {};
          return {
            slug: p.slug,
            title: { vi: p.title, en: enP.title || p.title, "zh-TW": zhP.title || p.title },
            summary: { vi: p.summary, en: enP.summary || p.summary, "zh-TW": zhP.summary || p.summary },
            description: (p.description || []).map((desc: string, dIdx: number) => ({
              vi: desc,
              en: enP.description?.[dIdx] || desc,
              "zh-TW": zhP.description?.[dIdx] || desc,
            })),
            technologies: p.technologies || [],
            status: { vi: p.status, en: enP.status || p.status, "zh-TW": zhP.status || p.status },
            featured: Boolean(p.featured),
            image: p.image,
            imageAlt: p.imageAlt
              ? { vi: p.imageAlt, en: enP.imageAlt || p.imageAlt, "zh-TW": zhP.imageAlt || p.imageAlt }
              : undefined,
            repositoryUrl: p.repositoryUrl,
            liveUrl: p.liveUrl,
          };
        });

        await fs.writeFile(
          path.join(DATA_OUT_DIR, "projects.json"),
          JSON.stringify(translatedProjects, null, 2) + "\n",
          "utf8",
        );
        hashes["projects.json"] = currentHash;
        console.log(`  ✓ [data] projects.json`);
      } catch (err) {
        console.error(`  ❌ Failed to translate [data] projects.json:`, err);
      }
    }
  }

  // 3. skills.json
  const skillsSrcPath = path.join(DATA_SRC_DIR, "skills.json");
  const skillsRaw = await fs.readFile(skillsSrcPath, "utf8").catch(() => null);
  if (skillsRaw) {
    const currentHash = hash(skillsRaw);
    if (hashes["skills.json"] === currentHash) {
      console.log(`  ⏭️  [data] skills.json (unchanged)`);
    } else {
      console.log(`  ⏳ Translating [data] skills.json...`);
      try {
        const srcList = JSON.parse(skillsRaw) as SourceSkillGroup[];
        if (srcList.length === 0) {
          await fs.writeFile(path.join(DATA_OUT_DIR, "skills.json"), "[]\n", "utf8");
        } else {
          const transPayload = srcList.map((s: SourceSkillGroup) => ({ category: s.category }));
          const enList = await translateJsonPayload<TranslatedSkillCategory[]>(
            transPayload,
            TARGETS.en.jsonPrompt,
          );
          const zhList = await translateJsonPayload<TranslatedSkillCategory[]>(
            transPayload,
            TARGETS["zh-TW"].jsonPrompt,
          );

          const translated = srcList.map((s: SourceSkillGroup, i: number) => ({
            category: {
              vi: s.category,
              en: enList[i]?.category || s.category,
              "zh-TW": zhList[i]?.category || s.category,
            },
            skills: s.skills || [],
          }));
          await fs.writeFile(
            path.join(DATA_OUT_DIR, "skills.json"),
            JSON.stringify(translated, null, 2) + "\n",
            "utf8",
          );
        }
        hashes["skills.json"] = currentHash;
        console.log(`  ✓ [data] skills.json`);
      } catch (err) {
        console.error(`  ❌ Failed to translate [data] skills.json:`, err);
      }
    }
  }

  // 4. experience.json & education.json
  for (const file of ["experience.json", "education.json"]) {
    const srcPath = path.join(DATA_SRC_DIR, file);
    const raw = await fs.readFile(srcPath, "utf8").catch(() => null);
    if (!raw) continue;

    const currentHash = hash(raw);
    if (hashes[file] === currentHash) {
      console.log(`  ⏭️  [data] ${file} (unchanged)`);
      continue;
    }

    console.log(`  ⏳ Translating [data] ${file}...`);
    try {
      const srcList = JSON.parse(raw) as SourceTimelineItem[];
      if (srcList.length === 0) {
        await fs.writeFile(path.join(DATA_OUT_DIR, file), "[]\n", "utf8");
      } else {
        const transPayload = srcList.map((item: SourceTimelineItem) => ({
          title: item.title,
          organization: item.organization,
          description: item.description,
        }));
        const enList = await translateJsonPayload<TranslatedTimelineItem[]>(
          transPayload,
          TARGETS.en.jsonPrompt,
        );
        const zhList = await translateJsonPayload<TranslatedTimelineItem[]>(
          transPayload,
          TARGETS["zh-TW"].jsonPrompt,
        );

        const translated = srcList.map((item: SourceTimelineItem, i: number) => {
          const enItem = enList[i] || {};
          const zhItem = zhList[i] || {};
          return {
            title: { vi: item.title, en: enItem.title || item.title, "zh-TW": zhItem.title || item.title },
            organization: {
              vi: item.organization,
              en: enItem.organization || item.organization,
              "zh-TW": zhItem.organization || item.organization,
            },
            period: item.period,
            description: item.description
              ? {
                  vi: item.description,
                  en: enItem.description || item.description,
                  "zh-TW": zhItem.description || item.description,
                }
              : undefined,
          };
        });
        await fs.writeFile(
          path.join(DATA_OUT_DIR, file),
          JSON.stringify(translated, null, 2) + "\n",
          "utf8",
        );
      }
      hashes[file] = currentHash;
      console.log(`  ✓ [data] ${file}`);
    } catch (err) {
      console.error(`  ❌ Failed to translate [data] ${file}:`, err);
    }
  }

  await fs.writeFile(DATA_HASHES_FILE, JSON.stringify(hashes, null, 2) + "\n", "utf8");
}

async function main() {
  console.log(`\n🚀 Google AI Studio / Gemini Translation Assistant (${MODEL})`);
  await translateBlogPosts();
  await translateDataFiles();
  console.log(`\n🎉 Translation workflow finished successfully.\n`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
