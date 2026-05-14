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
    <section
      id="work"
      className="relative overflow-x-clip border-b border-ink/10 bg-gradient-to-b from-canvas via-canvas to-panel/35 py-16 sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className={`relative mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Reveal
          key={city}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-12 xl:gap-16"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong sm:text-xs">
              Portfolio · {locationLabel}
            </p>
            <h1 className="mt-3 text-balance font-display text-[clamp(2.1rem,4.8vw+0.6rem,3.65rem)] font-semibold leading-[1.06] tracking-tight text-ink">
              {copy.galleryHeading}
            </h1>
            <p className="mt-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-ink/14 bg-panel/55 px-3.5 py-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:text-[11px] sm:tracking-[0.16em]">
              <span className="text-accent-strong" aria-hidden>
                ●
              </span>
              Tap a thumbnail to enlarge · use arrows or swipe between stills
            </p>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted sm:text-[0.98rem] lg:text-right lg:leading-[1.65]">
            {withBrandHighlight(copy.galleryIntro)}
          </p>
        </Reveal>

        <div
          className="mt-10 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-py-2 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Choose a project"
        >
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`gallery-panel-${p.slug}`}
                id={`gallery-tab-${p.slug}`}
                onClick={() => setActive(i)}
                className={
                  isActive
                    ? "snap-start text-balance rounded-2xl bg-accent px-4 py-3 text-left text-sm font-semibold leading-snug text-ink shadow-[0_10px_28px_-12px_rgba(217,162,41,0.55)] ring-1 ring-ink/10 transition sm:min-h-0 sm:max-w-[17rem] sm:px-5 sm:py-3.5"
                    : "snap-start text-balance rounded-2xl border border-ink/18 bg-canvas/95 px-4 py-3 text-left text-sm font-medium leading-snug text-ink shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_6px_18px_-14px_rgba(27,63,46,0.18)] transition hover:border-accent/40 hover:bg-panel/70 sm:min-h-0 sm:max-w-[17rem] sm:px-5 sm:py-3.5"
                }
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`gallery-panel-${project.slug}`}
        role="tabpanel"
        aria-labelledby={`gallery-tab-${project.slug}`}
        className="mt-8 space-y-8"
      >
        <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
          <div className="flex flex-col gap-5 rounded-2xl border border-ink/12 bg-gradient-to-br from-canvas/95 via-canvas/88 to-panel/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_16px_40px_-28px_rgba(27,63,46,0.25)] sm:p-6 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-xs">
                {project.tag}
              </p>
              <h2 className="mt-2 text-balance break-words font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                {project.name}
              </h2>
              <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                {project.excerpt}
              </p>
            </div>
            <Link
              href={`/${city}/projects/${project.slug}`}
              className="inline-flex h-11 shrink-0 items-center justify-center self-start rounded-full border border-ink/18 bg-panel/70 px-5 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-sm transition hover:border-accent/45 hover:bg-accent/15 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:self-center"
            >
              Case study →
            </Link>
          </div>
        </div>

        <div className={PAGE_GUTTER_X}>
          <div
            className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
            aria-label={`${project.name} — image grid`}
          >
            {images.map((src, idx) => (
              <button
                key={`${project.slug}-${idx}-${src}`}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-haspopup="dialog"
                aria-label={`Open image ${idx + 1} of ${images.length} in viewer`}
                className="group relative z-0 aspect-square cursor-[zoom-in] overflow-hidden rounded-lg border border-ink/8 bg-ink/[0.06] p-0 text-left shadow-sm transition hover:z-[1] hover:border-accent/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:rounded-xl"
              >
                <Image
                  src={src}
                  alt={`${project.alt} — still ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                  className="pointer-events-none object-cover transition duration-500 ease-out group-hover:scale-[1.045]"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative mx-auto mt-12 text-center ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Link
          href={`/${city}/projects`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-canvas/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          View all project stories
          <span aria-hidden>→</span>
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
