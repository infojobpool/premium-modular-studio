"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_STUDIO_LOCATION,
  type StudioLocation,
  type StudioLocationId,
  STUDIO_LOCATIONS,
} from "@/lib/locations";

const STORAGE_KEY = "vivid-in2erio-studio";

type LocationContextValue = {
  locationId: StudioLocationId;
  location: StudioLocation;
  /** When set, studio is tied to this route (`/hyderabad` | `/bhubaneswar`). */
  lockedCity: StudioLocationId | null;
  setLocationId: (id: StudioLocationId) => void;
  hydrated: boolean;
};

const LocationContext = createContext<LocationContextValue | null>(null);

function readQueryLocation(): StudioLocationId | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("location") ?? params.get("studio");
  if (raw === "hyderabad" || raw === "bhubaneswar") return raw;
  return null;
}

function readStoredLocation(): StudioLocationId | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "hyderabad" || raw === "bhubaneswar") return raw;
  return null;
}

export function LocationProvider({
  children,
  lockedCity = null,
}: {
  children: React.ReactNode;
  /** Lock context to one city; changing studio navigates to `/${id}`. */
  lockedCity?: StudioLocationId | null;
}) {
  const router = useRouter();
  const [locationId, setLocationIdState] = useState<StudioLocationId>(
    lockedCity ?? DEFAULT_STUDIO_LOCATION,
  );
  const [hydrated, setHydrated] = useState(!!lockedCity);

  useEffect(() => {
    if (lockedCity) {
      setLocationIdState(lockedCity);
      setHydrated(true);
      return;
    }
    const fromQuery = readQueryLocation();
    const fromStore = readStoredLocation();
    setLocationIdState(fromQuery ?? fromStore ?? DEFAULT_STUDIO_LOCATION);
    setHydrated(true);
  }, [lockedCity]);

  const setLocationId = useCallback(
    (id: StudioLocationId) => {
      if (lockedCity) {
        if (id !== lockedCity) {
          router.push(`/${id}`);
        }
        return;
      }
      setLocationIdState(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* ignore */
      }
      const url = new URL(window.location.href);
      url.searchParams.set("location", id);
      window.history.replaceState(
        {},
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    },
    [lockedCity, router],
  );

  const value = useMemo<LocationContextValue>(
    () => ({
      locationId,
      location: STUDIO_LOCATIONS[locationId],
      lockedCity: lockedCity ?? null,
      setLocationId,
      hydrated,
    }),
    [hydrated, locationId, lockedCity, setLocationId],
  );

  return (
    <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
  );
}

export function useStudioLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useStudioLocation must be used within LocationProvider");
  }
  return ctx;
}
