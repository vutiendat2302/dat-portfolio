import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/common/Container";
import { PhotoGallery } from "@/components/photos/PhotoGallery";
import { photoAlbums } from "@/data/photos";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface PhotosPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PhotosPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return createMetadata({
    title: dictionary.metadata.photosTitle,
    description: dictionary.metadata.photosDescription,
    locale,
    path: "/photos",
  });
}

export default async function PhotosPage({ params }: PhotosPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <Container className="pt-4 pb-14 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24">
      <Suspense fallback={null}>
        <PhotoGallery albums={photoAlbums} locale={locale} dictionary={dictionary} />
      </Suspense>
    </Container>
  );
}
