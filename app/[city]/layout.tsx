import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityShell } from "@/components/CityShell";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";

type Props = {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
};

function clipDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  const city = raw as StudioLocationId;
  const label = STUDIO_LOCATIONS[city].label;
  const copy = CITY_PAGE_COPY[city];
  return {
    title: `${label} studio`,
    description: clipDescription(copy.heroLead),
    openGraph: {
      title: `${label} studio | Vivid In2erio`,
      description: clipDescription(copy.heroLead),
      images: [
        {
          url: `/${city}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Vivid In2erio ${label} — premium and luxury interiors`,
        },
      ],
    },
  };
}

export default async function CityLayout({ children, params }: Props) {
  const { city } = await params;
  if (!isStudioCity(city)) notFound();
  return (
    <>
      <LocalBusinessJsonLd city={city} />
      <CityShell city={city}>{children}</CityShell>
    </>
  );
}
