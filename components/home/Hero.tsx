import Link from "next/link";
import Image from "next/image";

import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { TypewriterText } from "@/components/home/TypewriterText";

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
            <span className="mt-3 block min-h-[2.6em] sm:min-h-[1.3em] text-muted font-normal text-2xl sm:text-4xl lg:text-5xl">
              <TypewriterText
                key={dictionary.hero.headline}
                text={dictionary.hero.headline}
                endIcon="✨"
                delay={2000}
              />
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-8">
            {profile.introduction[locale]}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link
              href={localePath(locale, "/projects")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-2xs transition-all duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4"
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
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25A2.25 2.25 0 018.25 10.5H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
              <span>{dictionary.hero.exploreWork}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>

            <Link
              href={localePath(locale, "/blog")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-accent hover:text-accent hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4"
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
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span>{dictionary.hero.readWriting}</span>
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
                className="object-cover object-[90%] transition-transform duration-500 ease-out group-hover:scale-150"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
