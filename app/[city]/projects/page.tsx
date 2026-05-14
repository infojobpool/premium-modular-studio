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
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong sm:text-xs">
            Case studies · {STUDIO_LOCATIONS[city].label}
          </p>
          <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4.5vw+0.5rem,3.5rem)] font-semibold leading-[1.06] tracking-tight text-ink">
            Projects
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {copy.galleryIntro}
          </p>

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
