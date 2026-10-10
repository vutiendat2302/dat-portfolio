"use client";

interface CvActionsProps {
  printLabel: string;
  downloadLabel: string;
}

export function CvActions({ printLabel, downloadLabel }: CvActionsProps) {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label={printLabel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 text-muted"
          aria-hidden="true"
        >
          <path d="M6 9V2h12v7" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v8H6z" />
        </svg>
        <span>{printLabel}</span>
      </button>

      <a
        href="/pdf/cv.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{downloadLabel}</span>
      </a>
    </div>
  );
}
