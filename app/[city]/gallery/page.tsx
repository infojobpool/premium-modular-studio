import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import { GallerySegmented } from "@/components/GallerySegmented";
import { InspirationStrip } from "@/components/InspirationStrip";
import { getGalleryBeforeAfter } from "@/lib/gallery-before-after";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";

type Props = { params: Promise<{ city: string }> };

function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const label = STUDIO_LOCATIONS[city].label;
  return {
    title: `Gallery · ${label}`,
    description: clip(CITY_PAGE_COPY[city].galleryIntro),
    openGraph: { title: `Gallery · ${label} | Vivid In2erio` },
  };
}

export default async function CityGalleryPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;
  const beforeAfter = getGalleryBeforeAfter(city);

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <BeforeAfterCompare {...beforeAfter} />
      <GallerySegmented city={city} locationLabel={STUDIO_LOCATIONS[city].label} />
      <InspirationStrip />
    </CityPageShell>
  );
}
