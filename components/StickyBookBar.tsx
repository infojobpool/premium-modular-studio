"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStudioWhatsAppHref } from "@/lib/locations";
import { FOCUS_RING_DARK } from "@/lib/ui-classes";
import { useStudioLocation } from "./LocationProvider";

const CITY_PATH = /^\/(hyderabad|bhubaneswar)$/;

export function StickyBookBar() {
  const pathname = usePathname();
  const { location } = useStudioLocation();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  const onCityHome = CITY_PATH.test(pathname);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(onCityHome && y > 360);
  });

  useEffect(() => {
    if (!onCityHome || typeof window === "undefined") return;
    setVisible(window.scrollY > 360);
  }, [onCityHome]);

  if (!onCityHome) return null;

  const contactHref = `/${location.id}/contact`;
  const wa = `${getStudioWhatsAppHref(location.id)}?text=${encodeURIComponent(
    `Hello — I'd like to book a studio visit (${location.label}).`,
  )}`;

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-canvas/15 bg-ink/95 px-4 py-3 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-5 sm:py-3.5">
        <p className="min-w-0 text-xs font-medium leading-snug text-canvas/90 sm:text-sm">
          <span className="font-semibold text-canvas">Book free consultation</span>
          <span className="hidden text-canvas/70 sm:inline"> · {location.label}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className={`rounded-full border border-canvas/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas transition hover:border-canvas/45 sm:px-4 sm:text-[11px] ${FOCUS_RING_DARK}`}
          >
            WhatsApp
          </a>
          <Link
            href={contactHref}
            className={`rounded-full bg-accent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-sm transition hover:bg-accent-soft sm:px-5 sm:text-[11px] ${FOCUS_RING_DARK}`}
          >
            Enquire
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
