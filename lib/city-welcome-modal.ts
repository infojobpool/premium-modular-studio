import type { StudioLocationId } from "@/lib/locations";

/**
 * Hero imagery for first-visit city welcome modal — local campaign art or Vivid CDN pool.
 */
export const CITY_WELCOME_MODAL_IMAGES: Record<
  StudioLocationId,
  { src: string; alt: string }
> = {
  hyderabad: {
    /** Hyderabad skyline campaign still for welcome popup. */
    src: "/welcome-hyderabad-skyline.png",
    alt: "Hyderabad skyline at dusk with Charminar in foreground",
  },
  bhubaneswar: {
    /** Bhubaneswar campaign still for welcome popup. */
    src: "/welcome-bhubaneswar-living.png",
    alt: "Warm Bhubaneswar living room with handcrafted wood details and temple view",
  },
};

export type CityWelcomeStats = {
  value: string;
  label: string;
  icon: "users" | "building" | "star" | "blueprint";
};

export const CITY_WELCOME_STATS: CityWelcomeStats[] = [
  { value: "100+", label: "Happy Clients", icon: "users" },
  { value: "250+", label: "Projects Completed", icon: "building" },
  { value: "4.8/5", label: "Client Rating", icon: "star" },
  { value: "Personalized", label: "Design Approach", icon: "blueprint" },
];
