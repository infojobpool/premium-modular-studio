"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { getGalleryImagesForProject } from "@/lib/gallery-segmented";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import type { StudioLocationId } from "@/lib/locations";
import { withBrandHighlight } from "./BrandInline";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";

type Props = {
  city: StudioLocationId;
  locationLabel: string;
};

export function GallerySegmented({ city, locationLabel }: Props) {
  const copy = CITY_PAGE_COPY[city];
  const projects = copy.galleryProjects;
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const project = projects[active]!;
  const images = useMemo(
    () => getGalleryImagesForProject(city, project.slug),
    [city, project.slug],
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [active, city, project.slug]);

  return (
    <section id="work" className="relative overflow-x-clip py-24 sm:py-28">
      <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Reveal key={city} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
              Portfolio · {locationLabel}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
              {copy.galleryHeading}
            </h2>
          </div>
          <p className="max-w-md text-muted md:text-right">{withBrandHighlight(copy.galleryIntro)}</p>
        </Reveal>
        <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45 sm:text-left">
          Tap any thumbnail to enlarge · arrows or swipe to move between stills
        </p>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter projects"
        >
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={
                  isActive
                    ? "shrink-0 rounded-full bg-accent px-4 py-2.5 text-left text-sm font-semibold text-canvas shadow-sm transition sm:px-5"
                    : "shrink-0 rounded-full border border-ink/15 bg-canvas px-4 py-2.5 text-left text-sm font-medium text-ink transition hover:border-accent/45 hover:bg-panel/60 sm:px-5"
                }
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong/90">{project.tag}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.excerpt}</p>
          </div>
          <Link
            href={`/${city}/projects/${project.slug}`}
            className="shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline"
          >
            Case study →
          </Link>
        </div>
      </div>

      <div className={`mt-10 ${PAGE_GUTTER_X}`}>
        <div
          className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          role="tabpanel"
          aria-label={project.name}
        >
          {images.map((src, idx) => (
            <button
              key={`${project.slug}-${idx}-${src}`}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-haspopup="dialog"
              aria-label={`Open image ${idx + 1} of ${images.length} in viewer`}
              className="group relative z-0 aspect-square cursor-[zoom-in] overflow-hidden border-0 bg-ink/[0.04] p-0 text-left transition hover:ring-2 hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={src}
                alt={`${project.alt} — still ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                className="pointer-events-none object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </div>

      <div className={`mx-auto mt-12 text-center ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Link
          href={`/${city}/projects`}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline"
        >
          View all project stories
        </Link>
      </div>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        altForIndex={(i) => `${project.alt} — still ${i + 1}`}
      />
    </section>
  );
}
