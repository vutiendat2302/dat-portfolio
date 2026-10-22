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
    <section className="py-4 sm:py-10 lg:py-16" aria-labelledby="hero-title">
      <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.30fr)_minmax(260px,0.65fr)] lg:gap-20">
        <div className="order-2 lg:order-1">
          <h1
            id="hero-title"
            className="max-w-3xl text-balance text-3xl font-medium leading-[1.15] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[64px] lg:leading-[1.08]"
          >
            {dictionary.hero.greeting} {profile.name[locale]}.
            <span className="mt-2 block text-muted">
              {dictionary.hero.headline}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-8">
            {profile.introduction[locale]}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              href={localePath(locale, "/projects")}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {dictionary.hero.exploreWork}
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                ↗︎
              </span>
            </Link>
            <Link
              href={localePath(locale, "/blog")}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-foreground/30 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-white"
            >
              {dictionary.hero.readWriting}
            </Link>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-64 sm:max-w-72 lg:order-2 lg:max-w-md">
          <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-border-strong bg-surface p-2 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md sm:p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/ava1.JPG"
                alt={`${profile.name[locale]} - ${profile.role[locale]}`}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, (min-width: 640px) 288px, 256px"
                className="object-cover object-[90%] transition-transform duration-500 ease-out group-hover:scale-180"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
