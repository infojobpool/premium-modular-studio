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
      className="relative overflow-x-clip border-b border-ink/8 bg-gradient-to-b from-canvas to-panel/25 py-24 sm:py-28"
    >
      <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Reveal key={location.id} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-12">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong sm:text-xs">
              Signature work · {location.label}
            </p>
            <h2 className="mt-3 text-balance font-display text-[clamp(2rem,4.5vw+0.5rem,3.5rem)] font-semibold leading-[1.06] tracking-tight text-ink">
              {city.galleryHeading}
            </h2>
            <p className="mt-4 inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-xl border border-ink/14 bg-panel/50 px-3.5 py-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink/72 sm:text-[11px] sm:tracking-[0.16em]">
              <span className="text-accent-strong" aria-hidden>
                ●
              </span>
              Tap the top of a card to zoom · arrows or swipe between covers
            </p>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted sm:text-[0.98rem] lg:text-right">
            {withBrandHighlight(city.galleryIntro)}
          </p>
        </Reveal>
      </div>

      {/* Full-viewport width grid so imagery scales on ultrawide (parent max-w-7xl no longer caps tiles). */}
      <div
        className={`relative left-1/2 mt-16 grid w-screen max-w-[100vw] -translate-x-1/2 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-5 ${PAGE_GUTTER_X}`}
      >
          {projects.map((p, i) => (
            <motion.div
              key={`${location.id}-${p.slug}`}
              style={{ x: i === 1 ? x2 : x1 }}
              className="min-w-0 max-w-full"
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
                  className="absolute inset-x-0 bottom-0 top-[58%] z-30 flex min-w-0 flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-6 text-left no-underline sm:p-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-canvas/85">
                    {p.tag}
                  </p>
                  <p className="mt-2 text-balance break-words font-display text-2xl text-canvas">{p.name}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                    Case study →
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
      </div>

      <div className={`mx-auto mt-14 text-center ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Link
          href={`/${location.id}/projects`}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-canvas/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          View all project stories
          <span aria-hidden>→</span>
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
