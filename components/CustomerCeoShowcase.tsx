"use client";

import Image from "next/image";
import { CEO_SHOWCASE_PORTRAITS } from "@/lib/reviews/ceo-showcase";
import { Reveal } from "./Reveal";

export function CustomerCeoShowcase() {
  return (
    <section className="mt-20 border-t border-ink/10 pt-16 sm:mt-28 sm:pt-20" aria-labelledby="ceo-showcase-heading">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Handover</p>
        <h2
          id="ceo-showcase-heading"
          className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Photos
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75">With the CEO</p>
      </Reveal>

      <ul className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10">
        {CEO_SHOWCASE_PORTRAITS.map((portrait) => (
          <li key={portrait.image}>
            <figure className="overflow-hidden rounded-2xl bg-panel/40 shadow-[0_18px_40px_-28px_rgba(27,63,46,0.45)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="font-display text-xl tracking-tight text-canvas sm:text-2xl">{portrait.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-canvas/80">{portrait.detail}</p>
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
