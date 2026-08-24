import { ImageResponse } from "next/og";
import { loadOgShareAssets, OG_IMAGE_SIZE } from "@/lib/og-image-assets";
import { OgShareLayout } from "@/lib/og-share-layout";

export const runtime = "nodejs";

export const alt =
  "Vivid In2erio — premium and luxury interiors in Hyderabad and Bhubaneswar, design to delivery.";

export const size = OG_IMAGE_SIZE;

export const contentType = "image/png";

export default async function TwitterImage() {
  const { fonts, heroSrc, logoSrc } = await loadOgShareAssets();

  return new ImageResponse(
    (
      <OgShareLayout
        heroSrc={heroSrc}
        logoSrc={logoSrc}
        locationLine="Hyderabad · Bhubaneswar"
        subline="Design to delivery for homes & workspaces — curated materials, modular craft, and studio-led execution across Telangana and Odisha."
      />
    ),
    {
      ...size,
      fonts,
    },
  );
}
