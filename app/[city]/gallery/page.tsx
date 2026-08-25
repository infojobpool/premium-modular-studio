import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import { GallerySegmented } from "@/components/GallerySegmented";
import { InspirationStrip } from "@/components/InspirationStrip";
import { getGalleryBeforeAfter } from "@/lib/gallery-before-after";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  return await buildMetadataForPath(`/${raw}/gallery`);
}

export default async function CityGalleryPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;
  const beforeAfter = getGalleryBeforeAfter(city);

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <BeforeAfterCompare {...beforeAfter} padForFixedHeader />
      <GallerySegmented city={city} locationLabel={STUDIO_LOCATIONS[city].label} />
      <InspirationStrip />
    </CityPageShell>
  );
}
