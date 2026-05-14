"use client";

import { motion } from "framer-motion";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividCopy, vividImages } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function About() {
  const { location } = useStudioLocation();
  const city = CITY_PAGE_COPY[location.id];

  return (
    <section id="about" className={`border-t border-ink/8 bg-panel/30 py-24 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal key={location.id} className="order-1 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Luxury interior & architecture · {location.label}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {city.aboutHeading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{city.aboutLead}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{city.aboutSecond}</p>
            <p className="mt-6 text-base leading-relaxed text-muted/90">{vividCopy.servicesIntro}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-ink/10 bg-canvas/60 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Individuality</p>
                <p className="mt-1 text-sm text-muted">Designed around your lifestyle and identity.</p>
              </div>
              <div className="rounded-xl border border-ink/10 bg-canvas/60 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Purpose</p>
                <p className="mt-1 text-sm text-muted">Every element has meaning and functionality.</p>
              </div>
              <div className="rounded-xl border border-ink/10 bg-canvas/60 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Refined execution
                </p>
                <p className="mt-1 text-sm text-muted">Flawless finishing with premium materials.</p>
              </div>
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 shadow-lg lg:order-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Fill layout: native img avoids preflight breaking absolute cover. */}
            <img
              src={vividImages.about}
              alt="Vivid In2erio interior visualization"
              sizes="(max-width: 1024px) 100vw, 50vw"
              decoding="async"
              className="absolute inset-0 block size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
