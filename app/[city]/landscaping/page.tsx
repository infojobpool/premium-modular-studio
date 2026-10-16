import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { PracticeGallery } from "@/components/PracticeGallery";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { LANDSCAPING_PAGE } from "@/lib/practice-galleries";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  return await buildMetadataForPath(`/${raw}/landscaping`);
}

export default async function CityLandscapingPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <PracticeGallery page={LANDSCAPING_PAGE} />
    </CityPageShell>
  );
}
