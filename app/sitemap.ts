import type { MetadataRoute } from "next";
import { getPublicSitemapEntries } from "@/lib/seo/routes";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return getPublicSitemapEntries().map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
