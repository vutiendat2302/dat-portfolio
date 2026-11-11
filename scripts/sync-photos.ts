import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import exifr from "exifr";

interface PhotoExif {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string | number;
  focalLength?: string;
}

interface PhotoExtra {
  software?: string;
  dimensions?: string;
}

interface SourcePhotoItem {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  story?: string;
  exif?: PhotoExif;
  extra?: PhotoExtra;
  tags?: string[];
  aspectRatio?: "square" | "portrait" | "landscape";
  width?: number;
  height?: number;
}

interface SourcePhotoCredits {
  title?: string;
  photographer?: {
    name: string;
    role: string;
    note?: string;
  };
  model?: {
    name: string;
    role: string;
    note?: string;
  };
}

interface SourcePhotoAlbum {
  id: string;
  slug: string;
  title: string;
  description?: string;
  story?: string;
  credits?: SourcePhotoCredits;
  category: "me" | "everyone";
  year: string;
  date?: string;
  location?: string;
  camera?: string;
  lens?: string;
  stats?: string;
  coverImage: string;
  photos: SourcePhotoItem[];
}

const PUBLIC_PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const SOURCE_PHOTOS_JSON = path.join(process.cwd(), "data", "source", "photos.json");

/**
 * Extracts true pixel dimensions directly from PNG and JPEG headers without external binaries.
 */
function getImageDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const buf = fsSync.readFileSync(filePath);

    // PNG format (bytes 16-24)
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return {
        width: buf.readUInt32BE(16),
        height: buf.readUInt32BE(20),
      };
    }

    // JPEG format (scan SOF0, SOF1, SOF2 markers)
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) break;
        const marker = buf[offset + 1];
        if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
          return {
            height: buf.readUInt16BE(offset + 5),
            width: buf.readUInt16BE(offset + 7),
          };
        }
        offset += 2 + buf.readUInt16BE(offset + 2);
      }
    }
  } catch {
    // Fallback if unable to read header
  }
  return null;
}

/**
 * Formats a JavaScript Date into DD/MM/YYYY.
 */
function formatDate(d: Date | string): string {
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return "";
  }
}

/**
 * Formats shutter speed exposure time into a photography standard (e.g. 1/80s or 2s).
 */
function formatShutterSpeed(seconds: number): string {
  if (!seconds || seconds <= 0) return "";
  if (seconds < 1) {
    const denom = Math.round(1 / seconds);
    return `1/${denom}s`;
  }
  return `${seconds}s`;
}

/**
 * Clean up lens model strings (e.g. "18-50mm F2.8 DC DN | Contemporary 021" -> "Sigma 18-50mm F2.8 DC DN").
 */
function cleanLensModel(rawLens?: string): string {
  if (!rawLens) return "";
  let clean = rawLens.trim();
  // Strip trailing lens version suffix if present
  clean = clean.replace(/\s*\|\s*Contemporary\s*\d*$/i, "").trim();
  if (!clean.toLowerCase().includes("sigma") && /18-50mm/i.test(clean)) {
    clean = `Sigma ${clean}`;
  }
  return clean;
}

/**
 * Formats camera name cleanly.
 */
function cleanCamera(make?: string, model?: string): string {
  if (!model && !make) return "";
  if (!make) return model || "";
  if (!model) return make;
  const mUpper = make.toUpperCase();
  const modUpper = model.toUpperCase();
  if (modUpper.startsWith(mUpper)) {
    return model;
  }
  // Title-case make if all uppercase
  const makeFormatted = make.charAt(0).toUpperCase() + make.slice(1).toLowerCase();
  return `${makeFormatted} ${model}`;
}

/**
 * Recursively find all supported image files in a directory, deduplicating symlinks/copies.
 */
async function scanImageFiles(dir: string, seenRealPaths = new Set<string>()): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  // Sort entries so clean symlink names come before "Bản sao của..." or "Copy of..."
  entries.sort((a, b) => {
    const aIsCopy = a.name.startsWith("Bản sao") || a.name.startsWith("Copy");
    const bIsCopy = b.name.startsWith("Bản sao") || b.name.startsWith("Copy");
    if (aIsCopy && !bIsCopy) return 1;
    if (!aIsCopy && bIsCopy) return -1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await scanImageFiles(fullPath, seenRealPaths);
      files.push(...subFiles);
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        try {
          const real = fsSync.realpathSync(fullPath);
          if (seenRealPaths.has(real)) {
            continue; // Skip duplicate file / symlink target
          }
          seenRealPaths.add(real);
        } catch {
          // Ignore
        }
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Auto-generates a human-friendly title from a filename (e.g. "dat01530" -> "Ảnh 01530" or capitalized words).
 */
function titleFromFilename(filename: string): string {
  const base = path.parse(filename).name;
  // If filename looks like DAT01530
  if (/^dat\d+$/i.test(base)) {
    return `Khoảnh khắc ${base.toUpperCase()}`;
  }
  // Convert kebab or snake case to title case
  const words = base.replace(/[-_]/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Main auto-sync workflow.
 */
async function syncPhotos() {
  console.log("\n📷 DAT Portfolio — Automated EXIF & Photo Sync Tool");
  console.log("===================================================\n");

  if (!fsSync.existsSync(PUBLIC_PHOTOS_DIR)) {
    console.error(`❌ Error: Thư mục ${PUBLIC_PHOTOS_DIR} không tồn tại.`);
    process.exit(1);
  }

  // 1. Scan all image files in public/photos/
  console.log(`🔍 Quét thư mục ảnh: public/photos/ ...`);
  const imageFiles = await scanImageFiles(PUBLIC_PHOTOS_DIR);
  console.log(`✓ Tìm thấy ${imageFiles.length} tệp ảnh trên đĩa.\n`);

  // 2. Load existing data/source/photos.json
  let albums: SourcePhotoAlbum[] = [];
  if (fsSync.existsSync(SOURCE_PHOTOS_JSON)) {
    try {
      const raw = await fs.readFile(SOURCE_PHOTOS_JSON, "utf8");
      albums = JSON.parse(raw);
    } catch (err) {
      console.warn(`⚠️ Không thể đọc ${SOURCE_PHOTOS_JSON}, tạo cấu trúc mới.`, err);
      albums = [];
    }
  }

  let totalUpdated = 0;
  let totalNew = 0;

  // Build a lookup map of existing photo records by web src
  const existingPhotosMap = new Map<string, { album: SourcePhotoAlbum; photo: SourcePhotoItem }>();
  for (const album of albums) {
    for (const photo of album.photos) {
      existingPhotosMap.set(photo.src, { album, photo });
    }
  }

  // 3. Process each image file on disk
  for (const filePath of imageFiles) {
    const relToPublic = path.relative(path.join(process.cwd(), "public"), filePath);
    const webSrc = `/${relToPublic.split(path.sep).join("/")}`;

    // Dimensions
    const dims = getImageDimensions(filePath);
    const width = dims?.width;
    const height = dims?.height;

    let aspectRatio: "square" | "portrait" | "landscape" = "landscape";
    if (width && height) {
      const ratio = width / height;
      if (ratio < 0.9) aspectRatio = "portrait";
      else if (ratio > 1.1) aspectRatio = "landscape";
      else aspectRatio = "square";
    }

    // EXIF
    let parsedExif: Record<string, unknown> | null = null;
    try {
      parsedExif = await exifr.parse(filePath, {
        tiff: true,
        exif: true,
      });
    } catch {
      parsedExif = null;
    }

    const exifObj: PhotoExif = {};
    if (parsedExif) {
      const camera = cleanCamera(parsedExif.Make as string, parsedExif.Model as string);
      if (camera) exifObj.camera = camera;

      const lens = cleanLensModel(parsedExif.LensModel as string);
      if (lens) exifObj.lens = lens;

      if (parsedExif.FNumber) {
        exifObj.aperture = `f/${parsedExif.FNumber}`;
      }
      if (parsedExif.ExposureTime) {
        exifObj.shutterSpeed = formatShutterSpeed(parsedExif.ExposureTime as number);
      }
      if (parsedExif.ISO) {
        exifObj.iso = String(parsedExif.ISO);
      }
      if (parsedExif.FocalLength) {
        exifObj.focalLength = `${parsedExif.FocalLength}mm`;
      }
    }

    const hasRealExif = Object.values(exifObj).some(Boolean);

    const extraObj: PhotoExtra = {};
    if (width && height) {
      extraObj.dimensions = `${width} × ${height}`;
    }
    if (parsedExif?.Software) {
      extraObj.software = String(parsedExif.Software);
    }

    const exifDate = parsedExif?.DateTimeOriginal
      ? formatDate(parsedExif.DateTimeOriginal as Date)
      : "";

    // 4. Update existing or insert new
    if (existingPhotosMap.has(webSrc)) {
      // Existing photo: update technical specs, preserve custom title & story & tags
      const { photo } = existingPhotosMap.get(webSrc)!;
      if (width) photo.width = width;
      if (height) photo.height = height;
      photo.aspectRatio = aspectRatio;

      if (hasRealExif) {
        photo.exif = exifObj;
      }
      if (Object.values(extraObj).some(Boolean)) {
        photo.extra = extraObj;
      }
      if (!photo.date && exifDate) {
        photo.date = exifDate;
      }
      totalUpdated++;
      console.log(`  ↻ Đã cập nhật thông số: ${webSrc} (${extraObj.dimensions || "N/A"}${hasRealExif ? ` · ${exifObj.camera || ""} ${exifObj.aperture || ""}` : ""})`);
    } else {
      // New photo found on disk
      const filename = path.basename(filePath);
      const photoId = path.parse(filename).name.toLowerCase().replace(/[^a-z0-9]/g, "-");

      const newPhotoItem: SourcePhotoItem = {
        id: photoId,
        src: webSrc,
        title: titleFromFilename(filename),
        date: exifDate || formatDate(new Date()),
        location: "Hà Nội",
        story: "",
        exif: hasRealExif ? exifObj : undefined,
        extra: Object.values(extraObj).some(Boolean) ? extraObj : undefined,
        tags: ["đời thường"],
        aspectRatio,
        width,
        height,
      };

      // Find suitable album by path (e.g. public/photos/me vs public/photos/everyone)
      const relDir = path.relative(PUBLIC_PHOTOS_DIR, path.dirname(filePath));
      const pathParts = relDir.split(path.sep);
      const category: "me" | "everyone" = pathParts[0] === "everyone" ? "everyone" : "me";

      let targetAlbum = albums.find((a) => a.category === category);
      if (!targetAlbum) {
        // Create new album if none exists for category
        targetAlbum = {
          id: category === "me" ? "khoanh-khac-cua-minh" : "nhan-vat-phu",
          slug: category === "me" ? "khoanh-khac-cua-minh" : "nhan-vat-phu",
          title: category === "me" ? "Khoảnh khắc của mình" : "Bộ ảnh mới",
          description: "Những khoảnh khắc tự nhiên được ghi lại chân thực.",
          category,
          year: "2026",
          location: "Hà Nội",
          coverImage: webSrc,
          photos: [],
        };
        albums.push(targetAlbum);
      }

      targetAlbum.photos.push(newPhotoItem);
      existingPhotosMap.set(webSrc, { album: targetAlbum, photo: newPhotoItem });
      totalNew++;
      console.log(`  ✨ Thêm ảnh mới vào [${targetAlbum.title}]: ${webSrc}`);
    }
  }

  // 5. Update album metadata (cameras, lenses, computed statistics)
  for (const album of albums) {
    if (album.photos.length > 0) {
      if (!album.coverImage) {
        album.coverImage = album.photos[0].src;
      }

      // Infer camera and lens from photos if not already set
      if (!album.camera) {
        const foundCamera = album.photos.find((p) => p.exif?.camera)?.exif?.camera;
        if (foundCamera) album.camera = foundCamera;
      }
      if (!album.lens) {
        const foundLens = album.photos.find((p) => p.exif?.lens)?.exif?.lens;
        if (foundLens) album.lens = foundLens;
      }

      // Recompute stats
      let portraits = 0;
      let landscapes = 0;
      let squares = 0;
      let maxDim = 0;

      for (const p of album.photos) {
        if (p.width && p.width > maxDim) maxDim = p.width;
        if (p.height && p.height > maxDim) maxDim = p.height;
        if (p.aspectRatio === "portrait") portraits++;
        else if (p.aspectRatio === "landscape") landscapes++;
        else squares++;
      }

      const statParts: string[] = [];
      if (portraits > 0) statParts.push(`${portraits} ảnh dọc`);
      if (landscapes > 0) statParts.push(`${landscapes} ảnh ngang`);
      if (squares > 0) statParts.push(`${squares} ảnh vuông`);

      const resStr = maxDim > 0 ? `Tối đa ${maxDim}px` : "Chất lượng gốc";
      album.stats = `${album.photos.length} ảnh (${statParts.join(", ")}) · ${resStr}`;
    }
  }

  // 6. Write back to data/source/photos.json
  await fs.writeFile(SOURCE_PHOTOS_JSON, JSON.stringify(albums, null, 2) + "\n", "utf8");
  console.log(`\n💾 Đã lưu cấu trúc dữ liệu vào: data/source/photos.json`);
  console.log(`📊 Thống kê: Cập nhật thông số ${totalUpdated} ảnh, Thêm mới ${totalNew} ảnh.`);

  console.log(`\n💡 Gợi ý tiếp theo: Hãy chạy lệnh dịch tự động để đồng bộ đa ngôn ngữ:`);
  console.log(`   npm run translate\n`);
}

syncPhotos().catch((err) => {
  console.error("❌ Lỗi khi quét và đồng bộ ảnh:", err);
  process.exit(1);
});
