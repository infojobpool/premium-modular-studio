"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X, interiorImages } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function PromoBanner() {
  const { location } = useStudioLocation();

  return (
    <section className={`py-8 sm:py-9 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ink">
            <Image
              src={interiorImages.hero}
              alt="Premium exterior and interior finish campaign"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/45" />

            <div className="relative z-10 grid gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
                  Signature finish package
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-canvas sm:text-5xl">
                  Premium protection + elegant interiors
                </h3>
                <p className="mt-4 max-w-2xl text-canvas/80">
                  Built for Hyderabad and Bhubaneswar weather cycles. Curated materials, waterproofing
                  strategy, and long-life finish schedules in one design-to-delivery roadmap.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-canvas/85">
                  <span className="rounded-full border border-canvas/30 px-3 py-1.5">12+ year systems</span>
                  <span className="rounded-full border border-canvas/30 px-3 py-1.5">Water + algae shield</span>
                  <span className="rounded-full border border-canvas/30 px-3 py-1.5">Site-specific specs</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={`/${location.id}/contact`}
                  className={`inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-accent-soft hover:shadow-md ${FOCUS_RING}`}
                >
                  Book product consult
                </Link>
                <Link
                  href={`/${location.id}/projects`}
                  className={`inline-flex items-center justify-center rounded-full border border-canvas/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-canvas transition hover:border-canvas/60 hover:bg-canvas/10 ${FOCUS_RING}`}
                >
                  View project details
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
