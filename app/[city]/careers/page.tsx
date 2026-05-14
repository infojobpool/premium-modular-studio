import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityCareers } from "@/components/CityCareers";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const label = STUDIO_LOCATIONS[city].label;
  return {
    title: `Careers · ${label}`,
    description: `Career opportunities at Vivid In2erio ${label} for interior design, architecture, visualization, and execution roles.`,
    openGraph: { title: `Careers · ${label} | Vivid In2erio` },
  };
}

export default async function CityCareersPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <CitySubpageBackLink city={city} />
      <CityCareers />
    </CityPageShell>
  );
}
