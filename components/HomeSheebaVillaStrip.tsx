"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Reveal } from "@/components/Reveal";
import { useStudioLocation } from "@/components/LocationProvider";
import { sheebaVilla157HomeShowcase } from "@/lib/sheeba-villa-157-gallery";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";

const PROJECT_SLUG = "sheeba-villa-157-indukuri";

/** Room-by-room mosaic for Sheeba Villa 157 — Hyderabad home only. */
export function HomeSheebaVillaStrip() {
  const { location } = useStudioLocation();
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (location.id !== "hyderabad") return null;

  const hero = sheebaVilla157HomeShowcase[0]!;
  const tiles = sheebaVilla157HomeShowcase.slice(1);
  const lightboxSrcs = sheebaVilla157HomeShowcase.map((r) => r.image);

  return (
    <section
      className={`border-y border-ink/10 bg-panel/25 py-12 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-labelledby="sheeba-villa-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <EditorialSectionHeader
            eyebrow="Featured work"
            title="Sheeba Villa — room by room"
            id="sheeba-villa-heading"
            align="between"
            trailing={
              <Link
                href={`/${location.id}/projects/${PROJECT_SLUG}`}
                className={`text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline md:text-right ${FOCUS_RING}`}
              >
                Full case study →
              </Link>
            }
          />
        </Reveal>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Forty-seven photoreal stills across living, dining, suites, study, and service cores — signed off as one
          coordinated envelope before site mobilisation.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/10 bg-ink/5 shadow-sm lg:col-span-5 lg:row-span-2 lg:aspect-auto lg:min-h-[520px]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className={`group absolute inset-0 z-10 cursor-[zoom-in] border-0 bg-transparent p-0 ${FOCUS_RING}`}
              aria-label={`Open large preview: ${hero.label}`}
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={hero.image}
                alt={hero.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-soft">Featured volume</p>
                <p className="mt-2 font-display text-2xl text-canvas sm:text-3xl">{hero.label}</p>
              </div>
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:grid-cols-3 lg:gap-4">
            {tiles.map((room, i) => (
              <motion.button
                key={room.label}
                type="button"
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md ${FOCUS_RING}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.05 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-label={`Open large preview: ${room.label}`}
                onClick={() => setLightboxIndex(i + 1)}
              >
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <p className="absolute bottom-2.5 left-3 right-3 text-xs font-semibold leading-snug text-canvas sm:text-sm">
                  {room.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${location.id}/gallery?type=villa#work`}
            className={`inline-flex items-center rounded-full border border-ink/15 bg-canvas px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:border-accent/40 hover:text-accent-strong ${FOCUS_RING}`}
          >
            Browse villa gallery
          </Link>
          <Link
            href={`/${location.id}/projects/${PROJECT_SLUG}`}
            className={`text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 underline-offset-4 hover:text-ink hover:underline ${FOCUS_RING}`}
          >
            Planning notes & full render set →
          </Link>
        </div>
      </div>

      <ImageLightbox
        images={lightboxSrcs}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        altForIndex={(idx) => sheebaVilla157HomeShowcase[idx]?.alt ?? `Sheeba Villa 157 render ${idx + 1}`}
      />
    </section>
  );
}
