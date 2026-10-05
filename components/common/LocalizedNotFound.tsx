"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/common/Container";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function LocalizedNotFound() {
  const pathname = usePathname();
  const localeSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = isLocale(localeSegment) ? localeSegment : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <Container className="grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">{dictionary.notFound.label}</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-foreground sm:text-6xl">{dictionary.notFound.title}</h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-muted">{dictionary.notFound.description}</p>
        <Link href={localePath(locale)} className="mt-8 inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4">{dictionary.notFound.home}</Link>
      </div>
    </Container>
  );
}
