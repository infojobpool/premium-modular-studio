import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CityProjectsGrid } from "@/components/CityProjectsGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
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
  const copy = CITY_PAGE_COPY[city];

  return (
    <main>
      <Header />
      <div className={`pb-24 pt-32 ${PAGE_GUTTER_X}`}>
        <div className={`mx-auto ${CONTENT_MAX}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Case studies · {STUDIO_LOCATIONS[city].label}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
            Projects
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{copy.galleryIntro}</p>

          <CityProjectsGrid city={city} projects={copy.galleryProjects} />

          <p className="mt-16 text-center text-sm text-muted">
            <Link href={`/${city}/gallery`} className="text-ink underline-offset-4 hover:underline">
              ← Back to gallery
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
