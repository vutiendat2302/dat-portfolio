"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Certificate } from "@/data/about";
import type { Locale } from "@/i18n/config";

interface CertificateGalleryProps {
  items: Certificate[];
  locale: Locale;
  labels?: {
    viewCertificate: string;
    openOriginal: string;
    showMore: string;
    showLess: string;
    close: string;
  };
}

// Category badge colors (3 clean categories: Giấy khen, Chứng chỉ, Giấy chứng nhận)
function getCategoryBadge(categoryVi: string) {
  switch (categoryVi) {
    case "Giấy khen":
      return {
        badge:
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
        dot: "bg-amber-500",
      };
    case "Chứng chỉ":
      return {
        badge:
          "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25",
        dot: "bg-blue-500",
      };
    case "Giấy chứng nhận":
    default:
      return {
        badge:
          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
        dot: "bg-emerald-500",
      };
  }
}

export function CertificateGallery({ items, locale, labels }: CertificateGalleryProps) {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Close modal on ESC and prevent body scroll
  useEffect(() => {
    if (!activeCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCert(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeCert]);

  const viewText =
    labels?.viewCertificate ||
    {
      vi: "Xem chứng nhận",
      en: "View Certificate",
      "zh-TW": "檢視證書",
    }[locale];

  const openNewTabText =
    labels?.openOriginal ||
    {
      vi: "Mở file gốc",
      en: "Open original",
      "zh-TW": "開啟原始檔案",
    }[locale];

  const showMoreText =
    labels?.showMore ||
    {
      vi: "Xem thêm",
      en: "Show more",
      "zh-TW": "查看更多",
    }[locale];

  const showLessText =
    labels?.showLess ||
    {
      vi: "Thu gọn",
      en: "Show less",
      "zh-TW": "收起",
    }[locale];

  const closeText =
    labels?.close ||
    {
      vi: "Đóng",
      en: "Close",
      "zh-TW": "關閉",
    }[locale];

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, items.length));
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    const section = document.getElementById("achievements");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visibleItems = items.slice(0, visibleCount);
  const remainingCount = Math.max(0, items.length - visibleCount);

  return (
    <>
      {/* 1. Grid of Compact, Colorful Cards */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3.5">
        {visibleItems.map((cert) => {
          const categoryStyle = getCategoryBadge(cert.category.vi);
          return (
            <button
              key={cert.id}
              type="button"
              onClick={() => setActiveCert(cert)}
              className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-surface p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-soft/40 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
            >
              <div>
                {/* Header: Category Badge with colored dot & Year */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryStyle.badge}`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${categoryStyle.dot}`}
                      aria-hidden="true"
                    />
                    <span>{cert.category[locale]}</span>
                  </span>
                  {cert.year && (
                    <span className="text-xs text-subtle font-normal">
                      {cert.year}
                    </span>
                  )}
                </div>

                {/* Title & Issuer */}
                <h3 className="mt-3 text-sm font-semibold text-foreground leading-snug transition-colors group-hover:text-accent line-clamp-2">
                  {cert.title[locale]}
                </h3>
                <p className="mt-1 text-xs text-muted line-clamp-1">
                  {cert.issuer[locale]}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 flex items-center justify-between border-t border-border/50 pt-2.5 text-xs text-subtle transition-colors group-hover:text-accent">
                <span className="inline-flex items-center gap-1.5 font-normal">
                  {cert.fileType === "pdf" ? (
                    <svg
                      className="size-3.5 fill-current opacity-80"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                    </svg>
                  ) : (
                    <svg
                      className="size-3.5 fill-current opacity-80"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  )}
                  <span>{viewText}</span>
                </span>
                <span
                  className="text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Pagination Controls: "Xem thêm" & "Thu gọn" */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {remainingCount > 0 && (
          <button
            type="button"
            onClick={handleShowMore}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent hover:shadow-2xs active:scale-[0.98] cursor-pointer"
          >
            <span>{showMoreText}</span>
            <span aria-hidden="true">↓</span>
          </button>
        )}

        {visibleCount > 6 && (
          <button
            type="button"
            onClick={handleShowLess}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs sm:text-sm font-medium text-muted transition-all duration-150 hover:border-border-strong hover:text-foreground hover:shadow-2xs active:scale-[0.98] cursor-pointer"
          >
            <span>{showLessText}</span>
            <span aria-hidden="true">↑</span>
          </button>
        )}
      </div>

      {/* 3. Modal Popup via createPortal directly into document.body */}
      {activeCert &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveCert(null)}
          >
            <div
              className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden motion-safe:animate-in motion-safe:fade-in-50 motion-safe:zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-5">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const categoryStyle = getCategoryBadge(activeCert.category.vi);
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${categoryStyle.badge}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${categoryStyle.dot}`}
                            aria-hidden="true"
                          />
                          <span>{activeCert.category[locale]}</span>
                        </span>
                      );
                    })()}
                    {activeCert.year && (
                      <span className="text-xs text-subtle">
                        {activeCert.year}
                      </span>
                    )}
                  </div>
                  <h3
                    id="cert-modal-title"
                    className="mt-1 text-sm sm:text-base font-semibold text-foreground truncate"
                  >
                    {activeCert.title[locale]}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {activeCert.issuer[locale]}
                  </p>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeCert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent shadow-2xs"
                  >
                    <span>{openNewTabText}</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-foreground cursor-pointer"
                    aria-label={closeText}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body: Image or PDF Preview */}
              <div className="flex-1 overflow-auto p-3 sm:p-6 bg-surface-soft/40 flex items-center justify-center min-h-[320px]">
                {activeCert.fileType === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeCert.file}
                    alt={activeCert.title[locale]}
                    className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-md"
                  />
                ) : (
                  <iframe
                    src={activeCert.file}
                    className="w-full h-[72vh] rounded-xl border border-border bg-surface"
                    title={activeCert.title[locale]}
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
