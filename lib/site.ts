/** Site-wide copy and links. Override YouTube via NEXT_PUBLIC_YOUTUBE_CHANNEL_URL on Vercel. */
export const siteConfig = {
  name: "Lukas Halim",
  titleTemplate: "%s · Lukas Halim",
  defaultTitle: "Lukas Halim — Azure AI & AI-103 study",
  description:
    "Notes, downloads, and videos while studying Azure AI and the AI-103 exam path. Free resources and a focused YouTube series.",
  youtubeChannelUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ??
    "https://www.youtube.com/@haliml",
} as const;

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
