import type { Metadata } from "next";
import type { StudioLocationId } from "@/lib/locations";
import {
  BRAND_NAME,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_ALT,
  META_DESCRIPTION_MAX,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "./constants";

export function clipMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export type OgImageConfig = {
  path: string;
  alt?: string;
  width?: number;
  height?: number;
};

function resolveOgImage(config?: string | OgImageConfig): Required<OgImageConfig> {
  if (typeof config === "string") {
    return {
      path: config,
      alt: DEFAULT_OG_ALT,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    };
  }
  if (config) {
    return {
      path: config.path,
      alt: config.alt ?? DEFAULT_OG_ALT,
      width: config.width ?? OG_IMAGE_WIDTH,
      height: config.height ?? OG_IMAGE_HEIGHT,
    };
  }
  return {
    path: "/opengraph-image",
    alt: DEFAULT_OG_ALT,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };
}

function twitterPathFromOg(ogPath: string): string {
  return ogPath.includes("opengraph-image")
    ? ogPath.replace("opengraph-image", "twitter-image")
    : "/twitter-image";
}

export type BuildPageMetadataInput = {
  /** Page title segment (root layout template adds `| Brand`). */
  title: string;
  description: string;
  /** Path only, e.g. `/hyderabad/services`. */
  pathname: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string | OgImageConfig;
  keywords?: string[];
  robots?: Metadata["robots"];
};

/** Builds Next.js Metadata with canonical URL, Open Graph, and Twitter cards. */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const description = clipMetaDescription(input.description);
  const ogTitle = input.openGraphTitle ?? `${input.title} | ${BRAND_NAME}`;
  const ogDescription = clipMetaDescription(input.openGraphDescription ?? input.description);
  const og = resolveOgImage(input.openGraphImage);

  return {
    title: input.title,
    description,
    keywords: input.keywords,
    alternates: {
      canonical: input.pathname,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND_NAME,
      title: ogTitle,
      description: ogDescription,
      url: input.pathname,
      images: [
        {
          url: og.path,
          width: og.width,
          height: og.height,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [twitterPathFromOg(og.path)],
    },
    robots: input.robots ?? { index: true, follow: true },
  };
}

export function cityOpenGraphImage(city: StudioLocationId, cityLabel: string): OgImageConfig {
  return {
    path: `/${city}/opengraph-image`,
    alt: `${BRAND_NAME} ${cityLabel} — premium and luxury interiors`,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };
}

export function citySeoKeywords(cityLabel: string): string[] {
  return [
    `interior design ${cityLabel}`,
    `luxury interiors ${cityLabel}`,
    `${cityLabel} modular kitchen`,
    BRAND_NAME,
  ];
}

export function buildCitySubpageMetadata(
  city: StudioLocationId,
  cityLabel: string,
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return buildPageMetadata({
    title,
    description,
    pathname,
    openGraphImage: cityOpenGraphImage(city, cityLabel),
    keywords: citySeoKeywords(cityLabel),
  });
}

/** Root layout defaults — title template + site-wide fallbacks. */
export function buildRootLayoutMetadata(siteUrl: string): Metadata {
  const defaultDescription =
    "Premium & luxury interiors in Hyderabad and Bhubaneswar — design to delivery for homes and workspaces: curated materials, modular kitchens & wardrobes, 3D sign-off, and studio-led execution.";
  const ogDescription =
    "Hyderabad & Bhubaneswar studios — bespoke residential and commercial interiors from consultation through handover.";

  return {
    metadataBase: new URL(siteUrl),
    applicationName: BRAND_NAME,
    title: {
      default: `${BRAND_NAME} | Premium & luxury interiors`,
      template: `%s | ${BRAND_NAME}`,
    },
    description: defaultDescription,
    keywords: [...DEFAULT_KEYWORDS],
    authors: [{ name: BRAND_NAME }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND_NAME,
      title: `${BRAND_NAME} | Premium & luxury interiors`,
      description: ogDescription,
      images: [
        {
          url: "/opengraph-image",
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: DEFAULT_OG_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} | Premium & luxury interiors`,
      description:
        "Hyderabad & Bhubaneswar — luxury interiors, modular systems, and design-to-delivery execution.",
      images: ["/twitter-image"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.svg",
    },
  };
}
