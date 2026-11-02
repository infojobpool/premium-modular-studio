"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CEO_SHOWCASE_PORTRAITS } from "@/lib/reviews/ceo-showcase";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { Reveal } from "./Reveal";

export function CustomerCeoShowcase() {
  return (
    <section
      className={`mt-16 border-t border-ink/10 pt-14 sm:mt-20 sm:pt-16 ${PAGE_GUTTER_X}`}
      aria-labelledby="ceo-showcase-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-full border border-ink/15 sm:block">
              <Image
                src="/team/soubhagya-laxmi-nayakk.jpg"
                alt="Soubhagya Laxmi Nayakk, Founder & CEO"
                fill
                sizes="64px"
                className="object-cover object-[center_18%]"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
                With the founder
              </p>
              <h2
                id="ceo-showcase-heading"
                className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl"
              >
                Clients with the CEO
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
                Handover portraits — Soubhagya Laxmi Nayakk with families in their finished homes.
              </p>
            </div>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
          {CEO_SHOWCASE_PORTRAITS.map((portrait, i) => (
            <motion.li
              key={portrait.image}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure className="overflow-hidden rounded-[1.35rem] border border-ink/10 bg-panel/30 shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={portrait.image}
                    alt={portrait.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4">
                  <p className="font-display text-xl text-ink">{portrait.name}</p>
                  <p className="mt-1 text-sm font-medium text-ink/75">{portrait.detail}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-strong">
                    With the CEO
                  </p>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
