"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { CityFaq } from "@/lib/city-page-copy";
import { FOCUS_RING } from "@/lib/ui-classes";
import { withBrandHighlight } from "./BrandInline";

type Props = {
  faqs: readonly CityFaq[];
};

export function FaqAccordion({ faqs }: Props) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="mt-8 space-y-3 sm:mt-10">
      {faqs.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-btn-${index}`;
        return (
          <li
            key={item.question}
            className={`overflow-hidden rounded-2xl border shadow-[0_12px_32px_-22px_rgba(27,63,46,0.5)] transition ${
              open
                ? "border-ink/35 bg-[color-mix(in_oklab,white_78%,var(--color-canvas))]"
                : "border-ink/22 bg-[color-mix(in_oklab,white_62%,var(--color-canvas))]"
            }`}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 ${FOCUS_RING}`}
            >
              <span className="font-body text-base font-semibold leading-snug text-ink sm:text-[1.125rem]">
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-semibold leading-none ${
                  open ? "bg-ink text-canvas" : "bg-ink/12 text-ink"
                }`}
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
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-t border-ink/15"
                >
                  <p className="px-5 py-4 text-base font-medium leading-[1.75] text-ink sm:px-6 sm:py-5">
                    {withBrandHighlight(item.answer)}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
