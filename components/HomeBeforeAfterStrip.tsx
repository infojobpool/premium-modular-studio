"use client";

import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import { getGalleryBeforeAfter } from "@/lib/gallery-before-after";
import { useStudioLocation } from "./LocationProvider";

/** Interactive before/after on the city home page — real Matthew exterior on Hyderabad. */
export function HomeBeforeAfterStrip() {
  const { location } = useStudioLocation();
  const beforeAfter = getGalleryBeforeAfter(location.id);

  return (
    <BeforeAfterCompare
      {...beforeAfter}
      className="border-t border-ink/8 bg-panel/20"
    />
  );
}
