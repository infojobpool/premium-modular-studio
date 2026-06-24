import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityFAQ } from "@/components/CityFAQ";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { CityPageShell } from "@/components/CityPageShell";
import { CitySubpageBackLink } from "@/components/CitySubpageBackLink";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const label = STUDIO_LOCATIONS[city].label;
  const first = CITY_PAGE_COPY[city].faqs[0];
  const description = first ? `${first.question} ${first.answer}` : `FAQs · ${label}`;
  return {
    title: `FAQ · ${label}`,
    description: description.slice(0, 158),
    openGraph: { title: `FAQ · ${label} | Vivid In2wrio` },
  };
}

export default async function CityFaqPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;

  return (
    <CityPageShell>
      <FaqJsonLd city={city} />
      <CitySubpageBackLink city={city} />
      <CityFAQ />
    </CityPageShell>
  );
}
