"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DESIGN_IDEA_ROOMS, galleryHref } from "@/lib/design-ideas";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function DesignIdeasStrip() {
  const { location } = useStudioLocation();

  return (
    <section className={`border-b border-ink/10 bg-canvas py-10 sm:py-12 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              Design ideas
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Inspiration by room
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Browse kitchens, wardrobes, villas, and full-home compositions from our studio portfolio.
            </p>
          </div>
          <Link
            href={`/${location.id}/gallery#work`}
            className={`text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
          >
            View all work →
          </Link>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {DESIGN_IDEA_ROOMS.map((room, i) => (
            <motion.li
              key={room.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={galleryHref(location.id, room.typology)}
                className={`group block overflow-hidden rounded-2xl border border-ink/10 bg-panel/30 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md ${FOCUS_RING}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    priority={i < 2}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <p className="absolute bottom-2.5 left-3 right-3 text-sm font-semibold leading-snug text-canvas">
                    {room.label}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
