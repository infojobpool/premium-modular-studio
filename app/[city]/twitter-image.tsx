import { ImageResponse } from "next/og";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { loadOgShareAssets, OG_IMAGE_SIZE } from "@/lib/og-image-assets";
import { OgShareLayout } from "@/lib/og-share-layout";
import { cityVenueLine, type StudioLocationId } from "@/lib/locations";

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

export default async function CityTwitterImage({ params }: Props) {
  const { city: raw } = await params;
  const city = isStudioCity(raw) ? (raw as StudioLocationId) : "hyderabad";
  const copy = CITY_PAGE_COPY[city];

  const { fonts, heroSrc, logoSrc } = await loadOgShareAssets(city);

  return new ImageResponse(
    (
      <OgShareLayout
        heroSrc={heroSrc}
        logoSrc={logoSrc}
        locationLine={cityVenueLine(city)}
        headline="Premium & luxury interiors"
        subline={clip(copy.heroLead)}
        cta={city === "hyderabad" ? "Book an office consultation" : "Book a studio consultation"}
      />
    ),
    {
      ...size,
      fonts,
    },
  );
}
