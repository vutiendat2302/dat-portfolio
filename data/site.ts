export const siteConfig = {
  name: "Dat",
  title: "DAT Portfolio",
  description: "Portfolio cá nhân và technical blog của Dat.",
  locale: "vi_VN",
} as const;

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    return new URL(configuredUrl ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}
