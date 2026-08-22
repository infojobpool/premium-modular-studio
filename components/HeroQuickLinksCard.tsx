"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import type { StudioLocationId } from "@/lib/locations";
import { useStudioLocation } from "./LocationProvider";

type QuickItem = {
  label: string;
  href: string;
  Icon: () => ReactElement;
};

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-strong" fill="none" aria-hidden>
      <path
        d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function IconCube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-strong" fill="none" aria-hidden>
      <path
        d="M12 2l9 5v10l-9 5-9-5V7l9-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 22V12M3 7l9 5 9-5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-strong" fill="none" aria-hidden>
      <path
        d="M21 12a8 8 0 01-8 8H7l-4 3v-3.17A8 8 0 013 12a8 8 0 118 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFaq() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-strong" fill="none" aria-hidden>
      <path
        d="M12 18h.01M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2.5-2.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function linksForCity(city: StudioLocationId): QuickItem[] {
  const base = `/${city}`;
  return [
    { label: "Gallery", href: `${base}/gallery`, Icon: IconGrid },
    { label: "Case studies", href: `${base}/projects`, Icon: IconCube },
    { label: "Book consultation", href: `${base}/contact`, Icon: IconChat },
    { label: "FAQ", href: `${base}/faq`, Icon: IconFaq },
  ];
}

/** Asian Paints–style “Transform your space” utility card (desktop + mobile). */
export function HeroQuickLinksCard() {
  const { location } = useStudioLocation();
  const links = linksForCity(location.id);

  return (
    <aside className="pointer-events-auto w-full max-w-[20rem] rounded-2xl border border-white/55 bg-canvas/72 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-white/40 backdrop-blur-xl sm:rounded-2xl sm:p-5 lg:mb-1">
      <p className="font-display text-xl tracking-tight text-ink sm:text-[1.35rem]">Transform your space</p>
      <p className="mt-1.5 max-w-full text-pretty text-xs leading-snug text-muted break-words sm:text-[13px]">
        Jump to gallery, case studies, or book a free consultation at the {location.label} studio.
      </p>
      <nav
        aria-label="Quick links"
        className="mt-4 grid grid-cols-2 gap-2 sm:gap-2.5"
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-w-0 flex-col gap-1.5 overflow-hidden rounded-xl border border-ink/8 bg-canvas/45 px-2.5 py-2.5 text-left backdrop-blur-sm transition hover:border-accent/40 hover:bg-canvas/70 sm:py-2.5"
          >
            <item.Icon />
            <span className="min-w-0 break-words text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-ink sm:text-[11px] sm:tracking-[0.1em]">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
