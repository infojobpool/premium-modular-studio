"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  CITY_WELCOME_MODAL_IMAGES,
  CITY_WELCOME_STATS,
  type CityWelcomeStats,
} from "@/lib/city-welcome-modal";
import type { StudioLocationId } from "@/lib/locations";

const STORAGE_PREFIX = "vivid-city-welcome-dismissed";

function storageKey(city: StudioLocationId) {
  return `${STORAGE_PREFIX}:${city}`;
}

function BlueprintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 10h26v26H14V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 16H4v26h26v-4M8 22h8M8 28h8M8 34h8M20 22h6M20 28h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RibbonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 8l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 36c4-2 8-2 16 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArmchairIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 22c0-4 3.5-8 10-8s10 4 10 8v4c3 0 5 2.5 5 6v6H9v-6c0-3.5 2-6 5-6v-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 38h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StatIcon({ kind, className }: { kind: CityWelcomeStats["icon"]; className?: string }) {
  switch (kind) {
    case "blueprint":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 19V5M4 19h16M4 19l3-6 4 3 5-8 4 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20 8v6M23 11h-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "building":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 21V8l8-4 8 4v13M9 21v-4h6v4M9 13h1M12 13h1M15 13h1M9 17h1M12 17h1M15 17h1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "star":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3l2.3 5.3L20 9.3l-4.2 3.7 1.3 6L12 16.8 6.9 19l1.3-6L4 9.3l5.7-.9L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

const features = [
  { label: "Custom Designs", Icon: BlueprintIcon },
  { label: "Premium Quality", Icon: RibbonIcon },
  { label: "End-to-End Services", Icon: ArmchairIcon },
] as const;

export function CityWelcomeModal({ city }: { city: StudioLocationId }) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const image = CITY_WELCOME_MODAL_IMAGES[city];
  const cityLabel = city === "hyderabad" ? "Hyderabad" : "Bhubaneswar";
  const projectsHref = `/${city}/projects`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(storageKey(city))) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [city]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey(city), "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, [city]);

  const onCta = useCallback(() => {
    dismiss();
  }, [dismiss]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
            aria-label="Close welcome dialog"
            onClick={dismiss}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92dvh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-[0_40px_100px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:rounded-[1.75rem]"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-xl font-light leading-none text-white shadow-lg ring-1 ring-white/25 transition hover:bg-black/50 sm:right-4 sm:top-4"
              aria-label="Close"
            >
              ×
            </button>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:grid md:min-h-[min(52vh,520px)] md:grid-cols-2 md:overflow-hidden">
              {/* Copy + CTA — own column so the photo is never buried under a full-frame dark wash */}
              <div className="order-2 flex min-h-[280px] flex-col justify-between gap-8 bg-gradient-to-br from-[#12100e] via-[#1c1814] to-[#141210] p-7 pb-8 pt-10 sm:p-10 md:order-1 md:pt-14">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e4c46a] sm:text-xs">
                    Crafting spaces, elevating lives
                  </p>
                  <h2 id={titleId} className="mt-4 font-display text-3xl leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.65rem]">
                    Interior Design in{" "}
                    <span className="text-[#e4c46a]">{cityLabel}</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                    {city === "hyderabad"
                      ? "Luxury interiors. Timeless elegance. Designed around you."
                      : "Blending tradition with modern living. Thoughtfully designed for you."}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-10">
                    {features.map(({ label, Icon }) => (
                      <li key={label} className="flex items-center gap-2.5 text-white/95">
                        <Icon className="h-9 w-9 shrink-0 text-[#e4c46a]" />
                        <span className="text-xs font-medium leading-tight sm:text-sm">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <Link
                    href={projectsHref}
                    onClick={onCta}
                    className="inline-flex w-fit items-center gap-2 rounded-md bg-[#c9a227] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1a1a] shadow-[0_12px_40px_-8px_rgba(201,162,39,0.55)] transition hover:bg-[#d4ae2e]"
                  >
                    Explore {cityLabel} projects
                    <span aria-hidden>→</span>
                  </Link>

                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4c46a]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="11" r="2" fill="currentColor" />
                    </svg>
                    {cityLabel}
                  </p>
                </div>
              </div>

              {/* Photo — dedicated column; light edge blend only */}
              <div className="relative order-1 min-h-[220px] w-full md:order-2 md:min-h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20 md:bg-gradient-to-l md:from-black/45 md:via-transparent md:to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="relative z-10 border-t border-[#3d2a22]/30 bg-[#ebe3d4] px-4 py-4 sm:px-8">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {CITY_WELCOME_STATS.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left"
                  >
                    <StatIcon
                      kind={row.icon}
                      className="mb-1 h-6 w-6 text-[#6b4a3b] sm:mb-0 sm:shrink-0"
                    />
                    <div>
                      <p className="font-display text-lg font-semibold text-[#2c1f18] sm:text-xl">
                        {row.value}
                      </p>
                      <p className="text-[11px] font-medium leading-snug text-[#5c4339] sm:text-xs">
                        {row.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
