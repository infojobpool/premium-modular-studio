"use client";

import { motion } from "framer-motion";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { vividCopy, vividProcessSteps } from "@/lib/vivid-reference";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section
      id="process"
      className={`relative overflow-hidden bg-ink py-28 text-canvas ${PAGE_GUTTER_X}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-soft/15 blur-[100px]" />
      </div>

      <div className={`relative mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
            Our process
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {vividCopy.processIntroTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-canvas/75">
            {vividCopy.processIntroBody}
          </p>
        </Reveal>

        <ol className="relative mt-20 space-y-14 border-l border-canvas/15 pl-8 sm:pl-12">
          {vividProcessSteps.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="absolute -left-[calc(2rem+1px)] top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border border-accent/60 bg-ink sm:-left-[calc(3rem+1px)]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
                {step.num}
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-2xl text-canvas/70 leading-relaxed">{step.copy}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
