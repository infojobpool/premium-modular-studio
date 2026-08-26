"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { CONTENT_MAX, PAGE_GUTTER_X, resolveGalleryTileSrc } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const PREVIEW_COUNT = 3;

export function SignatureWorkStrip() {
  const { location } = useStudioLocation();
  const reduceMotion = useReducedMotion();
  const city = CITY_PAGE_COPY[location.id];
  const projects = city.galleryProjects.slice(0, PREVIEW_COUNT).map((p, i) => ({
    ...p,
    src: resolveGalleryTileSrc(p, i),
  }));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxSrcs = useMemo(() => projects.map((p) => p.src), [projects]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [location.id]);

  return (
    <section className={`pt-8 pb-14 sm:pt-10 sm:pb-16 ${PAGE_GUTTER_X}`} aria-labelledby="signature-work-heading">
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal key={location.id}>
          <EditorialSectionHeader
            number="03"
            eyebrow={`Signature work · ${location.label}`}
            title="Recent case studies"
            id="signature-work-heading"
            align="between"
            trailing={
              <Link
                href={`/${location.id}/gallery#work`}
                className={`text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline md:text-right ${FOCUS_RING}`}
              >
                Open full gallery →
              </Link>
            }
          />
        </Reveal>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
          <span className="lg:hidden">Tap a card to zoom · open case study below</span>
          <span className="hidden lg:inline">Tap the photo area on a card to zoom · arrows or swipe in the viewer</span>
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={`${location.id}-sig-${p.slug}`}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/8 bg-panel shadow-sm">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

                <button
                  type="button"
                  className={`absolute inset-0 z-20 cursor-[zoom-in] border-0 bg-transparent p-0 lg:hidden ${FOCUS_RING}`}
                  aria-label={`Open large preview: ${p.name}`}
                  onClick={() => setLightboxIndex(i)}
                />
                <button
                  type="button"
                  className={`absolute left-0 right-0 top-0 z-20 hidden h-[58%] cursor-[zoom-in] border-0 bg-transparent p-0 lg:block ${FOCUS_RING}`}
                  aria-label={`Open large preview: ${p.name}`}
                  onClick={() => setLightboxIndex(i)}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex min-w-0 flex-col justify-end bg-gradient-to-t from-ink/95 via-ink/40 to-transparent p-5 sm:p-6 lg:top-[58%]">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-canvas/85">{p.tag}</p>
                  {p.cardLabel ? (
                    <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-canvas/70">
                      {p.cardLabel}
                    </p>
                  ) : null}
                  <p className="mt-2 text-balance break-words font-display text-xl text-canvas sm:text-2xl">{p.name}</p>
                  <Link
                    href={`/${location.id}/projects/${p.slug}`}
                    className={`pointer-events-auto mt-3 inline-flex w-fit text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong transition hover:text-accent-soft ${FOCUS_RING}`}
                  >
                    Case study →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={lightboxSrcs}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        altForIndex={(idx) => projects[idx]?.alt ?? `Case study ${idx + 1}`}
      />
    </section>
  );
}
