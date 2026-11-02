"use client";

import Image from "next/image";
import { CEO_SHOWCASE_PORTRAITS } from "@/lib/reviews/ceo-showcase";
import { Reveal } from "./Reveal";

export function CustomerCeoShowcase() {
  return (
    <section className="mt-20 border-t border-ink/10 pt-14 sm:mt-24 sm:pt-16" aria-labelledby="ceo-showcase-heading">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">Handover</p>
        <h2
          id="ceo-showcase-heading"
          className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          With the CEO
        </h2>
      </Reveal>

      <ul className="mt-8 grid gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
        {CEO_SHOWCASE_PORTRAITS.map((portrait) => (
          <li key={portrait.image}>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink/5">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-xl tracking-tight text-ink">{portrait.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{portrait.detail}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
