import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CityBlogPosts } from "@/components/CityBlogPosts";
import { CityPageShell } from "@/components/CityPageShell";
import { isStudioCity } from "@/lib/city-page-copy";
import { buildMetadataForPath } from "@/lib/seo/page-seo";

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) return {};
  return await buildMetadataForPath(`/${raw}/blog`);
}

export default async function CityBlogPage({ params }: Props) {
  const { city: raw } = await params;
  if (!isStudioCity(raw)) notFound();

  return (
    <CityPageShell>
      <CityBlogPosts />
    </CityPageShell>
  );
}
