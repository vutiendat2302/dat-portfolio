import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/common/Container";
import { AlbumDetailView } from "@/components/photos/AlbumDetailView";
import { getAlbumBySlug, photoAlbums } from "@/data/photos";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { createMetadata } from "@/lib/seo";

interface AlbumPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    photoAlbums.map((album) => ({
      locale,
      slug: album.slug,
    })),
  );
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const album = getAlbumBySlug(slug);
  if (!album) return {};

  const dictionary = getDictionary(locale);
  const title = `${album.title[locale]} | ${dictionary.photosPage.breadcrumbPhotos}`;
  const description =
    album.description?.[locale] || dictionary.metadata.photosDescription;

  return createMetadata({
    title,
    description,
    locale,
    path: `/photos/${slug}`,
  });
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const album = getAlbumBySlug(slug);
  if (!album) notFound();

  const dictionary = getDictionary(locale);

  // Find prev/next album in the same category
  const categoryAlbums = photoAlbums.filter(
    (a) => a.category === album.category,
  );
  const currentIndex = categoryAlbums.findIndex((a) => a.id === album.id);
  const prevAlbum = currentIndex > 0 ? categoryAlbums[currentIndex - 1] : null;
  const nextAlbum =
    currentIndex < categoryAlbums.length - 1
      ? categoryAlbums[currentIndex + 1]
      : null;

  return (
    <Container className="pt-2 pb-14 sm:pt-4 sm:pb-20 lg:pt-6 lg:pb-24">
      <AlbumDetailView
        album={album}
        prevAlbum={prevAlbum}
        nextAlbum={nextAlbum}
        locale={locale}
        dictionary={dictionary}
      />
    </Container>
  );
}
