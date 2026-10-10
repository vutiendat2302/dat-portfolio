import Link from "next/link";

import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import Image from "next/image";


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

        <div className="order-1 mx-auto w-full max-w-64 sm:max-w-72 lg:order-2 lg:max-w-none">
          <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-border-strong bg-surface p-2 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md sm:p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/ava.jpg"
                alt={`${profile.name} - ${profile.role[locale]}`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 288px, 256px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
