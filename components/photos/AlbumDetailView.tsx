"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { GooglePhotosGrid } from "@/components/photos/GooglePhotosGrid";
import { PhotoLightbox } from "@/components/photos/PhotoLightbox";
import type { PhotoAlbum, PhotoItem } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface AlbumDetailViewProps {
  album: PhotoAlbum;
  prevAlbum: PhotoAlbum | null;
  nextAlbum: PhotoAlbum | null;
  locale: Locale;
  dictionary: Dictionary;
}

function getComputedAlbumStats(photos: PhotoItem[], locale: Locale): string {
  if (photos.length === 0) return "";
  let portraits = 0;
  let landscapes = 0;
  let squares = 0;
  let maxDimension = 0;

  for (const p of photos) {
    const w = p.width || 0;
    const h = p.height || 0;
    if (w > maxDimension) maxDimension = w;
    if (h > maxDimension) maxDimension = h;

    const r =
      w && h
        ? w / h
        : p.aspectRatio === "portrait"
          ? 0.56
          : p.aspectRatio === "landscape"
            ? 1.6
            : 1.0;
    if (r < 0.85) portraits++;
    else if (r > 1.15) landscapes++;
    else squares++;
  }

  const parts: string[] = [];
  if (portraits > 0) {
    parts.push(
      locale === "vi"
        ? `${portraits} dọc`
        : locale === "zh-TW"
          ? `${portraits} 直式`
          : `${portraits} portrait`,
    );
  }
  if (landscapes > 0) {
    parts.push(
      locale === "vi"
        ? `${landscapes} ngang`
        : locale === "zh-TW"
          ? `${landscapes} 橫式`
          : `${landscapes} landscape`,
    );
  }
  if (squares > 0) {
    parts.push(
      locale === "vi"
        ? `${squares} vuông`
        : locale === "zh-TW"
          ? `${squares} 正方形`
          : `${squares} square`,
    );
  }

  const details = parts.join(", ");
  const resStr =
    maxDimension > 0
      ? locale === "vi"
        ? `Tối đa ${maxDimension}px`
        : locale === "zh-TW"
          ? `最高 ${maxDimension}px`
          : `Max ${maxDimension}px`
      : "";

  return [details, resStr].filter(Boolean).join(" · ");
}

export function AlbumDetailView({
  album,
  prevAlbum,
  nextAlbum,
  locale,
  dictionary,
}: AlbumDetailViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = dictionary.photosPage;
  const albumTitle = album.title[locale];
  const albumDesc = album.description?.[locale];
  const albumStory = album.story?.[locale];
  const albumLocation = album.location?.[locale];
  const albumDate = album.date?.[locale] || album.date?.vi;
  const albumLens = album.lens;
  const albumStats =
    album.stats?.[locale] ||
    album.stats?.vi ||
    getComputedAlbumStats(album.photos, locale);

  const activePhoto =
    lightboxIndex !== null ? album.photos[lightboxIndex] || null : null;

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : album.photos.length - 1,
    );
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev < album.photos.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <div className="py-6 sm:py-8">
      {/* 1. Back button (Image 1 style matching blog/project back button, returning to origin tab) */}
      <div className="mb-6">
        <Link
          href={localePath(
            locale,
            album.category === "everyone"
              ? "/photos?tab=everyone"
              : "/photos?tab=me",
          )}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2 w-fit cursor-pointer"
        >
          <span aria-hidden="true">←</span>
          <span>{t.back}</span>
        </Link>
      </div>

      {/* 2. Full-width cover image banner (sharp corners, unoptimized for full quality) */}
      <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden border border-border bg-surface rounded-none">
        <Image
          src={album.coverImage}
          alt={albumTitle}
          fill
          priority
          unoptimized
          className="object-cover rounded-none"
        />
      </div>

      {/* 3. Album Information Section (Image 3: rich metadata table with date, location, camera, lens, stats) */}
      <div className="border-b border-border py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px]">
          {/* Left: Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {albumTitle}
            </h1>
            {albumDesc ? (
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted max-w-2xl">
                {albumDesc}
              </p>
            ) : null}
            {albumStory ? (
              <div className="mt-4 border-t border-border/60 pt-3">
                <p className="text-sm sm:text-base leading-relaxed text-foreground max-w-2xl">
                  {albumStory}
                </p>
              </div>
            ) : null}

            {/* Credits Section (Photographer & Model) */}
            {album.credits && (album.credits.photographer || album.credits.model) ? (
              <div className="mt-5 border-t border-border/60 pt-4">
                {album.credits.title ? (
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    {album.credits.title[locale]}
                  </h3>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  {album.credits.photographer ? (
                    <div className="border border-border bg-surface/60 p-3 rounded-none">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-foreground text-sm">
                          {album.credits.photographer.name}
                        </span>
                        <span className="text-xs text-muted">
                          {album.credits.photographer.role[locale]}
                        </span>
                      </div>
                      {album.credits.photographer.note ? (
                        <p className="mt-1 text-xs text-muted/90 italic">
                          &ldquo;{album.credits.photographer.note[locale]}&rdquo;
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {album.credits.model ? (
                    <div className="border border-border bg-surface/60 p-3 rounded-none">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-foreground text-sm">
                          {album.credits.model.name}
                        </span>
                        <span className="text-xs text-muted">
                          {album.credits.model.role[locale]}
                        </span>
                      </div>
                      {album.credits.model.note ? (
                        <p className="mt-1 text-xs text-muted/90 italic">
                          &ldquo;{album.credits.model.note[locale]}&rdquo;
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right: Key-Value metadata table */}
          <div className="border-t border-border pt-4 sm:border-t-0 sm:border-l sm:border-border sm:pl-6 sm:pt-0">
            <dl className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-y-2 text-xs sm:text-sm">
              <dt className="text-muted">{t.metaDate}</dt>
              <dd className="text-foreground">
                {albumDate || album.year}
              </dd>

              {albumLocation ? (
                <>
                  <dt className="text-muted">{t.metaLocation}</dt>
                  <dd className="text-foreground">{albumLocation}</dd>
                </>
              ) : null}

              {album.camera ? (
                <>
                  <dt className="text-muted">{t.metaCamera}</dt>
                  <dd className="text-foreground">{album.camera}</dd>
                </>
              ) : null}

              {albumLens ? (
                <>
                  <dt className="text-muted">{t.metaLens}</dt>
                  <dd className="text-foreground">{albumLens}</dd>
                </>
              ) : null}

              <dt className="text-muted">{t.metaCount}</dt>
              <dd className="text-foreground">
                {album.photos.length} {t.photoCount}
              </dd>

              {albumStats ? (
                <>
                  <dt className="text-muted">{t.metaStats}</dt>
                  <dd className="text-foreground">{albumStats}</dd>
                </>
              ) : null}
            </dl>
          </div>
        </div>
      </div>

      {/* 4. Google Photos Justified Row Grid (Image 2: flush straight borders on all rows, real EXIF on hover) */}
      <section className="py-8 sm:py-12" aria-labelledby="album-photos-heading">
        <h2 id="album-photos-heading" className="sr-only">
          {albumTitle}
        </h2>

        {album.photos.length > 0 ? (
          <GooglePhotosGrid
            photos={album.photos}
            locale={locale}
            onSelectPhoto={(idx) => setLightboxIndex(idx)}
          />
        ) : (
          <p className="text-sm text-muted">{t.empty}</p>
        )}
      </section>

      {/* 5. Bottom Navigation between albums */}
      <div className="border-t border-border pt-8 sm:pt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prevAlbum ? (
            <Link
              href={localePath(locale, `/photos/${prevAlbum.slug}`)}
              className="group flex flex-col border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong rounded-none"
            >
              <span className="text-xs text-muted">
                ‹ {t.prevAlbum}
              </span>
              <span className="mt-1 font-medium text-foreground transition-colors group-hover:text-accent">
                {prevAlbum.title[locale]}
              </span>
            </Link>
          ) : (
            <div className="border border-border/40 bg-surface/40 p-4 opacity-50 rounded-none">
              <span className="text-xs text-muted">
                ‹ {t.prevAlbum}
              </span>
              <span className="mt-1 block font-medium text-muted">
                —
              </span>
            </div>
          )}

          {nextAlbum ? (
            <Link
              href={localePath(locale, `/photos/${nextAlbum.slug}`)}
              className="group flex flex-col text-right border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong rounded-none"
            >
              <span className="text-xs text-muted">
                {t.nextAlbum} ›
              </span>
              <span className="mt-1 font-medium text-foreground transition-colors group-hover:text-accent">
                {nextAlbum.title[locale]}
              </span>
            </Link>
          ) : (
            <div className="border border-border/40 bg-surface/40 p-4 text-right opacity-50 rounded-none">
              <span className="text-xs text-muted">
                {t.nextAlbum} ›
              </span>
              <span className="mt-1 block font-medium text-muted">
                —
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 6. Lightbox Modal */}
      {lightboxIndex !== null && activePhoto ? (
        <PhotoLightbox
          key={activePhoto.id}
          photo={activePhoto}
          album={album}
          currentIndex={lightboxIndex}
          totalPhotos={album.photos.length}
          locale={locale}
          labels={dictionary.photosPage.lightbox}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      ) : null}
    </div>
  );
}
