"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FOCUS_RING } from "@/lib/ui-classes";

const navItems = [
  { segment: "about", label: "About" },
  { segment: "gallery", label: "Gallery" },
  { segment: "projects", label: "Stories" },
  { segment: "blog", label: "Blog" },
  { segment: "careers", label: "Careers" },
  { segment: "faq", label: "FAQ" },
] as const;

const navGroups = [
  { eyebrow: "Studio", segments: ["about"] as const },
  { eyebrow: "Work", segments: ["gallery", "projects"] as const },
  { eyebrow: "More", segments: ["blog", "careers", "faq"] as const },
];

type Props = {
  open: boolean;
  cityBase: string;
  cityLabel: string;
  onClose: () => void;
  isNavActive: (segment: string) => boolean;
};

export function MobileNavMenu({
  open,
  cityBase,
  cityLabel,
  onClose,
  isNavActive,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const panel = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="fixed inset-0 z-[45] bg-ink/50 backdrop-blur-[4px] lg:hidden"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-[max(9rem,env(safe-area-inset-top)+8rem)] z-[46] max-h-[min(72dvh,600px)] overflow-hidden rounded-[1.35rem] border border-white/50 bg-gradient-to-br from-canvas/98 via-canvas/95 to-panel/55 shadow-[0_32px_80px_-24px_rgba(27,63,46,0.45)] ring-1 ring-ink/10 sm:inset-x-4 lg:hidden"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/12 blur-3xl"
              aria-hidden
            />

            <div className="flex max-h-[min(78dvh,640px)] flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
              <div className="mb-5 border-b border-ink/8 pb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-strong">
                  Menu
                </p>
                <p className="mt-1 font-display text-2xl tracking-tight text-ink">
                  {cityLabel} studio
                </p>
                <p className="mt-1.5 text-sm text-muted">Premium interiors · design to delivery</p>
              </div>

              <div className="space-y-6">
                {navGroups.map((group, groupIndex) => (
                  <div key={group.eyebrow}>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45">
                      {group.eyebrow}
                    </p>
                    <ul className="space-y-0.5">
                      {group.segments.map((segment, i) => {
                        const item = navItems.find((n) => n.segment === segment)!;
                        const href = `${cityBase}/${segment}`;
                        const active = isNavActive(segment);
                        const delay = groupIndex * 0.05 + i * 0.04;

                        return (
                          <motion.li
                            key={segment}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.06 + delay, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Link
                              href={href}
                              onClick={onClose}
                              aria-current={active ? "page" : undefined}
                              className={`group flex items-center justify-between rounded-xl px-3 py-3 transition ${FOCUS_RING} ${
                                active
                                  ? "bg-ink/[0.06] text-ink"
                                  : "text-ink/80 hover:bg-ink/[0.04] hover:text-ink"
                              }`}
                            >
                              <span className="font-display text-[1.35rem] leading-none tracking-tight">
                                {item.label}
                              </span>
                              <span
                                className="text-sm text-ink/35 transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden
                              >
                                →
                              </span>
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 border-t border-ink/8 pt-5"
              >
                <Link
                  href={`${cityBase}/contact`}
                  onClick={onClose}
                  className={`inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas shadow-[0_16px_40px_-12px_rgba(27,63,46,0.55)] transition hover:bg-ink/92 ${FOCUS_RING}`}
                >
                  Book free consultation
                </Link>
                <Link
                  href={`${cityBase}/gallery`}
                  onClick={onClose}
                  className={`mt-3 inline-flex w-full items-center justify-center rounded-full border border-ink/18 bg-canvas/80 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-accent/35 hover:bg-accent/[0.08] ${FOCUS_RING}`}
                >
                  View signature work
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
}
