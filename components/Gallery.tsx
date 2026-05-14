"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X, resolveGalleryTileSrc } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function Gallery() {
  const { location } = useStudioLocation();
  const city = CITY_PAGE_COPY[location.id];
  const projects = city.galleryProjects.map((p, i) => ({
    ...p,
    src: resolveGalleryTileSrc(p, i),
  }));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxSrcs = useMemo(() => projects.map((p) => p.src), [projects]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [location.id]);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 32]);

  return (
    <section
      ref={ref}
      id="work"
      className="relative overflow-hidden py-28"
    >
      <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Reveal key={location.id} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
              Signature work · {location.label}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
              {city.galleryHeading}
            </h2>
          </div>
          <p className="max-w-md text-muted md:text-right">{withBrandHighlight(city.galleryIntro)}</p>
        </Reveal>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45 md:text-right">
          Tap the top of a card to open the viewer · use arrows or swipe to browse project covers
        </p>
      </div>

      {/* Full-viewport width grid so imagery scales on ultrawide (parent max-w-7xl no longer caps tiles). */}
      <div
        className={`relative left-1/2 mt-16 grid w-screen max-w-[100vw] -translate-x-1/2 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-5 ${PAGE_GUTTER_X}`}
      >
          {projects.map((p, i) => (
            <motion.div
              key={`${location.id}-${p.slug}`}
              style={{ x: i === 1 ? x2 : x1 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-ink/8 bg-panel shadow-sm">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <button
                  type="button"
                  className="absolute left-0 right-0 top-0 z-20 h-[58%] cursor-[zoom-in] border-0 bg-transparent p-0"
                  aria-label={`Open large preview: ${p.name}`}
                  onClick={() => setLightboxIndex(i)}
                />
                <Link
                  href={`/${location.id}/projects/${p.slug}`}
                  className="absolute inset-x-0 bottom-0 top-[58%] z-30 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-6 text-left no-underline sm:p-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-canvas/85">
                    {p.tag}
                  </p>
                  <p className="mt-2 font-display text-2xl text-canvas">{p.name}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                    Case study →
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
      </div>

      <div className={`mx-auto mt-12 text-center ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Link
          href={`/${location.id}/projects`}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline"
        >
          View all project stories
        </Link>
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
