import Link from "next/link";

import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface HeroProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Hero({ locale, dictionary }: HeroProps) {
  return (
    <section className="py-14 sm:py-20 lg:py-28" aria-labelledby="hero-title">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-subtle sm:text-xs">
            {profile.role[locale]}
          </p>
          <h1
            id="hero-title"
            className="max-w-3xl text-balance text-[44px] font-medium leading-[1.08] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[68px]"
          >
            {dictionary.hero.greeting} {profile.name}.
            <span className="mt-2 block text-muted">
              {dictionary.hero.headline}
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {profile.introduction[locale]}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={localePath(locale, "/projects")}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {dictionary.hero.exploreWork}
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                ↗︎
              </span>
            </Link>
            <Link
              href={localePath(locale, "/blog")}
              className="link-underline rounded-sm px-1 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {dictionary.hero.readWriting} →
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-sm text-muted">
            {profile.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {link.label} ↗︎
              </a>
            ))}
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="link-underline rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Email ↗︎
              </a>
            ) : null}
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-64 lg:order-2 lg:max-w-none" aria-hidden="true">
          <div className="technical-grid theme-surface relative aspect-square overflow-hidden rounded-[2rem] border border-border-strong">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-border px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              <span>DAT</span>
              <span>{dictionary.hero.visualLabel}</span>
            </div>
            <div className="absolute inset-0 top-10 grid place-items-center">
              <div className="flow-line absolute left-1/2 top-[28%] h-[44%] w-px -translate-x-1/2 bg-accent/35" />
              <div className="flow-line absolute left-[28%] top-1/2 h-px w-[44%] -translate-y-1/2 bg-accent/35 [animation-delay:500ms]" />

              <span className="node-pulse relative z-10 grid size-24 place-items-center rounded-full border border-accent/40 bg-accent-soft text-5xl font-medium tracking-[-0.08em] text-accent lg:size-28 lg:text-6xl">
                {profile.initials}
              </span>

              <span className="absolute left-[12%] top-[46%] rounded-md border border-border bg-surface px-2 py-1 font-mono text-[9px] text-muted">
                UI
              </span>
              <span className="absolute right-[9%] top-[46%] rounded-md border border-border bg-surface px-2 py-1 font-mono text-[9px] text-muted">
                API
              </span>
              <span className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[9px] text-muted">
                APP
              </span>
              <span className="absolute bottom-[25%] left-1/2 -translate-x-1/2 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[9px] text-muted">
                DATA
              </span>
            </div>
            <div className="absolute inset-x-5 bottom-5 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              {dictionary.hero.visualFooter}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
