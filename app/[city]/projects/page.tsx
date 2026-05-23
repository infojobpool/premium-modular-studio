import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CityProjectsIndexContent } from "@/components/CityProjectsIndexContent";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const label = STUDIO_LOCATIONS[city].label;
  return {
    title: `Projects · ${label}`,
    description: CITY_PAGE_COPY[city].galleryIntro,
  };
}

export default async function CityProjectsIndex({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <CityProjectsIndexContent city={city} />
    </CityPageShell>
  );
}
