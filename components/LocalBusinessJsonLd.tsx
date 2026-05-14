import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";
import { STUDIO_EMAIL, STUDIO_LOCATIONS } from "@/lib/locations";
import { getSiteUrl } from "@/lib/site-url";

const BUSINESS_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function LocalBusinessJsonLd({ city }: { city: StudioLocationId }) {
  const loc = STUDIO_LOCATIONS[city];
  const url = `${getSiteUrl()}/${city}`;
  const description = CITY_PAGE_COPY[city].heroLead;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `Vivid In2erio — ${loc.label}`,
    description,
    url,
    email: STUDIO_EMAIL,
    telephone: loc.phoneHref.replace(/^tel:/, ""),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.addressLines.join(", "),
      addressLocality: loc.label,
      addressRegion: loc.id === "bhubaneswar" ? "Odisha" : "Telangana",
      postalCode: loc.id === "bhubaneswar" ? "751006" : "500094",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...BUSINESS_DAYS],
        opens: loc.schemaHours.opens,
        closes: loc.schemaHours.closes,
      },
    ],
    areaServed: {
      "@type": "City",
      name: loc.label,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
