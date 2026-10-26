"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { FOCUS_RING } from "@/lib/ui-classes";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const PRACTICES = [
  {
    slug: "interiors",
    title: "Interiors",
    lead: "Kitchens, living, and full-home interiors signed off in 3D before site.",
    image: "/gallery/portfolio/living-room-tv-feature-wall.png",
    alt: "Living interior with wood feature wall and integrated lighting",
    href: (city: string) => `/${city}/gallery`,
    cta: "View interiors",
  },
  {
    slug: "architecture",
    title: "Architecture",
    lead: "2D drawings, 3D plans, and walkthroughs so the house and interiors lock together.",
    image: "/gallery/architecture/walkthrough-villa.jpg",
    alt: "Villa architecture and pool court",
    href: (city: string) => `/${city}/architecture`,
    cta: "View architecture",
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    lead: "Villa gardens and apartment terraces planned with the façade — not added later.",
    image: "/gallery/landscaping/villa-pool-lawn.jpg",
    alt: "Villa lawn, planting, and pool court",
    href: (city: string) => `/${city}/landscaping`,
    cta: "View landscaping",
  },
] as const;

export function HomePracticesStrip() {
  const { location } = useStudioLocation();
  const venue = location.id === "hyderabad" ? "office" : "studio";

  return (
    <section
      className={`border-b border-ink/10 bg-canvas py-12 sm:py-16 ${PAGE_GUTTER_X}`}
      aria-labelledby="home-practices-heading"
    >
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
            What we do
          </p>
          <h2
            id="home-practices-heading"
            className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl"
          >
            Interiors, architecture, and landscaping
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Three practices from the {location.label} {venue} — one roadmap from plan to planting.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {PRACTICES.map((practice, i) => (
            <motion.li
              key={practice.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={practice.href(location.id)}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-panel/30 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md ${FOCUS_RING}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                  <Image
                    src={practice.image}
                    alt={practice.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    priority={i === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.22em] text-canvas">
                    {practice.title}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-ink/80">{practice.lead}</p>
                  <span className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-strong">
                    {practice.cta} →
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
