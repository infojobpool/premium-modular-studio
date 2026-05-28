import { ImageResponse } from "next/og";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { loadOgShareAssets, OG_IMAGE_SIZE } from "@/lib/og-image-assets";
import { OgShareLayout } from "@/lib/og-share-layout";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";

export const runtime = "nodejs";

export const alt =
  "Vivid In2erio — premium and luxury interiors in Hyderabad and Bhubaneswar, design to delivery.";

export const size = OG_IMAGE_SIZE;

export const contentType = "image/png";

type Props = {
  params: Promise<{ city: string }>;
};

function clip(text: string, max = 132): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export default async function CityOpenGraphImage({ params }: Props) {
  const { city: raw } = await params;
  const city = isStudioCity(raw) ? (raw as StudioLocationId) : "hyderabad";
  const label = STUDIO_LOCATIONS[city].label;
  const copy = CITY_PAGE_COPY[city];

  const { fonts, logoSrc, heroSrc } = await loadOgShareAssets(city);

  return new ImageResponse(
    (
      <OgShareLayout
        logoSrc={logoSrc}
        heroSrc={heroSrc}
        locationLine={`${label} studio`}
        headline="Premium & luxury interiors"
        subline={clip(copy.heroLead)}
        cta="Book a studio consultation"
      />
    ),
    {
      ...size,
      fonts,
    },
  );
}
