import Link from "next/link";
import { CONTENT_MAX, PAGE_GUTTER_X } from "@/lib/interior-images";
import { STUDIO_LOCATIONS, type StudioLocationId } from "@/lib/locations";

export function CitySubpageBackLink({ city }: { city: StudioLocationId }) {
  const label = STUDIO_LOCATIONS[city].label;
  return (
    <div className={`border-b border-ink/8 bg-canvas/50 pb-4 pt-24 sm:pt-28 ${PAGE_GUTTER_X}`}>
      <div className={`mx-auto ${CONTENT_MAX}`}>
        <Link
          href={`/${city}`}
          className="text-sm font-medium text-muted transition hover:text-ink"
        >
          ← {label} studio home
        </Link>
      </div>
    </div>
  );
}
