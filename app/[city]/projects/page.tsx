import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityPageShell } from "@/components/CityPageShell";
import { CityProjectsIndexContent } from "@/components/CityProjectsIndexContent";
import { isStudioCity } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { getCustomerStories } from "@/lib/reviews/customer-stories";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  return await buildMetadataForPath(`/${raw}/projects`);
}

export default async function CityProjectsIndex({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();
  const city = raw as StudioLocationId;
  const stories = await getCustomerStories();

  return (
    <CityPageShell>
      <CityProjectsIndexContent city={city} stories={stories} />
    </CityPageShell>
  );
}
