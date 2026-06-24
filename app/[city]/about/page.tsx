import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { About } from "@/components/About";
import { FounderSpotlight } from "@/components/FounderSpotlight";
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
    title: `About · ${label}`,
    description: clip(CITY_PAGE_COPY[city].aboutLead),
    openGraph: { title: `About · ${label} | Vivid In2wrio` },
  };
}

export default async function CityAboutPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <About />
      <FounderSpotlight />
    </CityPageShell>
  );
}
