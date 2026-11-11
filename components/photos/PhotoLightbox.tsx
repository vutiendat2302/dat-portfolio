"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { PhotoAlbum, PhotoItem } from "@/data/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  album: PhotoAlbum | null;
  currentIndex: number;
  totalPhotos: number;
  locale: Locale;
  labels: Dictionary["photosPage"]["lightbox"];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoLightbox({
  photo,
  album,
  currentIndex,
  totalPhotos,
  locale,
  labels,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) {
  const isClient = useIsClient();
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Lock body & html scroll completely while fullscreen lightbox is open
  useEffect(() => {
    if (!photo) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onPrev, onNext]);

  // Google Photos style Wheel Zoom
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom((prev) => {
        const next = Math.min(Math.max(1, +(prev + delta).toFixed(2)), 4);
        if (next === 1) {
          setPan({ x: 0, y: 0 });
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [isClient]);

  // Pan / Drag handling when zoomed in
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      hasMovedRef.current = true;
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    hasMovedRef.current = false;
    if (zoom > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      };
    }
  };

  const handleStageClick = () => {
    if (hasMovedRef.current) return;
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleCopyLink = useCallback(async () => {
    if (!photo) return;
    try {
      const url = new URL(window.location.href);
      url.hash = `photo-${photo.id}`;
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [photo]);

  if (!photo || !album || !isClient) return null;

  const photoTitle = photo.title[locale];
  const photoLocation = photo.location[locale];
  const photoStory = photo.story?.[locale];
  const albumTitle = album.title[locale];

  const lightboxContent = (
    <div
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[99999] w-screen h-screen h-[100dvh] w-[100dvw] bg-black flex flex-col overflow-hidden select-none animate-in fade-in duration-150"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        backgroundColor: "#000000",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={photoTitle}
    >
      {/* 1. Fixed Top Bar (Always at y=0, height 56px, covering 100% width) */}
      <div className="flex h-14 w-full shrink-0 items-center justify-between border-b border-white/10 bg-black/95 px-4 sm:px-6 backdrop-blur-md z-30 text-white">
        <div className="truncate text-xs sm:text-sm text-white/70">
          <span className="font-medium text-white">{albumTitle}</span>
          <span className="mx-2">·</span>
          <span>
            {currentIndex + 1} / {totalPhotos}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom controls: [-] [percentage] [+] */}
          <div className="flex items-center border border-white/15 bg-white/5 rounded-none text-xs">
            <button
              type="button"
              disabled={zoom <= 1}
              onClick={() => {
                setZoom((prev) => {
                  const next = Math.max(1, +(prev - 0.5).toFixed(2));
                  if (next === 1) setPan({ x: 0, y: 0 });
                  return next;
                });
              }}
              className="px-2.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Zoom out"
              title="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="px-2 py-1.5 font-medium text-white/90 hover:bg-white/10 transition-colors border-x border-white/10 cursor-pointer min-w-[52px] text-center"
              title="Reset zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              disabled={zoom >= 4}
              onClick={() => {
                setZoom((prev) => Math.min(4, +(prev + 0.5).toFixed(2)));
              }}
              className="px-2.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Zoom in"
              title="Zoom in"
            >
              +
            </button>
          </div>

          {/* Copy link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-none border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 cursor-pointer"
            title={copied ? labels.copied : labels.copyLink}
          >
            <svg
              className="size-4 shrink-0 fill-none stroke-current"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-3.636l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            <span className="hidden sm:inline">
              {copied ? labels.copied : labels.copyLink}
            </span>
          </button>

          {/* Close button with prominent hover background effect (hover: back) */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-none border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:bg-white hover:text-black hover:border-white focus-visible:outline-2 cursor-pointer"
            title={labels.close}
          >
            <svg
              className="size-4 shrink-0 fill-none stroke-current"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{labels.close}</span>
          </button>
        </div>
      </div>

      {/* 2. Fullscreen Stage Area (Left: Image Stage, Right: Info Panel) */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] w-full flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Photo Stage (100% fullscreen height, perfectly centered, never shifts) */}
        <div
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onClick={handleStageClick}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className={`flex-1 h-full relative flex items-center justify-center bg-black overflow-hidden select-none ${
            zoom > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
        >
          {/* Previous photo button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-none border border-white/20 bg-black/70 p-3 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 cursor-pointer"
            aria-label={labels.prev}
          >
            <svg
              className="size-5 fill-none stroke-current"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Next photo button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-none border border-white/20 bg-black/70 p-3 text-white backdrop-blur-sm transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 cursor-pointer"
            aria-label={labels.next}
          >
            <svg
              className="size-5 fill-none stroke-current"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Scalable & Pannable Photo Wrapper (Download-protected) */}
          <div
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
            className="h-full w-full flex items-center justify-center pointer-events-none select-none p-4 sm:p-8"
          >
            <Image
              src={photo.src}
              alt={photoTitle}
              width={photo.width || 1600}
              height={photo.height || 1200}
              unoptimized
              priority
              draggable={false}
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-none select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right Sidebar Info Panel (Fixed consistent width, always stable) */}
        <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0c0d10] p-5 sm:p-6 overflow-y-auto flex flex-col gap-5 text-white z-20">
          {/* Header info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              {photoTitle}
            </h2>
            <div className="mt-1 text-xs text-white/70">
              <time>{photo.date}</time>
              {photoLocation ? <span> · {photoLocation}</span> : null}
            </div>
          </div>

          {/* Story / Description */}
          {photoStory ? (
            <p className="text-sm leading-relaxed text-white/80">
              {photoStory}
            </p>
          ) : null}

          {/* Camera / EXIF Specs */}
          {photo.exif && Object.values(photo.exif).some(Boolean) ? (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-semibold text-white/90 mb-3">
                {labels.specs}
              </h3>
              <dl className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-x-2 gap-y-2 text-xs sm:text-sm">
                {photo.exif.camera ? (
                  <>
                    <dt className="text-white/60">{labels.camera}</dt>
                    <dd className="text-white">{photo.exif.camera}</dd>
                  </>
                ) : null}
                {photo.exif.lens ? (
                  <>
                    <dt className="text-white/60">{labels.lens}</dt>
                    <dd className="text-white">{photo.exif.lens}</dd>
                  </>
                ) : null}
                {photo.exif.aperture ? (
                  <>
                    <dt className="text-white/60">{labels.aperture}</dt>
                    <dd className="text-white">{photo.exif.aperture}</dd>
                  </>
                ) : null}
                {photo.exif.shutterSpeed ? (
                  <>
                    <dt className="text-white/60">{labels.shutter}</dt>
                    <dd className="text-white">{photo.exif.shutterSpeed}</dd>
                  </>
                ) : null}
                {photo.exif.iso ? (
                  <>
                    <dt className="text-white/60">{labels.iso}</dt>
                    <dd className="text-white">{photo.exif.iso}</dd>
                  </>
                ) : null}
                {photo.exif.focalLength ? (
                  <>
                    <dt className="text-white/60">{labels.focalLength}</dt>
                    <dd className="text-white">{photo.exif.focalLength}</dd>
                  </>
                ) : null}
              </dl>
            </div>
          ) : null}

          {/* Extra Info */}
          {photo.extra && Object.values(photo.extra).some(Boolean) ? (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-semibold text-white/90 mb-3">
                {labels.extra}
              </h3>
              <dl className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-x-2 gap-y-2 text-xs sm:text-sm">
                {photo.extra.software ? (
                  <>
                    <dt className="text-white/60">{labels.software}</dt>
                    <dd className="text-white">{photo.extra.software}</dd>
                  </>
                ) : null}
                {photo.extra.dimensions ? (
                  <>
                    <dt className="text-white/60">{labels.dimensions}</dt>
                    <dd className="text-white">{photo.extra.dimensions}</dd>
                  </>
                ) : null}
              </dl>
            </div>
          ) : null}

          {/* Tags/labels omitted as requested */}
        </div>
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}
