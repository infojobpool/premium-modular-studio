import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";

export function CitySubpageBackLink({ city }: { city: StudioLocationId }) {
  const label = STUDIO_LOCATIONS[city].label;
  return (
    <div className={`border-b border-ink/8 bg-canvas/50 pb-5 pt-[max(7.75rem,env(safe-area-inset-top)+6.5rem)] sm:pt-[max(8.25rem,env(safe-area-inset-top)+6.75rem)] lg:pt-28 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Link
          href={`/${city}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/16 bg-canvas/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_8px_28px_-18px_rgba(27,63,46,0.35)] ring-1 ring-white/50 backdrop-blur-sm transition hover:border-accent/45 hover:bg-panel/90 hover:shadow-[0_12px_36px_-16px_rgba(27,63,46,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <span className="text-base leading-none text-ink/80" aria-hidden>
            ←
          </span>
          <span className="tracking-tight">
            {label} studio home
          </span>
        </Link>
      </div>
    </div>
  );
}
