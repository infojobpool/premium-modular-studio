import type { Metadata } from "next";
import Link from "next/link";
import { CityShell } from "@/components/CityShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "All projects",
  description:
    "Case studies across Hyderabad and Bhubaneswar — kitchens, villas, and apartments with name-specific scope and documentation.",
};

export default function AllProjectsIndexPage() {
  const cities: StudioLocationId[] = ["hyderabad", "bhubaneswar"];

  return (
    <CityShell city="hyderabad">
      <main>
        <Header />
        <div className={`pb-28 pt-32 ${PAGE_GUTTER_X}`}>
          <div className={`mx-auto ${CONTENT_MAX}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Portfolio</p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
              All project pages
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Each title opens a dedicated case study with copy, scope, and imagery matched to that
              project name—not a single generic template.
            </p>

            <div className="mt-16 space-y-14">
              {cities.map((city) => (
                <section key={city}>
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">
                    {STUDIO_LOCATIONS[city].label}
                  </h2>
                  <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                    {CITY_PAGE_COPY[city].galleryProjects.map((p) => (
                      <li key={`${city}-${p.slug}`}>
                        <Link
                          href={`/${city}/projects/${p.slug}`}
                          className="flex flex-col gap-1 py-5 transition-colors hover:bg-panel/30 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-2"
                        >
                          <span className="font-display text-xl text-ink">{p.name}</span>
                          <span className="text-sm text-muted">{p.tag}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-14 text-center text-sm text-muted">
              <Link href="/" className="text-ink underline-offset-4 hover:underline">
                ← Studio hub
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </CityShell>
  );
}
