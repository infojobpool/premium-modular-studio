import type { Metadata } from "next";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";
import { getProjectPageDetail } from "@/lib/project-page-details";
import { loadSeoFromCms } from "./cms-reader";
import {
  buildPageMetadata,
  cityOpenGraphImage,
  citySeoKeywords,
  type BuildPageMetadataInput,
} from "./metadata";
import {
  CITY_HOME_SEO,
  CITY_SUBPAGE_SEO,
  GLOBAL_PAGE_SEO,
  PROJECT_SEO_OVERRIDES,
  type PageSeoFields,
} from "./page-seo-defaults";
import { CITY_SUBPAGES } from "./routes";

export type { PageSeoFields } from "./page-seo-defaults";
export {
  CITY_HOME_SEO,
  CITY_SUBPAGE_SEO,
  GLOBAL_PAGE_SEO,
  PROJECT_SEO_OVERRIDES,
} from "./page-seo-defaults";

function mergeKeywords(fields: PageSeoFields, cityLabel?: string): string[] | undefined {
  const base = cityLabel ? citySeoKeywords(cityLabel) : [];
  const extra = fields.keywords ?? [];
  const focus = fields.focusKeyword ? [fields.focusKeyword] : [];
  const merged = [...focus, ...extra, ...base];
  return merged.length > 0 ? [...new Set(merged)] : undefined;
}

function fieldsToMetadata(
  pathname: string,
  fields: PageSeoFields,
  options?: { ogImage?: BuildPageMetadataInput["openGraphImage"]; city?: StudioLocationId },
): Metadata {
  const cityLabel = options?.city ? STUDIO_LOCATIONS[options.city].label : undefined;

  return buildPageMetadata({
    title: fields.title,
    description: fields.description,
    pathname,
    openGraphTitle: fields.openGraphTitle,
    openGraphDescription: fields.openGraphDescription,
    openGraphImage: options?.ogImage,
    keywords: mergeKeywords(fields, cityLabel),
    robots: fields.robots,
  });
}

function fallbackProjectSeo(
  path: string,
  city: StudioLocationId,
  slug: string,
): (PageSeoFields & { pathname: string }) | null {
  const project = CITY_PAGE_COPY[city].galleryProjects.find((p) => p.slug === slug);
  if (!project) return null;

  const key = `${city}/${slug}`;
  const override = PROJECT_SEO_OVERRIDES[key];
  const detail = getProjectPageDetail(slug);
  const fallbackDescription = detail?.contextLine ?? project.excerpt;

  return {
    pathname: path,
    title: override?.title ?? project.name,
    description: override?.description ?? fallbackDescription,
    keywords: override?.keywords,
    openGraphTitle: override?.openGraphTitle,
    openGraphDescription: override?.openGraphDescription,
    focusKeyword: override?.focusKeyword ?? `${project.tag} interior design`,
    robots: override?.robots,
  };
}

function fallbackSeoFields(path: string): (PageSeoFields & { pathname: string }) | null {
  if (path in GLOBAL_PAGE_SEO) {
    return { pathname: path, ...GLOBAL_PAGE_SEO[path as keyof typeof GLOBAL_PAGE_SEO] };
  }

  const cityMatch = path.match(/^\/(hyderabad|bhubaneswar)(?:\/(.*))?$/);
  if (!cityMatch) return null;

  const city = cityMatch[1] as StudioLocationId;
  const rest = cityMatch[2];

  if (!rest) {
    return { pathname: path, ...CITY_HOME_SEO[city] };
  }

  const projectMatch = rest.match(/^projects\/([^/]+)$/);
  if (projectMatch) {
    return fallbackProjectSeo(path, city, projectMatch[1]!);
  }

  if ((CITY_SUBPAGES as readonly string[]).includes(rest)) {
    const fields = CITY_SUBPAGE_SEO[`${city}/${rest}`];
    if (fields) return { pathname: path, ...fields };
  }

  return null;
}

/** Resolve editable SEO fields for any public pathname (Keystatic first, then defaults). */
export async function getPageSeoFields(
  pathname: string,
): Promise<(PageSeoFields & { pathname: string }) | null> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const cms = await loadSeoFromCms();
  const fromCms = cms.get(path);

  if (fromCms) {
    return { pathname: path, ...fromCms };
  }

  return fallbackSeoFields(path);
}

/** Build Next.js Metadata from central SEO fields. */
export async function buildMetadataForPath(pathname: string): Promise<Metadata> {
  const fields = await getPageSeoFields(pathname);
  if (!fields) return {};

  const cityMatch = pathname.match(/^\/(hyderabad|bhubaneswar)/);
  const city = cityMatch?.[1] as StudioLocationId | undefined;

  return fieldsToMetadata(pathname, fields, {
    ogImage: city ? cityOpenGraphImage(city, STUDIO_LOCATIONS[city].label) : undefined,
    city,
  });
}

/** List all paths with SEO entries (CMS + project fallbacks). */
export async function listEditableSeoPaths(): Promise<string[]> {
  const cmsPaths = await loadSeoFromCms();
  const paths = new Set(cmsPaths.keys());

  for (const city of ["hyderabad", "bhubaneswar"] as StudioLocationId[]) {
    for (const p of CITY_PAGE_COPY[city].galleryProjects) {
      paths.add(`/${city}/projects/${p.slug}`);
    }
  }

  return [...paths].sort();
}
