import { ImageResponse } from "next/og";
import { OgShareLayout } from "@/lib/og-share-layout";

export const alt =
  "Vivid In2erio — premium and luxury interiors in Hyderabad and Bhubaneswar, design to delivery.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgShareLayout />, {
    ...size,
  });
}
