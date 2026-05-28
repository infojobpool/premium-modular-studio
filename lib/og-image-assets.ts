import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { StudioLocationId } from "@/lib/locations";
import { vividImages } from "@/lib/vivid-reference";

const CORMORANT_SEMIBOLD =
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf";
const DM_SANS_MEDIUM =
  "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf";
const DM_SANS_SEMIBOLD =
  "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTg.ttf";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const OG_HERO_BY_CITY: Record<StudioLocationId, string> = {
  hyderabad: "welcome-hyderabad-living.png",
  bhubaneswar: "welcome-bhubaneswar-living.png",
};

const DEFAULT_HERO = "gallery/delhi-kitchen/Villa-193-East-Indukuri-Lakeshore-Rnders-revised442.png";

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal";
};

export async function loadOgFonts(): Promise<OgFont[]> {
  const [cormorant, dmMedium, dmSemibold] = await Promise.all([
    fetch(CORMORANT_SEMIBOLD).then((r) => r.arrayBuffer()),
    fetch(DM_SANS_MEDIUM).then((r) => r.arrayBuffer()),
    fetch(DM_SANS_SEMIBOLD).then((r) => r.arrayBuffer()),
  ]);

  return [
    { name: "Cormorant Garamond", data: cormorant, weight: 600, style: "normal" },
    { name: "DM Sans", data: dmMedium, weight: 500, style: "normal" },
    { name: "DM Sans", data: dmSemibold, weight: 600, style: "normal" },
  ];
}

async function readPublicAsset(relativePath: string): Promise<string> {
  const buf = await readFile(join(process.cwd(), "public", relativePath));
  const ext = relativePath.split(".").pop()?.toLowerCase();
  const mime =
    ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function fetchRemoteImageAsDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch OG image: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  return `data:${contentType};base64,${buf.toString("base64")}`;
}

export async function loadOgLogo(): Promise<string> {
  return readPublicAsset("vivid-in2erio-logo.png");
}

export async function loadOgHeroImage(city?: StudioLocationId): Promise<string> {
  if (city) {
    try {
      return await readPublicAsset(OG_HERO_BY_CITY[city]);
    } catch {
      /* fall through */
    }
  }

  try {
    return await readPublicAsset(DEFAULT_HERO);
  } catch {
    return fetchRemoteImageAsDataUrl(vividImages.hero);
  }
}

export async function loadOgShareAssets(city?: StudioLocationId) {
  const [fonts, logoSrc, heroSrc] = await Promise.all([
    loadOgFonts(),
    loadOgLogo(),
    loadOgHeroImage(city),
  ]);
  return { fonts, logoSrc, heroSrc };
}
