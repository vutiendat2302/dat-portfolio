"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { PhotoItem } from "@/data/types";
import type { Locale } from "@/i18n/config";

interface GooglePhotosGridProps {
  photos: PhotoItem[];
  locale: Locale;
  onSelectPhoto: (index: number) => void;
}

interface RowItem {
  photo: PhotoItem;
  originalIndex: number;
  aspectRatio: number;
  width: number;
}

interface JustifiedRow {
  height: number;
  items: RowItem[];
}

/**
 * Extracts the accurate aspect ratio (width / height) of a photo item.
 * Uses numerical dimensions if present, falls back to parsing string dimensions or aspect enum.
 */
function getPhotoAspectRatio(photo: PhotoItem): number {
  if (photo.width && photo.height && photo.height > 0) {
    return photo.width / photo.height;
  }

  if (photo.extra?.dimensions) {
    const parts = photo.extra.dimensions.split(/[×xX]/);
    if (parts.length === 2) {
      const w = parseFloat(parts[0].trim());
      const h = parseFloat(parts[1].trim());
      if (w > 0 && h > 0) {
        return w / h;
      }
    }
  }

  if (photo.aspectRatio === "portrait") return 0.5625; // 9:16
  if (photo.aspectRatio === "landscape") return 1.6; // ~16:10
  return 1.0; // square
}

/**
 * Partitions photos into rows where every row fills 100% of containerWidth,
 * with zero ragged edges or indented columns (Google Photos layout).
 */
function computeJustifiedRows(
  photos: PhotoItem[],
  containerWidth: number,
  gap: number,
  targetHeight: number,
): JustifiedRow[] {
  if (photos.length === 0 || containerWidth <= 0) return [];

  const n = photos.length;
  const aspectRatios = photos.map(getPhotoAspectRatio);

  // Dynamic programming to find optimal row breaks (Knuth-Plass justified line breaking)
  const dp = new Array(n + 1).fill(Infinity);
  const parent = new Array(n + 1).fill(-1);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue;
    let aspectSum = 0;
    for (let j = i; j < n; j++) {
      aspectSum += aspectRatios[j];
      const count = j - i + 1;
      const availWidth = containerWidth - (count - 1) * gap;
      if (availWidth <= 0) break;

      const h = availWidth / aspectSum;

      // Penalize deviation from targetHeight
      const diff = h - targetHeight;
      let cost = diff * diff;

      // Penalize rows that are excessively short or tall
      if (h < 130) cost += 500000 * (130 - h);
      if (h > 520) cost += 500000 * (h - 520);

      if (dp[i] + cost < dp[j + 1]) {
        dp[j + 1] = dp[i] + cost;
        parent[j + 1] = i;
      }
    }
  }

  // Backtrack row indices
  const rowSlices: { start: number; end: number }[] = [];
  let curr = n;
  while (curr > 0) {
    const prev = parent[curr];
    if (prev === -1 || prev === undefined) {
      // Fallback if strict bounds couldn't link
      rowSlices.unshift({ start: 0, end: curr });
      break;
    }
    rowSlices.unshift({ start: prev, end: curr });
    curr = prev;
  }

  // Calculate pixel-exact dimensions for each row
  return rowSlices.map((slice) => {
    const rowPhotos = photos.slice(slice.start, slice.end);
    const rowAspects = aspectRatios.slice(slice.start, slice.end);
    const count = rowPhotos.length;
    const availWidth = containerWidth - (count - 1) * gap;
    const sumAspect = rowAspects.reduce((a, b) => a + b, 0);

    const rowHeight = Math.max(120, Math.round(availWidth / sumAspect));

    let accumulatedWidth = 0;
    const items: RowItem[] = rowPhotos.map((photo, localIdx) => {
      const origIdx = slice.start + localIdx;
      const r = rowAspects[localIdx];

      // Last item in row takes the exact remaining pixel difference
      // to ensure 100% straight flush right border
      let w: number;
      if (localIdx === count - 1) {
        w = Math.max(40, availWidth - accumulatedWidth);
      } else {
        w = Math.round(rowHeight * r);
        accumulatedWidth += w;
      }

      return {
        photo,
        originalIndex: origIdx,
        aspectRatio: r,
        width: w,
      };
    });

    return {
      height: rowHeight,
      items,
    };
  });
}

export function GooglePhotosGrid({
  photos,
  locale,
  onSelectPhoto,
}: GooglePhotosGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const updateWidth = () => {
      if (el) {
        // Measure real client width
        const w = el.clientWidth;
        if (w > 0) {
          setContainerWidth(w);
        }
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const gap = 8;
  const targetHeight =
    containerWidth < 640 ? 200 : containerWidth < 1024 ? 260 : 320;

  // Compute rows when width is known; default to 1000px on SSR to avoid empty screen
  const activeWidth = containerWidth > 0 ? containerWidth : 1000;
  const rows = computeJustifiedRows(photos, activeWidth, gap, targetHeight);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col gap-2 w-full">
        {rows.map((row, rIdx) => (
          <div
            key={`row-${rIdx}`}
            className="flex w-full overflow-hidden"
            style={{
              gap: `${gap}px`,
              height: `${row.height}px`,
            }}
          >
            {row.items.map((item) => {
              const photo = item.photo;
              const photoTitle = photo.title[locale];
              const photoLocation = photo.location[locale];
              const exif = photo.exif;

              return (
                <div
                  key={photo.id}
                  style={{
                    width: `${item.width}px`,
                    height: `${row.height}px`,
                  }}
                  className="group relative cursor-pointer overflow-hidden border border-border bg-surface rounded-none shrink-0"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectPhoto(item.originalIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectPhoto(item.originalIndex);
                    }
                  }}
                  aria-label={photoTitle}
                >
                  <Image
                    src={photo.src}
                    alt={photoTitle}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Google Photos style hover overlay with real EXIF badges */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 sm:p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none rounded-none text-white">
                    <p className="text-sm sm:text-base font-medium text-white line-clamp-1">
                      {photoTitle}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                      {photo.date ? <span>{photo.date}</span> : null}
                      {photoLocation ? (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{photoLocation}</span>
                        </>
                      ) : null}
                    </div>

                    {/* Real technical parameters - NEVER fabricated */}
                    {exif ? (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] leading-none text-white/95">
                        {exif.aperture ? (
                          <span className="bg-white/20 backdrop-blur-md px-1.5 py-1 border border-white/15">
                            {exif.aperture}
                          </span>
                        ) : null}
                        {exif.shutterSpeed ? (
                          <span className="bg-white/20 backdrop-blur-md px-1.5 py-1 border border-white/15">
                            {exif.shutterSpeed}
                          </span>
                        ) : null}
                        {exif.iso ? (
                          <span className="bg-white/20 backdrop-blur-md px-1.5 py-1 border border-white/15">
                            ISO {exif.iso}
                          </span>
                        ) : null}
                        {exif.focalLength ? (
                          <span className="bg-white/20 backdrop-blur-md px-1.5 py-1 border border-white/15">
                            {exif.focalLength}
                          </span>
                        ) : null}
                        {exif.lens ? (
                          <span className="hidden sm:inline-block bg-white/10 backdrop-blur-md px-1.5 py-1 border border-white/10 truncate max-w-[160px]">
                            {exif.lens}
                          </span>
                        ) : null}
                      </div>
                    ) : photo.extra?.dimensions ? (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-white/80">
                        <span className="bg-white/15 backdrop-blur-md px-1.5 py-0.5 border border-white/10">
                          {photo.extra.dimensions}
                        </span>
                        {photo.extra.software ? (
                          <span className="bg-white/15 backdrop-blur-md px-1.5 py-0.5 border border-white/10">
                            {photo.extra.software}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
