"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { vividImages } from "@/lib/vivid-reference";
import { VividLogo } from "./VividLogo";

const STORAGE_KEY = "vivid-studio-split-modal";

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function dismissModal() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function StudioSplitModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    dismissModal();
    setOpen(false);
  }, []);

  const onChoose = useCallback(() => {
    dismissModal();
    setOpen(false);
  }, []);

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
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={dismiss}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.55)] ring-1 ring-canvas/15 sm:rounded-[2rem]"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-ink shadow-lg ring-1 ring-ink/10 transition hover:scale-105 hover:bg-canvas/95 sm:right-4 sm:top-4"
              aria-label="Close"
            >
              <span className="text-xl font-light leading-none">×</span>
            </button>

            <h2 id={titleId} className="sr-only">
              Choose Hyderabad or Bhubaneswar studio
            </h2>

            <div className="grid md:grid-cols-2">
              {/* Left — Hyderabad (image panel) */}
              <div className="relative min-h-[300px] md:min-h-[460px]">
                <Image
                  src={vividImages.hero}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
                <div className="absolute inset-0 flex flex-col items-stretch justify-between gap-6 p-8 pb-9 pt-14 sm:p-10 sm:pb-10 sm:pt-16">
                  <VividLogo variant="light" className="max-w-[min(100%,280px)] shrink-0 self-start" />
                  <div className="min-w-0 shrink">
                    <p className="font-display text-3xl leading-[1.1] tracking-tight text-canvas sm:text-4xl">
                      Premium & luxury interiors · Hyderabad
                    </p>
                    <p className="mt-2 max-w-sm text-base text-canvas/85 sm:text-lg">
                      Bespoke residential and commercial spaces—design-to-delivery from our
                      Sainikpuri–Secunderabad studio across Telangana.
                    </p>
                    <Link
                      href="/hyderabad"
                      onClick={onChoose}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_12px_40px_-8px_rgba(217,162,41,0.55)] transition hover:bg-accent-soft"
                    >
                      Visit Hyderabad
                      <ArrowIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right — Bhubaneswar (solid + circular image) */}
              <div className="relative flex min-h-[300px] flex-col bg-[#4a3229] md:min-h-[460px]">
                <div className="absolute left-8 top-14 shrink-0 sm:left-10 sm:top-16">
                  <VividLogo variant="light" className="max-w-[min(100%,280px)] opacity-95" />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 pt-24 sm:px-10 sm:pb-12 sm:pt-28">
                  <div className="relative aspect-square w-[min(100%,280px)] sm:w-[min(100%,320px)]">
                    <div className="absolute inset-0 rounded-full bg-canvas/10 ring-2 ring-canvas/20" />
                    <div className="absolute inset-2 overflow-hidden rounded-full ring-1 ring-black/20">
                      <Image
                        src={vividImages.gallery[1]!}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1c18]/90 via-transparent to-[#2a1c18]/30" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <p className="font-display text-2xl leading-tight tracking-tight text-canvas sm:text-3xl">
                        Premium & luxury interiors · Bhubaneswar
                      </p>
                      <p className="mt-2 max-w-[14rem] text-sm leading-snug text-canvas/85">
                        Luxury homes & workspaces with climate-smart execution and English-led
                        documentation—Odisha studio.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/bhubaneswar"
                    onClick={onChoose}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_12px_40px_-8px_rgba(217,162,41,0.55)] transition hover:bg-accent-soft"
                  >
                    Visit Bhubaneswar
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
