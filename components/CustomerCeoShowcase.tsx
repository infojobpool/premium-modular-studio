"use client";

import Image from "next/image";
import { CEO_SHOWCASE_PORTRAITS } from "@/lib/reviews/ceo-showcase";
import { Reveal } from "./Reveal";

export function CustomerCeoShowcase() {
  return (
    <section className="mt-16 border-t border-ink/10 pt-14 sm:mt-20 sm:pt-16" aria-labelledby="ceo-showcase-heading">
      <Reveal>
        <h2
          id="ceo-showcase-heading"
          className="font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Photos
        </h2>
        <p className="mt-2 text-sm text-ink/70 sm:text-base">With the CEO</p>
      </Reveal>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-8 sm:mt-10 sm:gap-x-6">
        {CEO_SHOWCASE_PORTRAITS.map((portrait) => (
          <li key={portrait.image} className="w-[9.5rem] sm:w-[11rem]">
            <figure>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-ink/5">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-display text-base leading-snug tracking-tight text-ink">{portrait.name}</p>
                <p className="mt-1 text-xs leading-snug text-ink/70">{portrait.detail}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
