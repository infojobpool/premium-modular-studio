"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStudioWhatsAppHref } from "@/lib/locations";
import { FOCUS_RING } from "@/lib/ui-classes";
import { useStudioLocation } from "./LocationProvider";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const CITY_HOME = /^\/(hyderabad|bhubaneswar)$/;
const CITY_ROUTE = /^\/(hyderabad|bhubaneswar)(\/|$)/;

/**
 * Fixed WhatsApp shortcut on city routes. Icon-only on narrow screens to avoid footer overlap.
 */
export function WhatsAppFloatButton() {
  const { location } = useStudioLocation();
  const pathname = usePathname();
  const isCityHome = CITY_HOME.test(pathname);
  const isCityRoute = CITY_ROUTE.test(pathname);
  const { scrollY } = useScroll();
  const [stickyBarUp, setStickyBarUp] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;
    setNearBottom(y + viewH >= docH - 180);
    setStickyBarUp(isCityHome && y > 360);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight;
    const viewH = window.innerHeight;
    setNearBottom(y + viewH >= docH - 180);
    setStickyBarUp(isCityHome && y > 360);
  }, [isCityHome, pathname]);

  const href = `${getStudioWhatsAppHref(location.id)}?text=${encodeURIComponent(
    `Hello — I'd like to speak with the ${location.label} studio on WhatsApp.`,
  )}`;

  if (!isCityRoute) return null;

  const position = isCityHome
    ? stickyBarUp
      ? "bottom-[calc(env(safe-area-inset-bottom)+6.75rem)]"
      : "bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]"
    : isCityRoute
      ? "bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]"
      : "bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact on WhatsApp — ${location.label} studio`}
      className={`fixed z-[42] flex max-w-[calc(100vw-1.5rem)] flex-row items-center gap-2 transition hover:scale-[1.02] active:scale-[0.99] ${position} right-[max(0.75rem,env(safe-area-inset-right))] ${
        nearBottom ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      } ${FOCUS_RING}`}
    >
      <span className="hidden min-w-0 whitespace-nowrap rounded-full border border-ink/12 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] sm:inline-flex sm:px-4 sm:text-sm sm:tracking-[0.14em]">
        Contact now
      </span>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55),0_4px_14px_-4px_rgba(0,0,0,0.35)] ring-2 ring-white/90 sm:h-14 sm:w-14">
        <WhatsAppGlyph className="h-[1.55rem] w-[1.55rem] sm:h-[1.85rem] sm:w-[1.85rem]" />
      </span>
    </a>
  );
}
