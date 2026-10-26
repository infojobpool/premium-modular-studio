"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DESIGN_IDEA_ROOMS, galleryHref } from "@/lib/design-ideas";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const TILE_CLASS: Record<string, string> = {
  Kitchen: "col-span-2 min-h-[220px] sm:min-h-[280px]",
  Dining: "col-span-2 min-h-[240px] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-0",
  Bedroom: "min-h-[200px] sm:min-h-[220px]",
  Living: "min-h-[200px] sm:min-h-[220px]",
};

export function DesignIdeasStrip() {
  const { location } = useStudioLocation();

  return (
    <section className={`border-b border-ink/10 bg-canvas py-10 sm:py-12 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              Interiors
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Kitchen, bedroom, living, dining
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/75">
              Finished rooms from our projects — tap through to the interiors gallery.
            </p>
          </div>
          <Link
            href={`/${location.id}/gallery#work`}
            className={`text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
          >
            View all work →
          </Link>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {DESIGN_IDEA_ROOMS.map((room, i) => (
            <motion.li
              key={room.label}
              className={TILE_CLASS[room.label] ?? "min-h-[200px]"}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={galleryHref(location.id, room.typology)}
                className={`group relative block h-full overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md ${FOCUS_RING}`}
              >
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  priority={i < 2}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                <p className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.22em] text-canvas">
                  {room.label}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
