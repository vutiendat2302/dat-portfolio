import Image from "next/image";
import Link from "next/link";

import type { PhotoAlbum } from "@/data/types";
import { localePath, type Locale } from "@/i18n/config";

interface AlbumCardProps {
  album: PhotoAlbum;
  locale: Locale;
  photoCountLabel: string;
  viewAlbumLabel: string;
}

export function AlbumCard({
  album,
  locale,
  photoCountLabel,
  viewAlbumLabel,
}: AlbumCardProps) {
  const title = album.title[locale];
  const description = album.description?.[locale];
  const photoCount = album.photos.length;
  const albumUrl = localePath(locale, `/photos/${album.slug}`);

  // Trích xuất tháng/năm từ album.date (ví dụ: "10/11/2026 - 11/11/2026" -> "11/2026")
  // Nếu không parse được thì fallback về album.year
  const displayDate = (() => {
    const rawDate = album.date?.[locale] || album.date?.vi;
    if (rawDate) {
      const match = rawDate.match(/(\d{1,2})\/(\d{4})/);
      if (match) {
        const month = match[1].padStart(2, "0");
        const year = match[2];
        return `${month}/${year}`;
      }
    }
    return album.year;
  })();

  return (
    <Link
      href={albumUrl}
      className="group relative flex flex-col text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 hover:-translate-y-1"
    >
      {/* Cover image container - sharp corners, pure image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface transition-colors group-hover:border-border-strong rounded-none">
        <Image
          src={album.coverImage}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-none"
        />

        {/* Hover viewing cue overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-xs shadow-md">
            <svg
              className="size-3.5 fill-none stroke-current"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{viewAlbumLabel}</span>
          </span>
        </div>
      </div>

      {/* Info & Description */}
      <div className="mt-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-medium text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>
        </div>

        {description ? (
          <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        ) : null}

        {/* Metadata & View Album Action */}
        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs sm:text-sm text-muted">
          <span>
            {displayDate} · {photoCount} {photoCountLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
