import fs from "node:fs";
import path from "node:path";
import { STUDIO_LOCATIONS, type StudioLocationId } from "../lib/locations";
import { BRAND_NAME } from "../lib/seo/constants";
import { citySeoKeywords } from "../lib/seo/metadata";
import { getSeoPageRegistry } from "../lib/seo/page-registry";
import { pathToSeoSlug } from "../lib/seo/page-seo-defaults";
import type { PageSeoFields } from "../lib/seo/page-seo-defaults";
import { getSiteUrl } from "../lib/site-url";

/** SEO-first column order for spreadsheet editing. */
const COLUMNS = [
  "page_path",
  "live_url",
  "meta_title",
  "google_title",
  "meta_description",
  "focus_keyword",
  "extra_keywords",
  "all_keywords",
  "og_title",
  "og_description",
  "title_length",
  "description_length",
  "index_in_search",
  "follow_links",
  "slug",
  "segment",
  "city",
  "subpage",
  "project_slug",
] as const;

type ExportRow = Record<(typeof COLUMNS)[number], string | number | boolean>;

function csvCell(value: string | number | boolean | undefined | null): string {
  if (value == null) return "";
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function robotsFlag(
  robots: { index?: boolean; follow?: boolean } | string | undefined,
  key: "index" | "follow",
): boolean {
  if (robots == null || typeof robots === "string") return true;
  return key === "index" ? robots.index !== false : robots.follow !== false;
}

function allKeywords(fields: PageSeoFields, city?: StudioLocationId): string[] {
  const cityLabel = city ? STUDIO_LOCATIONS[city].label : undefined;
  const base = cityLabel ? citySeoKeywords(cityLabel) : [];
  const extra = fields.keywords ?? [];
  const focus = fields.focusKeyword ? [fields.focusKeyword] : [];
  return [...new Set([...focus, ...extra, ...base])];
}

async function main() {
  const base = getSiteUrl();
  const records = await getSeoPageRegistry();
  const rows: ExportRow[] = records
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((record) => {
      const liveUrl = record.path === "/" ? base : `${base}${record.path}`;
      const extraKeywords = record.keywords ?? [];
      const mergedKeywords = allKeywords(record, record.city);
      const metaTitle = record.title;
      const googleTitle = `${metaTitle} | ${BRAND_NAME}`;
      const ogTitle = record.openGraphTitle ?? googleTitle;

      return {
        page_path: record.path,
        live_url: liveUrl,
        meta_title: metaTitle,
        google_title: googleTitle,
        meta_description: record.description,
        focus_keyword: record.focusKeyword ?? "",
        extra_keywords: extraKeywords.join("; "),
        all_keywords: mergedKeywords.join("; "),
        og_title: ogTitle,
        og_description: record.openGraphDescription ?? record.description,
        title_length: metaTitle.length,
        description_length: record.description.length,
        index_in_search: robotsFlag(record.robots, "index"),
        follow_links: robotsFlag(record.robots, "follow"),
        slug: pathToSeoSlug(record.path),
        segment: record.segment,
        city: record.city ?? "",
        subpage: record.subpage ?? "",
        project_slug: record.projectSlug ?? "",
      };
    });

  const header = COLUMNS.join(",");
  const body = rows.map((row) => COLUMNS.map((col) => csvCell(row[col])).join(",")).join("\n");
  const csv = `${header}\n${body}\n`;

  const outDir = path.join(process.cwd(), "content");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "seo-fields.csv");
  fs.writeFileSync(outFile, csv, "utf8");

  console.log(`Exported ${rows.length} pages → ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
