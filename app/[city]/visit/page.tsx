import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { StudioMapSection } from "@/components/StudioMapSection";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const loc = STUDIO_LOCATIONS[city];
  return {
    title: `Visit · ${loc.label}`,
    description: `${loc.regionLine}. ${loc.addressLines.join(" ")}`,
    openGraph: { title: `Visit · ${loc.label} | Vivid In2erio` },
  };
}

export default async function CityVisitPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <StudioMapSection />
    </CityPageShell>
  );
}
