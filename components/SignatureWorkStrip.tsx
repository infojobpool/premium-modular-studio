"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X, resolveGalleryTileSrc } from "@/lib/interior-images";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const PREVIEW_COUNT = 3;

export function SignatureWorkStrip() {
  const { location } = useStudioLocation();
  const city = CITY_PAGE_COPY[location.id];
  const projects = city.galleryProjects.slice(0, PREVIEW_COUNT).map((p, i) => ({
    ...p,
    src: resolveGalleryTileSrc(p, i),
  }));

  return (
    <section className={`pt-8 pb-14 sm:pt-10 sm:pb-16 ${PAGE_GUTTER_X}`} aria-labelledby="signature-work-heading">
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal key={location.id} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Signature work · {location.label}
            </p>
            <h2 id="signature-work-heading" className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl md:text-5xl">
              Recent case studies
            </h2>
          </div>
          <Link
            href={`/${location.id}/gallery#work`}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline md:text-right"
          >
            Open full gallery →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={`${location.id}-sig-${p.slug}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/${location.id}/projects/${p.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-ink/8 bg-panel shadow-sm"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-canvas/85">{p.tag}</p>
                  <p className="mt-2 font-display text-xl text-canvas sm:text-2xl">{p.name}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                    Case study →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
