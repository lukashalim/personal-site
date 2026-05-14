import type { MetadataRoute } from "next";
import { getAllLeadMagnets } from "@/lib/resources";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified },
    { url: `${base}/resources`, lastModified },
  ];

  const resourceRoutes = getAllLeadMagnets().map((r) => ({
    url: `${base}/r/${r.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...resourceRoutes];
}
