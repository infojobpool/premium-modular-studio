"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

export function CityFAQ() {
  const { location } = useStudioLocation();
  const faqs = CITY_PAGE_COPY[location.id].faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className={`scroll-mt-32 py-24 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-strong">
            Frequently asked · {location.label}
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Before you visit
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Straight answers on coverage, timelines, and how we work—specific to this studio.
          </p>
        </Reveal>

        <ul className="mt-14 space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-btn-${index}`;
            return (
              <li
                key={item.question}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-panel/40 shadow-sm"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-display text-lg text-ink sm:text-xl">{item.question}</span>
                  <span
                    className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong"
                    aria-hidden
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-ink/8"
                    >
                      <p className="px-5 py-4 text-base leading-relaxed text-muted sm:px-6 sm:py-5">
                        {withBrandHighlight(item.answer)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
