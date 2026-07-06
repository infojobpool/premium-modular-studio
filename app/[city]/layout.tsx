import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityShell } from "@/components/CityShell";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  return await buildMetadataForPath(`/${raw as StudioLocationId}`);
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
