import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CITY_PAGE_COPY, isStudioCity } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X, resolveGalleryTileSrc } from "@/lib/interior-images";
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
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Case studies · {STUDIO_LOCATIONS[city].label}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
            Projects
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{copy.galleryIntro}</p>

          <ul className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-5">
            {copy.galleryProjects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/${city}/projects/${p.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-ink/10 bg-panel/40 shadow-sm transition hover:border-accent/35 hover:shadow-[0_24px_60px_-32px_rgba(27,63,46,0.18)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={resolveGalleryTileSrc(p, i)}
                      alt={p.alt}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <p className="pointer-events-none absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.25em] text-canvas/90">
                      {p.tag}
                    </p>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h2 className="font-display text-2xl text-ink group-hover:text-accent">
                      {p.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Read story →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

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
