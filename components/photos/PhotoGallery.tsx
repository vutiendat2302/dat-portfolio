"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { AlbumCard } from "@/components/photos/AlbumCard";
import type { PhotoAlbum } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface PhotoGalleryProps {
  albums: PhotoAlbum[];
  locale: Locale;
  dictionary: Dictionary;
}

export function PhotoGallery({ albums, locale, dictionary }: PhotoGalleryProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const urlTab = tabParam === "everyone" ? "everyone" : "me";
  const [localTab, setLocalTab] = useState<"me" | "everyone" | null>(null);

  const activeTab = localTab ?? urlTab;

  const handleTabChange = (tab: "me" | "everyone") => {
    setLocalTab(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    } catch {
      // Fallback
    }
  };

  // Filter albums by the active category tab
  const currentAlbums = useMemo(
    () => albums.filter((album) => album.category === activeTab),
    [albums, activeTab],
  );

  const t = dictionary.photosPage;

  return (
    <div className="py-6 sm:py-10">
      {/* Page Header */}
      <div className="border-b border-border pb-8 sm:pb-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-3 text-base text-muted sm:text-lg">
              {t.description}
            </p>
          </div>

          {/* Right Action Button: Kèo chụp ảnh */}
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-2xs transition-all duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 w-fit"
          >
            <span>{t.ctaButton}</span>
          </Link>
        </div>

        {/* Tab Buttons (Lên hình / Chụp hộ) */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleTabChange("me")}
            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 cursor-pointer ${
              activeTab === "me"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "border border-border bg-surface text-muted hover:border-border-strong hover:bg-accent hover:text-foreground"
            }`}
          >
            {t.tabs.me}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("everyone")}
            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 cursor-pointer ${
              activeTab === "everyone"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "border border-border bg-surface text-muted hover:border-border-strong hover:bg-accent hover:text-foreground"
            }`}
          >
            {t.tabs.everyone}
          </button>
        </div>
      </div>

      {/* Series / Album List */}
      <section className="py-4 sm:py-6" aria-labelledby="albums-heading">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="albums-heading"
            className="text-base sm:text-lg font-medium text-foreground"
          >
            {t.seriesTitle}
          </h2>
          <span className="text-sm text-muted">
            {currentAlbums.length} album
          </span>
        </div>

        {currentAlbums.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                locale={locale}
                photoCountLabel={t.photoCount}
                viewAlbumLabel={t.viewAlbum}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">{t.empty}</p>
        )}
      </section>
    </div>
  );
}
