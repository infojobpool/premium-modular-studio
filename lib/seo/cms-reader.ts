import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import {
  cmsEntryToPageSeoFields,
  type CmsSeoEntry,
  type PageSeoFields,
} from "./page-seo-defaults";

const reader = createReader(process.cwd(), keystaticConfig);

let seoByPath: Map<string, PageSeoFields> | null = null;

function normalizePath(pathname: string): string {
  if (!pathname.startsWith("/")) return `/${pathname}`;
  return pathname;
}
/** Load all Page SEO entries from Keystatic (cached per process). */
export async function loadSeoFromCms(): Promise<Map<string, PageSeoFields>> {
  if (seoByPath) return seoByPath;

  const map = new Map<string, PageSeoFields>();
  const all = await reader.collections.pageSeo.all();

  for (const { slug, entry } of all) {
    const cmsEntry: CmsSeoEntry = {
      slug,
      pagePath: entry.pagePath,
      title: entry.title,
      description: entry.description,
      focusKeyword: entry.focusKeyword ?? undefined,
      keywords: entry.keywords ? [...entry.keywords] : undefined,
      openGraphTitle: entry.openGraphTitle ?? undefined,
      openGraphDescription: entry.openGraphDescription ?? undefined,
      indexInSearch: entry.indexInSearch ?? true,
      followLinks: entry.followLinks ?? true,
    };
    map.set(normalizePath(cmsEntry.pagePath), cmsEntryToPageSeoFields(cmsEntry));
  }

  seoByPath = map;
  return map;
}

/** List paths that have CMS SEO entries. */
export async function listCmsSeoPaths(): Promise<string[]> {
  const map = await loadSeoFromCms();
  return [...map.keys()].sort();
}
