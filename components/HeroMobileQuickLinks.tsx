"use client";

import { PAGE_GUTTER_X } from "@/lib/interior-images";
import { HeroQuickLinksCard } from "./HeroQuickLinksCard";

/** “Transform your space” utility grid — shown below the hero on phones and tablets. */
export function HeroMobileQuickLinks() {
  return (
    <div className={`relative z-20 -mt-6 pb-2 lg:hidden ${PAGE_GUTTER_X}`}>
      <div className="mx-auto max-w-lg">
        <HeroQuickLinksCard />
      </div>
    </div>
  );
}
