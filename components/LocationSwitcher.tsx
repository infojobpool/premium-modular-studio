"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_LOCATIONS } from "@/lib/locations";
import { useStudioLocation } from "./LocationProvider";

const order: StudioLocationId[] = ["hyderabad", "bhubaneswar"];

export function LocationSwitcher({
  compact = false,
  layoutGroup = "nav",
  /** Full-width row with equal tabs — use in narrow mobile toolbars. */
  wide = false,
  /** Cream track on light bars, glass track on forest bars. */
  tone = "light",
}: {
  compact?: boolean;
  layoutGroup?: string;
  wide?: boolean;
  tone?: "light" | "onInk";
}) {
  const { locationId, setLocationId, lockedCity } = useStudioLocation();
  const onInk = tone === "onInk";

  const rootClass = compact
    ? wide
      ? `flex w-full min-w-0 rounded-full p-0.5 shadow-inner sm:inline-flex sm:w-auto ${
          onInk ? "border border-white/18 bg-white/8" : "border border-ink/18 bg-panel"
        }`
      : `inline-flex min-w-0 rounded-full p-0.5 shadow-inner ${
          onInk ? "border border-white/18 bg-white/8" : "border border-ink/18 bg-panel"
        }`
    : `inline-flex rounded-full p-1 shadow-inner ${
        onInk ? "border border-white/18 bg-white/8" : "border border-ink/16 bg-panel"
      }`;

  return (
    <div role="navigation" aria-label="Studio location" className={rootClass}>
      {order.map((id) => {
        const active = locationId === id;
        const label = STUDIO_LOCATIONS[id].label;
        const linkClass = wide
          ? `relative flex min-h-[40px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full px-2 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors sm:min-h-0 sm:flex-none sm:px-2.5 sm:text-xs sm:tracking-[0.12em] ${
              active ? (onInk ? "text-ink" : "text-canvas") : onInk ? "text-canvas/75 hover:text-canvas" : "text-muted hover:text-ink"
            }`
          : `relative rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors sm:px-4 sm:text-xs ${
              active ? (onInk ? "text-ink" : "text-canvas") : onInk ? "text-canvas/75 hover:text-canvas" : "text-muted hover:text-ink"
            }${compact ? " sm:px-3" : ""}`;
        return (
          <Link
            key={id}
            href={`/${id}`}
            scroll={false}
            onClick={(e) => {
              if (!lockedCity) {
                e.preventDefault();
                setLocationId(id);
              }
            }}
            className={linkClass}
          >
            {active ? (
              <motion.span
                layoutId={`${layoutGroup}-loc-pill`}
                className={`absolute inset-0 rounded-full shadow-sm ${onInk ? "bg-canvas" : "bg-ink"}`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
