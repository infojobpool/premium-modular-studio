"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X, resolveGalleryTileSrc } from "@/lib/interior-images";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function Gallery() {
  const { location } = useStudioLocation();
  const city = CITY_PAGE_COPY[location.id];
  const projects = city.galleryProjects.map((p, i) => ({
    ...p,
    src: resolveGalleryTileSrc(p, i),
  }));
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Signature work · {location.label}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
              {city.galleryHeading}
            </h2>
          </div>
          <p className="max-w-md text-muted md:text-right">{city.galleryIntro}</p>
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-canvas/85">
                    {p.tag}
                  </p>
                  <p className="mt-2 font-display text-2xl text-canvas">{p.name}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                    Case study →
                  </p>
                </div>
              </Link>
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
    </section>
  );
}
