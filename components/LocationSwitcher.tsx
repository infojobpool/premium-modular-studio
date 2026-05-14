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
}: {
  compact?: boolean;
  layoutGroup?: string;
  wide?: boolean;
}) {
  const { locationId, setLocationId, lockedCity } = useStudioLocation();

  const rootClass = compact
    ? wide
      ? "flex w-full min-w-0 rounded-full border border-ink/10 bg-canvas/60 p-0.5 shadow-inner backdrop-blur-sm sm:inline-flex sm:w-auto"
      : "inline-flex min-w-0 rounded-full border border-ink/10 bg-canvas/60 p-0.5 shadow-inner backdrop-blur-sm"
    : "inline-flex rounded-full border border-ink/10 bg-canvas/70 p-1 shadow-inner backdrop-blur-md";

  return (
    <div role="navigation" aria-label="Studio location" className={rootClass}>
      {order.map((id) => {
        const active = locationId === id;
        const label = STUDIO_LOCATIONS[id].label;
        const linkClass = wide
          ? `relative flex min-h-[40px] min-w-0 flex-1 items-center justify-center rounded-full px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:min-h-0 sm:px-3 sm:text-[11px] sm:tracking-[0.16em] ${
              active ? "text-canvas" : "text-muted hover:text-ink"
            }`
          : `relative rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors sm:px-4 sm:text-xs ${
              active ? "text-canvas" : "text-muted hover:text-ink"
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
                className="absolute inset-0 rounded-full bg-ink shadow-sm"
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
