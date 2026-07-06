import type { StudioLocationId } from "@/lib/locations";
import { getPageSeoFields, listEditableSeoPaths, type PageSeoFields } from "./page-seo";
import { CITY_SUBPAGES, type CitySubpage } from "./routes";

/**
 * Structured SEO record per public route — derived from Keystatic + editable defaults.
 */
export type SeoPageRecord = PageSeoFields & {
  path: string;
  segment: "hub" | "global" | "city-home" | "city-subpage" | "project";
  city?: StudioLocationId;
  subpage?: CitySubpage;
  projectSlug?: string;
};

function segmentForPath(path: string): SeoPageRecord["segment"] {
  if (path === "/") return "hub";
  if (path === "/projects" || path === "/privacy") return "global";
  if (/^\/(hyderabad|bhubaneswar)$/.test(path)) return "city-home";
  if (/^\/(hyderabad|bhubaneswar)\/projects\/[^/]+$/.test(path)) return "project";
  return "city-subpage";
}

/** Full SEO registry for all indexable routes — edit in Keystatic at `/keystatic`. */
export async function getSeoPageRegistry(): Promise<SeoPageRecord[]> {
  const records: SeoPageRecord[] = [];

  for (const path of await listEditableSeoPaths()) {
    const fields = await getPageSeoFields(path);
    if (!fields) continue;

    const cityMatch = path.match(/^\/(hyderabad|bhubaneswar)(?:\/(.*))?$/);
    const city = cityMatch?.[1] as StudioLocationId | undefined;
    const rest = cityMatch?.[2];
    const projectSlug = rest?.match(/^projects\/(.+)$/)?.[1];
    const subpage =
      rest && (CITY_SUBPAGES as readonly string[]).includes(rest)
        ? (rest as CitySubpage)
        : undefined;

    records.push({
      path,
      segment: segmentForPath(path),
      city,
      subpage,
      projectSlug,
      title: fields.title,
      description: fields.description,
      keywords: fields.keywords,
      openGraphTitle: fields.openGraphTitle,
      openGraphDescription: fields.openGraphDescription,
      focusKeyword: fields.focusKeyword,
      robots: fields.robots,
    });
  }

  return records;
}
