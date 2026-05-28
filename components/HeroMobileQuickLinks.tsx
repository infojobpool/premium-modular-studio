"use client";

import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { HeroQuickLinksCard } from "./HeroQuickLinksCard";

/** “Transform your space” utility grid — shown below the hero on phones and tablets. */
export function HeroMobileQuickLinks() {
  return (
    <div className={`relative z-20 mt-2 pb-3 pt-1 sm:mt-3 lg:hidden ${PAGE_GUTTER_X}`}>
      <div className="mx-auto max-w-lg">
        <HeroQuickLinksCard />
      </div>
    </div>
  );
}
