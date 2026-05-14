import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";

export function FaqJsonLd({ city }: { city: StudioLocationId }) {
  const faqs = CITY_PAGE_COPY[city].faqs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
