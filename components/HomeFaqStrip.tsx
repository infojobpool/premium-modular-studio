"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { withBrandHighlight } from "./BrandInline";
import { Reveal } from "./Reveal";
import { useStudioLocation } from "./LocationProvider";

const PREVIEW_COUNT = 4;

export function HomeFaqStrip() {
  const { location } = useStudioLocation();
  const faqs = CITY_PAGE_COPY[location.id].faqs.slice(0, PREVIEW_COUNT);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className={`border-t border-ink/10 bg-canvas py-12 sm:py-14 ${PAGE_GUTTER_X}`} aria-labelledby="home-faq-heading">
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-strong">
              FAQ
            </p>
            <h2 id="home-faq-heading" className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Before you visit
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Straight answers on coverage, timelines, and how we work — specific to this studio.
            </p>
          </div>
          <Link
            href={`/${location.id}/faq`}
            className="text-xs font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:underline"
          >
            All questions →
          </Link>
        </Reveal>

        <ul className="mt-8 space-y-2.5">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-btn-${index}`;
            return (
              <li
                key={item.question}
                className="overflow-hidden rounded-xl border border-ink/10 bg-panel/40 shadow-sm"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                >
                  <span className="font-display text-base text-ink sm:text-lg">{item.question}</span>
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
                      <p className="px-4 py-3.5 text-sm leading-relaxed text-muted sm:px-5 sm:py-4">
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
