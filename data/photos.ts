import type { PhotoAlbum } from "@/data/types";
import photosData from "@/data/translations/photos.json";

export const photoAlbums: PhotoAlbum[] = photosData as PhotoAlbum[];

export function getAlbumsByCategory(category: "me" | "everyone"): PhotoAlbum[] {
  return photoAlbums.filter((album) => album.category === category);
}

export function getAlbumBySlug(slug: string): PhotoAlbum | undefined {
  return photoAlbums.find((album) => album.slug === slug);
}
