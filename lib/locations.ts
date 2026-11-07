export type StudioLocationId = "hyderabad" | "bhubaneswar";

export type StudioLocation = {
  id: StudioLocationId;
  label: string;
  regionLine: string;
  addressLines: string[];
  phoneDisplay: string;
  phoneHref: string;
  /** Google Maps search query for embeds and fallback links */
  mapQuery: string;
  /** Official share link for the Maps button when we have a pinned place */
  mapsUrl?: string;
  /** Shown next to map and in JSON-LD */
  hoursSummary: string;
  /** ISO-like times for schema.org `openingHoursSpecification` */
  schemaHours: { opens: string; closes: string };
};

/**
 * Hyderabad: matches public Waytowebs demo listing for Vivid In2erio.
 * Bhubaneswar: studio address at Puri Bypass, Mangaraj Point.
 */
export const STUDIO_LOCATIONS: Record<StudioLocationId, StudioLocation> = {
  hyderabad: {
    id: "hyderabad",
    label: "Hyderabad",
    regionLine: "Telangana · Secunderabad office",
    addressLines: [
      "Phase II, Valluvar Nagar, Laxmipuri, Sainikpuri",
      "Secunderabad, Telangana 500094",
    ],
    phoneDisplay: "+91 91218 21616",
    phoneHref: "tel:+919121821616",
    mapQuery: "VIVID IN2ERIO Sainikpuri Secunderabad",
    mapsUrl: "https://maps.app.goo.gl/cVpyzbvRyfwRnmQ3A",
    hoursSummary: "Mon–Sat · 10:00–19:00 IST (by appointment)",
    schemaHours: { opens: "10:00", closes: "19:00" },
  },
  bhubaneswar: {
    id: "bhubaneswar",
    label: "Bhubaneswar",
    regionLine: "Odisha · Puri Bypass, Mangaraj Point",
    addressLines: [
      "Plot No. 2165/8180, Puri Bypass, Mangaraj Point",
      "In front of Pallavi Mandap, Bhubaneswar, Odisha 751006",
    ],
    phoneDisplay: "+91 78540 01410",
    phoneHref: "tel:+917854001410",
    mapQuery:
      "Plot 2165/8180 Puri Bypass Mangaraj Point Pallavi Mandap Bhubaneswar 751006",
    hoursSummary: "Mon–Sat · 10:00–18:30 IST (by appointment)",
    schemaHours: { opens: "10:00", closes: "18:30" },
  },
};

/** Hyderabad studio WhatsApp (digits only, no +). Use `getStudioWhatsAppHref` for city pages. */
export const STUDIO_WHATSAPP_E164 = "919121821616";
export const STUDIO_WHATSAPP_HREF = `https://wa.me/${STUDIO_WHATSAPP_E164}`;

export function getStudioWhatsAppE164(city: StudioLocationId): string {
  return city === "bhubaneswar" ? "917854001410" : STUDIO_WHATSAPP_E164;
}

export function getStudioWhatsAppHref(city: StudioLocationId): string {
  return `https://wa.me/${getStudioWhatsAppE164(city)}`;
}

export function getStudioMapsHref(city: StudioLocationId): string {
  const loc = STUDIO_LOCATIONS[city];
  if (loc.mapsUrl) return loc.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.mapQuery} India`)}`;
}

export const DEFAULT_STUDIO_LOCATION: StudioLocationId = "hyderabad";

/** Visitor-facing place line — Hyderabad is an office, Bhubaneswar stays a studio. */
export function cityVenueLine(city: StudioLocationId): string {
  const { label } = STUDIO_LOCATIONS[city];
  return city === "hyderabad" ? `${label} Office` : `${label} studio`;
}

export function cityVenueNoun(city: StudioLocationId): "office" | "studio" {
  return city === "hyderabad" ? "office" : "studio";
}

/** Matches public listing on https://waytowebs.in/vivid/ */
export const STUDIO_EMAIL = "info@vividin2erio.com";
export const STUDIO_EMAIL_HREF = "mailto:info@vividin2erio.com";

/** Public social profiles — update hrefs when official accounts are confirmed. */
export const STUDIO_SOCIAL = {
  instagram: "https://www.instagram.com/vivid_in2erio/",
  facebook: "https://www.facebook.com/",
  linkedIn: "https://www.linkedin.com/",
} as const;
