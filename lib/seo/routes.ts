import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { BLOG_POSTS } from "@/lib/blog-posts";
import type { StudioLocationId } from "@/lib/locations";

/** City sub-routes included in sitemap and future SEO admin. */
export const CITY_SUBPAGES = [
  "about",
  "gallery",
  "projects",
  "contact",
  "faq",
  "blog",
  "careers",
] as const;

export type CitySubpage = (typeof CITY_SUBPAGES)[number];

export type SitemapEntry = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

const STUDIO_CITIES: StudioLocationId[] = ["hyderabad", "bhubaneswar"];

/** All indexable public paths for sitemap generation and SEO audits. */
export function getPublicSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.75 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.25 },
  ];

  for (const city of STUDIO_CITIES) {
    entries.push({ path: `/${city}`, changeFrequency: "weekly", priority: 0.9 });

    for (const sub of CITY_SUBPAGES) {
      entries.push({
        path: `/${city}/${sub}`,
        changeFrequency: "monthly",
        priority: sub === "contact" ? 0.85 : 0.7,
      });
    }

    for (const post of BLOG_POSTS) {
      entries.push({
        path: `/${city}/blog/${post.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const project of CITY_PAGE_COPY[city].galleryProjects) {
      entries.push({
        path: `/${city}/projects/${project.slug}`,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
