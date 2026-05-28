import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { StudioLocationId } from "@/lib/locations";
import { getSiteUrl } from "@/lib/site-url";
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

/** Satori renders `<img>` reliably with ArrayBuffer — not data URLs. */
export type OgImageSrc = ArrayBuffer;

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

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

async function readPublicAssetBuffer(relativePath: string): Promise<OgImageSrc> {
  const buf = await readFile(join(process.cwd(), "public", relativePath));
  return toArrayBuffer(buf);
}

async function fetchRemoteImageBuffer(url: string): Promise<OgImageSrc> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch OG image: ${url}`);
  return res.arrayBuffer();
}

async function loadPublicAssetWithFallback(relativePath: string, publicUrlPath: string): Promise<OgImageSrc> {
  try {
    return await readPublicAssetBuffer(relativePath);
  } catch {
    const origin = getSiteUrl();
    return fetchRemoteImageBuffer(`${origin}${publicUrlPath}`);
  }
}

export async function loadOgHeroImage(city?: StudioLocationId): Promise<OgImageSrc> {
  if (city) {
    try {
      return await loadPublicAssetWithFallback(OG_HERO_BY_CITY[city], `/${OG_HERO_BY_CITY[city]}`);
    } catch {
      /* fall through */
    }
  }

  try {
    return await loadPublicAssetWithFallback(DEFAULT_HERO, `/${DEFAULT_HERO}`);
  } catch {
    return fetchRemoteImageBuffer(vividImages.hero);
  }
}

export async function loadOgShareAssets(city?: StudioLocationId) {
  const [fonts, heroSrc] = await Promise.all([loadOgFonts(), loadOgHeroImage(city)]);
  return { fonts, heroSrc };
}
