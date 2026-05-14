"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CONTENT_MAX, interiorImages, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividCopy, vividServices } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className={`mx-auto ${CONTENT_MAX} ${PAGE_GUTTER_X}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Services
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl md:text-6xl">
            Design services crafted for excellence
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-muted">{vividCopy.servicesIntro}</p>
        </Reveal>

      </div>

      <div className={`relative left-1/2 mt-16 grid w-screen max-w-[100vw] -translate-x-1/2 gap-6 sm:grid-cols-2 xl:grid-cols-3 ${PAGE_GUTTER_X}`}>
        {vividServices.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-panel/60 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] backdrop-blur-sm transition-shadow duration-500 hover:border-accent/35 hover:shadow-[0_30px_80px_-40px_rgba(27,63,46,0.22)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={interiorImages.services[i]!}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
            </div>
            <div className="relative p-8">
              <div className="pointer-events-none absolute -right-12 -top-24 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="font-display text-5xl text-accent/30 transition-colors duration-500 group-hover:text-accent/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl text-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
