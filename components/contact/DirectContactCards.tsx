"use client";

import { useState } from "react";

interface DirectContactCardsProps {
  email?: string;
  phone?: string;
  labels: {
    email: string;
    phone: string;
    copy: string;
    copied: string;
    openEmail: string;
  };
}

export function DirectContactCards({ email, phone, labels }: DirectContactCardsProps) {
  const [copiedTarget, setCopiedTarget] = useState<"email" | "phone" | null>(null);

  function handleCopy(text: string, target: "email" | "phone") {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTarget(target);
      setTimeout(() => {
        setCopiedTarget(null);
      }, 2000);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {/* 1. Email Card */}
      {email && (
        <div className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:bg-surface-soft/30 hover:shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-muted transition-colors group-hover:text-accent">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-wider">
                {labels.email}
              </p>
            </div>
            {/* Plain text display, no <a> tag */}
            <p className="mt-3 text-base sm:text-lg font-medium text-foreground select-all font-sans break-all sm:break-normal">
              {email}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-3">
            <button
              type="button"
              onClick={() => handleCopy(email, "email")}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer shadow-2xs active:scale-[0.98] ${
                copiedTarget === "email"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-surface-soft text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {copiedTarget === "email" ? (
                <svg className="size-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
              <span>{copiedTarget === "email" ? labels.copied : labels.copy}</span>
            </button>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-soft px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent shadow-2xs active:scale-[0.98]"
            >
              <svg
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>{labels.openEmail}</span>
            </a>
          </div>
        </div>
      )}

      {/* 2. Phone Card */}
      {phone && (
        <div className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:bg-surface-soft/30 hover:shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-muted transition-colors group-hover:text-accent">
              <svg
                className="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-wider">
                {labels.phone}
              </p>
            </div>
            {/* Plain text display, no <a> tag */}
            <p className="mt-3 text-base sm:text-lg font-medium text-foreground select-all font-sans">
              {phone}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-3">
            <button
              type="button"
              onClick={() => handleCopy(phone, "phone")}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer shadow-2xs active:scale-[0.98] ${
                copiedTarget === "phone"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-border bg-surface-soft text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {copiedTarget === "phone" ? (
                <svg className="size-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
              <span>{copiedTarget === "phone" ? labels.copied : labels.copy}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
