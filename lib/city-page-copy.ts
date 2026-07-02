import type { StudioLocationId } from "@/lib/locations";
import { vividGalleryCoverImageByProjectSlug, vividGalleryPageIntro } from "@/lib/vivid-reference";

export type CityFaq = { question: string; answer: string };

/** Founder / partner card on home + about (Hyderabad vs Bhubaneswar leadership). */
export type CityLeadershipHighlight = { title: string; body: string };

export type CityLeadershipSpotlight = {
  /** Shown before " · {city}" e.g. Founder spotlight, Partner spotlight */
  eyebrow: string;
  /** Accessible name for the section landmark */
  sectionAriaLabel: string;
  name: string;
  /** When set, shown as a highlighted badge (e.g. Co-founder). */
  designation?: string;
  roleLine: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
  highlights: CityLeadershipHighlight[];
  /** Compact variant CTA under the card */
  compactCtaLabel: string;
};

/** Trust / press row: optional `logoUrl` for partner or award marks (remotePatterns must allow the host). */
export type CityTrustHighlight = {
  title: string;
  subtitle?: string;
  logoUrl?: string;
  logoAlt?: string;
};

export type CityGalleryProject = {
  tag: string;
  name: string;
  alt: string;
  /** URL segment for `/[city]/projects/[slug]` */
  slug: string;
  excerpt: string;
  /** Remote tile/hero URL when it must match the reference site (overrides pool index). */
  coverImage?: string;
  /** Pick a tile from `interiorImages.gallery` when it should not match list order. */
  imageIndex?: number;
  /** Livspace-style meta line on cards, e.g. "Kitchen · Delhi NCR · Modular". */
  cardLabel?: string;
};

export type CityPageCopy = {
  heroTitle: string;
  heroLead: string;
  heroStudio: string;
  aboutHeading: string;
  aboutLead: string;
  aboutSecond: string;
  galleryIntro: string;
  galleryHeading: string;
  galleryProjects: CityGalleryProject[];
  /** Structured highlights; optional logos render beside copy. */
  trustHighlights: CityTrustHighlight[];
  faqs: CityFaq[];
  leadershipSpotlight: CityLeadershipSpotlight;
};

export const CITY_PAGE_COPY: Record<StudioLocationId, CityPageCopy> = {
  hyderabad: {
    heroTitle: "Premium & luxury interiors in Hyderabad",
    heroLead:
      "At Vivid In2wrio, we design more than spaces — we curate refined lifestyles. By blending timeless aesthetics, intelligent planning, and flawless execution, we deliver premium interiors and architectural solutions tailored for discerning homeowners and forward-thinking businesses.",
    heroStudio:
      "Vivid In2wrio is a Hyderabad-based luxury interior and architectural design studio, known for creating bespoke residential and commercial spaces. Every project we craft is a balance of elegance, functionality, and enduring value — designed to elevate the way you live and work.",
    aboutHeading: "Luxury interior & architectural studio in Hyderabad",
    aboutLead:
      "Walk the studio in Phase II, Valluvar Nagar (Sainikpuri): review materials, joinery mock-ups, and lighting studies in person, then follow one accountable team from detailed design through precision execution to luxury handover.",
    aboutSecond:
      "The same design-to-delivery standard extends to our Bhubaneswar atelier when your project needs a second India studio on the same documentation and quality bar.",
    galleryHeading: "Our projects",
    galleryIntro: vividGalleryPageIntro,
    galleryProjects: [
      {
        tag: "Delhi",
        name: "Delhi Kitchen Design",
        alt: "Kitchen interior render — Delhi project",
        slug: "delhi-kitchen-design",
        coverImage: vividGalleryCoverImageByProjectSlug["delhi-kitchen-design"],
        excerpt:
          "Full-kitchen composition with appliance integration, lighting layers, and documentation aligned to premium execution standards.",
        cardLabel: "Kitchen · Delhi NCR · Modular",
      },
      {
        tag: "Joseph",
        name: "Joseph Kitchen Design",
        alt: "Kitchen design perspective",
        slug: "joseph-kitchen-design",
        coverImage: vividGalleryCoverImageByProjectSlug["joseph-kitchen-design"],
        excerpt:
          "Custom kitchen layout and joinery rhythm—signed off in visualization before procurement and site fit-out.",
        cardLabel: "Kitchen · Custom residence · Contemporary",
      },
      {
        tag: "Indukuri · Hyderabad",
        name: "Sheeba Villa 157 Indukuri Renders",
        alt: "Villa interior — Indukuri",
        slug: "sheeba-villa-157-indukuri",
        coverImage: vividGalleryCoverImageByProjectSlug["sheeba-villa-157-indukuri"],
        excerpt:
          "Villa-scale interiors with clarity from planning through advanced visualization—Indukuri corridor portfolio work.",
        cardLabel: "Villa · Indukuri · Full interior",
      },
      {
        tag: "Indukuri Lakeshore",
        name: "Villa 173 West Indukuri Lakeshore Renders",
        alt: "Lakeshore villa render — west elevation",
        slug: "villa-173-west-indukuri-lakeshore",
        coverImage: vividGalleryCoverImageByProjectSlug["villa-173-west-indukuri-lakeshore"],
        excerpt:
          "West lakeshore villa studies: spatial flow, façade-adjacent light, and joinery coordinated for lakeside living.",
        cardLabel: "Villa · Lakeshore · West elevation",
      },
      {
        tag: "Indukuri Lakeshore",
        name: "Villa 193 East Indukuri Lakeshore Renders",
        alt: "Lakeshore villa render — east",
        slug: "villa-193-east-indukuri-lakeshore",
        coverImage: vividGalleryCoverImageByProjectSlug["villa-193-east-indukuri-lakeshore"],
        excerpt:
          "East lakeshore composition—premium standards from detailed planning through smart integrations and handover.",
        cardLabel: "Villa · Lakeshore · East wing",
      },
    ],
    leadershipSpotlight: {
      eyebrow: "Founder spotlight",
      sectionAriaLabel: "Founder spotlight",
      name: "Soubhagya Laxmi Nayakk",
      designation: "Founder & CEO",
      roleLine: "Vivid In2wrio",
      bio: "Recognised for design leadership that balances aesthetics, functionality, and execution discipline across luxury residential projects. Her studio direction has shaped a premium, client-first interior practice across Telangana and Odisha.",
      imageSrc: "/founder-soubhagya-laxmi-nayak.png",
      imageAlt: "Soubhagya Laxmi Nayakk, Founder and CEO — Vivid In2wrio Hyderabad",
      highlights: [
        {
          title: "India Design Awards 2023:",
          body: "Innovative Articulation of Aesthetics & Functionality for Luxury Residential Projects.",
        },
        {
          title: "Architecture & Interior Design Excellence Awards 2023:",
          body: "Most Creative & Trusted Interior Design Firm of the Year (Telangana) under Residential Projects.",
        },
        {
          title: "Special Category:",
          body: "Top 25 Trendsetter Interior Designers India (2022).",
        },
      ],
      compactCtaLabel: "Read founder story",
    },
    trustHighlights: [
      {
        title: "Telangana-scale delivery",
        subtitle: "Villas, premium apartments & workplaces across the twin cities.",
      },
      {
        title: "In-studio joinery & lighting",
        subtitle: "Mock-ups and sign-off studies before materials hit your site.",
        logoUrl:
          "https://waytowebs.in/vivid/wp-content/uploads/2026/04/41-768x720.jpg",
        logoAlt: "Joinery and interior craft — Vivid portfolio reference",
      },
      {
        title: "Single accountable team",
        subtitle: "From frozen drawings through execution to handover.",
      },
    ],
    faqs: [
      {
        question: "Do you work outside the immediate Hyderabad area?",
        answer:
          "Yes—our site teams regularly cover the wider twin cities and select outstation projects when scope and timelines align. The Secunderabad studio stays the hub for approvals, samples, and fabrication sign-off.",
      },
      {
        question: "What should I bring to the first consultation?",
        answer:
          "Floor plans (even builder PDFs), inspiration images, a rough budget band, and your move-in or festival dates if any. If the site exists, photos or a short video walk-through help us respond faster.",
      },
      {
        question: "Is parking available at the Sainikpuri studio?",
        answer:
          "Visitor parking is limited; we share precise gate instructions and a WhatsApp pin when your appointment is confirmed so your driver can stage nearby without blocking lanes.",
      },
      {
        question: "How long does a modular kitchen or full apartment typically take?",
        answer:
          "Concept and frozen drawings usually span a few weeks depending on revisions; execution timelines depend on joinery complexity, imports, and site readiness. You receive milestone dates in writing before mobilisation.",
      },
    ],
  },
  bhubaneswar: {
    heroTitle: "Premium & luxury interiors in Bhubaneswar",
    heroLead:
      "At Vivid In2wrio, we design more than spaces — we curate refined lifestyles. By blending timeless aesthetics, intelligent planning, and flawless execution, we deliver premium interiors and architectural solutions tailored for discerning homeowners and forward-thinking businesses.",
    heroStudio:
      "The Bhubaneswar studio brings the same bespoke residential and commercial rigor to Odisha—elegant, functional spaces with enduring value, coordinated with Hyderabad when specialist fabrication or documentation calls for it.",
    aboutHeading: "Luxury interior & architectural studio · Bhubaneswar",
    aboutLead:
      "Walk the studio by appointment at Plot No. 2165/8180, Puri Bypass, Mangaraj Point, in front of Pallavi Mandap, Bhubaneswar 751006—plus climate-smart materials, modular kitchens and wardrobes, and English-led documentation across Patia, Chandrasekharpur, and growing township corridors.",
    aboutSecond:
      "Transparent milestones from consultation through precision execution and luxury handover—scaled for Bhubaneswar’s pace, humidity, and light.",
    galleryHeading: "Projects & signature work",
    galleryIntro:
      "Design-to-delivery interiors tuned for coastal heat, monsoon cycles, and how Bhubaneswar families live—shown through recent studio projects.",
    galleryProjects: [
      {
        tag: "Bhubaneswar",
        name: "Coastal apartment living",
        alt: "Living room interior render",
        slug: "coastal-apartment-bbsr",
        excerpt:
          "Compact coastal plan with resilient transitions, service core efficiency, and views preserved toward the bay.",
        imageIndex: 5,
        cardLabel: "Apartment · Coastal · 2–3 BHK",
      },
      {
        tag: "Odisha",
        name: "Modular kitchen & dining",
        alt: "Kitchen perspective",
        slug: "modular-kitchen-odisha",
        excerpt:
          "Open kitchen anchored with a deep canopy, appliance integration, and milestone-linked Hyderabad fabrication.",
        imageIndex: 6,
        cardLabel: "Kitchen · Open plan · Odisha",
      },
      {
        tag: "Patia corridor",
        name: "Wardrobe & study",
        alt: "Wardrobe interior vignette",
        slug: "wardrobe-study-patia",
        excerpt:
          "Wardrobe and study in one disciplined volume—sliding screens, desk lighting, and tones tuned to monsoon daylight.",
        imageIndex: 7,
        cardLabel: "Wardrobe · Patia · Study nook",
      },
    ],
    leadershipSpotlight: {
      eyebrow: "Co-founder spotlight",
      sectionAriaLabel: "Co-founder spotlight",
      name: "Gargi Panda",
      designation: "Co-founder",
      roleLine: "Vivid In2wrio",
      bio: "Leads client experience and on-ground delivery for the Bhubaneswar studio—aligning local site teams, documentation, and handover with the same premium standards as our Telangana atelier, tuned for Odisha’s light, humidity, and pace.",
      imageSrc: "/partner-gargi-panda-bhubaneswar.png",
      imageAlt: "Gargi Panda, Co-founder — Vivid In2wrio Bhubaneswar",
      highlights: [
        {
          title: "Odisha studio leadership:",
          body: "English-led briefs, contracts, and site notes with clear milestones from consultation through execution.",
        },
        {
          title: "Climate-aware delivery:",
          body: "Finishes and details specified for heat, monsoon swings, and coastal-adjacent rooms—not left to last-minute site guesswork.",
        },
        {
          title: "Hyderabad fabrication bridge:",
          body: "When specialist CNC, veneers, or large-format stone route through Sainikpuri, she keeps one accountable thread for Bhubaneswar clients.",
        },
      ],
      compactCtaLabel: "Read co-founder story",
    },
    trustHighlights: [
      {
        title: "Climate-first specifications",
        subtitle: "Finishes and details tuned for heat, humidity & monsoon cycles.",
      },
      {
        title: "English-only process",
        subtitle: "Briefs, contracts & site notes in one consistent language.",
        logoUrl:
          "https://waytowebs.in/vivid/wp-content/uploads/2026/04/Villa-193-East-Indukuri-Lakeshore-Rnders-revised2-1024x576.jpg",
        logoAlt: "Residential interior perspective — Vivid portfolio reference",
      },
      {
        title: "Hyderabad fabrication bridge",
        subtitle: "Local site leadership with specialist CNC when scope demands it.",
      },
    ],
    faqs: [
      {
        question: "How do you handle Odisha’s coastal heat and monsoon indoors?",
        answer:
          "We specify finishes, sealants, and ventilation paths that tolerate humidity swings—especially in kitchens, wardrobes, and façade-adjacent rooms. Details are locked during technical drawings, not left to site guesswork.",
      },
      {
        question: "Will my project be executed only in Bhubaneswar?",
        answer:
          "Design and site leadership stay local. For certain specialist CNC, veneers, or large-format stone, we may coordinate with our Hyderabad atelier—always with one accountable project lead on your site.",
      },
      {
        question: "Do you visit sites before quoting?",
        answer:
          "For renovations and live sites, yes—a measured survey and services audit is standard. For early-stage apartments we can start from builder drawings, then validate on site before joinery goes to production.",
      },
      {
        question: "What languages are used in meetings and contracts?",
        answer:
          "This studio operates in English for briefs, contracts, and site instructions—ideal for families who prefer a single consistent language across drawings, WhatsApp updates, and sign-offs.",
      },
    ],
  },
};

export function isStudioCity(slug: string): slug is StudioLocationId {
  return slug === "hyderabad" || slug === "bhubaneswar";
}
