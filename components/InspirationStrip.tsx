"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CONTENT_MAX, PAGE_GUTTER_X, interiorImages } from "@/lib/interior-images";
import { trackEvent } from "@/lib/analytics";
import { useStudioLocation } from "./LocationProvider";

/** City sub-routes — each card deep-links into the studio site. */
type InspirationPath =
  | "about"
  | "gallery"
  | "projects"
  | "services"
  | "process"
  | "faq"
  | "visit"
  | "contact";

const cards: Array<{
  title: string;
  cta: string;
  views: string;
  imageIndex: number;
  path: InspirationPath;
  hash?: string;
}> = [
  {
    title: "Fresh colour combinations",
    cta: "Get inspiration",
    views: "2.2K",
    imageIndex: 0,
    path: "gallery",
    hash: "work",
  },
  { title: "Explore shade stories", cta: "Explore shade", views: "1.7K", imageIndex: 1, path: "gallery" },
  {
    title: "Lighting catalog ideas",
    cta: "Explore catalogue",
    views: "1.9K",
    imageIndex: 2,
    path: "services",
  },
  { title: "Warm neutral living", cta: "Explore shade", views: "2.1K", imageIndex: 3, path: "projects" },
  { title: "Accent wall moods", cta: "Explore shade", views: "2.1K", imageIndex: 4, path: "about" },
  { title: "Open sky palette", cta: "Explore shade", views: "1.7K", imageIndex: 5, path: "process" },
  { title: "Desert oasis tones", cta: "Explore catalogue", views: "2.0K", imageIndex: 6, path: "visit" },
];

export function InspirationStrip() {
  const { location } = useStudioLocation();
  const railRef = useRef<HTMLUListElement>(null);

  function scrollRail(dir: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * 320, behavior: "smooth" });
    trackEvent("inspiration_scrolled", { city: location.id, direction: dir === 1 ? "next" : "prev" });
  }

  return (
    <section className="bg-ink py-8 sm:py-9 text-canvas">
      <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl sm:text-4xl">Inspiring ideas for you</h2>
          <Link
            href={`/${location.id}/projects`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:text-accent-soft"
          >
            View all stories →
          </Link>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous inspirations"
          onClick={() => scrollRail(-1)}
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-canvas/25 bg-ink/85 text-lg text-canvas shadow-sm backdrop-blur-sm md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next inspirations"
          onClick={() => scrollRail(1)}
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-canvas/25 bg-ink/85 text-lg text-canvas shadow-sm backdrop-blur-sm md:flex"
        >
          ›
        </button>

        <ul
          ref={railRef}
          className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 ${PAGE_GUTTER_X}`}
        >
          {cards.map((card) => {
            const href = `/${location.id}/${card.path}${card.hash ? `#${card.hash}` : ""}`;
            return (
              <li
                key={card.title}
                className="min-w-[220px] snap-start sm:min-w-[240px]"
              >
                <Link
                  href={href}
                  onClick={() =>
                    trackEvent("inspiration_card_clicked", {
                      city: location.id,
                      card: card.title,
                      path: card.path,
                    })
                  }
                  className="group relative block h-full overflow-hidden rounded-2xl border border-canvas/15 bg-ink/40"
                >
                  <div className="relative h-72 w-full">
                    <Image
                      src={interiorImages.gallery[card.imageIndex] ?? interiorImages.gallery[0]!}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 85vw, 240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/35" />
                  <p className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold tabular-nums backdrop-blur-sm">
                    <span className="text-accent-soft" aria-hidden>
                      ✦
                    </span>
                    {card.views}
                  </p>
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="text-sm font-medium leading-snug text-canvas">{card.title}</p>
                    <span className="mt-3 inline-block rounded-full bg-canvas/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink ring-1 ring-canvas/30">
                      {card.cta}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
