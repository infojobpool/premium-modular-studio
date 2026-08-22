"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EditorialSectionHeader } from "@/components/EditorialSectionHeader";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { MATERIALS_LIBRARY } from "@/lib/materials-library";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function MaterialsLibraryStrip() {
  const { location } = useStudioLocation();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`border-y border-ink/10 bg-panel/30 py-14 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-labelledby="materials-library-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal key={location.id}>
          <EditorialSectionHeader
            number="02"
            eyebrow={`Materials · ${location.label}`}
            title="Finishes you can touch before you commit"
            description="Stone, timber, glass, and lighting samples are reviewed in-studio — so procurement matches what you approved in drawings."
            id="materials-library-heading"
            align="between"
            trailing={
              <Link
                href={`/${location.id}/visit`}
                className={`text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline ${FOCUS_RING}`}
              >
                Book a sample review →
              </Link>
            }
          />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {MATERIALS_LIBRARY.map((sample, i) => (
            <motion.li
              key={sample.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.05 }}
            >
              <div className="group overflow-hidden rounded-2xl border border-ink/10 bg-canvas shadow-sm transition hover:border-accent/35 hover:shadow-md">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                  <Image
                    src={sample.image}
                    alt={sample.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 16vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-canvas/75">
                      {sample.category}
                    </p>
                    <p className="mt-1 font-display text-base leading-tight text-canvas">
                      {sample.name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
