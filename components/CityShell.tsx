"use client";

import type { StudioLocationId } from "@/lib/locations";
import { CityWelcomeModal } from "./CityWelcomeModal";
import { LocationProvider } from "./LocationProvider";

export function CityShell({
  city,
  children,
}: {
  city: StudioLocationId;
  children: React.ReactNode;
}) {
  return (
    <LocationProvider lockedCity={city}>
      <div
        data-studio-city={city}
        className={`studio-atmosphere studio-atmosphere--${city} min-h-dvh transition-[background] duration-700 ease-out`}
      >
        <CityWelcomeModal city={city} />
        {children}
      </div>
    </LocationProvider>
  );
}
