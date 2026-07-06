import fs from "node:fs";
import path from "node:path";
import { CITY_PAGE_COPY } from "../lib/city-page-copy";
import { getProjectPageDetail } from "../lib/project-page-details";
import {
  listDefaultSeoEntries,
  pathToSeoSlug,
  PROJECT_SEO_OVERRIDES,
  type CmsSeoEntry,
  type PageSeoFields,
} from "../lib/seo/page-seo-defaults";

function yamlQuote(value: string): string {
  return JSON.stringify(value);
}

function robotsFlags(fields: PageSeoFields): { indexInSearch: boolean; followLinks: boolean } {
  const robots = fields.robots;
  if (robots == null || typeof robots === "string") {
    return { indexInSearch: true, followLinks: true };
  }
  return {
    indexInSearch: robots.index !== false,
    followLinks: robots.follow !== false,
  };
}

function serializeEntry(entry: CmsSeoEntry): string {
  const lines = [
    `slug: ${entry.slug}`,
    `pagePath: ${yamlQuote(entry.pagePath)}`,
    `title: ${yamlQuote(entry.title)}`,
    `description: ${yamlQuote(entry.description)}`,
  ];

  if (entry.focusKeyword) {
    lines.push(`focusKeyword: ${yamlQuote(entry.focusKeyword)}`);
  }

  if (entry.keywords?.length) {
    lines.push("keywords:");
    for (const kw of entry.keywords) {
      lines.push(`  - ${yamlQuote(kw)}`);
    }
  }

  if (entry.openGraphTitle) {
    lines.push(`openGraphTitle: ${yamlQuote(entry.openGraphTitle)}`);
  }

  if (entry.openGraphDescription) {
    lines.push(`openGraphDescription: ${yamlQuote(entry.openGraphDescription)}`);
  }

  lines.push(`indexInSearch: ${entry.indexInSearch !== false}`);
  lines.push(`followLinks: ${entry.followLinks !== false}`);

  return `${lines.join("\n")}\n`;
}

function projectEntry(
  city: "hyderabad" | "bhubaneswar",
  project: (typeof CITY_PAGE_COPY.hyderabad.galleryProjects)[number],
): CmsSeoEntry {
  const key = `${city}/${project.slug}`;
  const override = PROJECT_SEO_OVERRIDES[key];
  const detail = getProjectPageDetail(project.slug);
  const description = override?.description ?? detail?.contextLine ?? project.excerpt;
  const { indexInSearch, followLinks } = robotsFlags(override ?? { title: "", description: "" });

  return {
    slug: pathToSeoSlug(`/${city}/projects/${project.slug}`),
    pagePath: `/${city}/projects/${project.slug}`,
    title: override?.title ?? project.name,
    description,
    focusKeyword: override?.focusKeyword ?? `${project.tag} interior design`,
    keywords: override?.keywords,
    openGraphTitle: override?.openGraphTitle,
    openGraphDescription: override?.openGraphDescription,
    indexInSearch,
    followLinks,
  };
}

const outDir = path.join(process.cwd(), "content/seo");
fs.mkdirSync(outDir, { recursive: true });

const entries: CmsSeoEntry[] = [...listDefaultSeoEntries()];

for (const city of ["hyderabad", "bhubaneswar"] as const) {
  for (const project of CITY_PAGE_COPY[city].galleryProjects) {
    entries.push(projectEntry(city, project));
  }
}

for (const entry of entries) {
  fs.writeFileSync(path.join(outDir, `${entry.slug}.yaml`), serializeEntry(entry), "utf8");
}

console.log(`Seeded ${entries.length} SEO files in content/seo/`);
