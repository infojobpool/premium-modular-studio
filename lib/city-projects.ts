import { CITY_PAGE_COPY } from "@/lib/city-page-copy";
import type { StudioLocationId } from "@/lib/locations";

/** Long-form case study copy keyed by `galleryProjects[].slug` (unique across cities). */
export const PROJECT_STORY: Record<string, string[]> = {
  "delhi-kitchen-design": [
    "A Delhi-region kitchen brief asked for clear work triangles, integrated appliances, and finishes that stay legible under mixed daylight and evening lighting.",
    "We locked layout, services, and joinery in detailed drawings and visualization so stone, hardware, and lighting were approved before fabrication—reducing site improvisation.",
    "Execution followed milestone-linked procurement and QC so handover matched the signed-off palette and tolerances.",
  ],
  "torri-tapovan-villa": [
    "Torri Tapovan Villa called for villa-scale living, dining, and bar volumes coordinated with private suites and service zones.",
    "Photoreal renders locked joinery, lighting layers, and material palettes—from glass wardrobe banks to U-shaped kitchens—before procurement.",
    "The Tapovan brief balanced entertaining spaces with calm bedrooms, window seats, and study niches signed off as one finish schedule.",
  ],
  "joseph-kitchen-design": [
    "This kitchen needed a strong identity without sacrificing storage depth or service access behind tall units.",
    "Canopy lines, appliance banks, and open shelving were balanced in 3D studies until the rhythm felt calm from both the dining and circulation sides.",
    "The same documentation fed modular vendors and site teams so alignment and level stayed within agreed bands through fit-out.",
  ],
  "sheeba-villa-157-indukuri": [
    "Villa 157 at Indukuri called for villa-scale planning with controlled sightlines from entry through living and toward private wings.",
    "We used advanced visualization to align clients on materials, ceiling language, and joinery before mobilisation—keeping revisions upstream of procurement.",
    "Smart integrations and lighting layers were composed so technology stays discreet within the interior architecture.",
  ],
  "villa-173-west-indukuri-lakeshore": [
    "West Indukuri lakeshore positioning meant prioritising views, glare control, and durable transitions where glazing meets interior stone and timber.",
    "Shell-to-styling decisions were sequenced so façade-adjacent rooms, kitchens, and bedrooms share one coherent finish schedule.",
    "Site execution tracked against frozen drawings so lakeside humidity and maintenance expectations were designed in, not patched later.",
  ],
  "villa-193-east-indukuri-lakeshore": [
    "The east lakeshore villa set emphasized generous living volume, layered daylight, and joinery that ages quietly beside natural materials.",
    "Photoreal renders and walkthroughs carried approvals for hardware, stone, and lighting before production budgets were released.",
    "Project management stayed tight through precision execution to a premium handover aligned with the studio’s twin-city standards.",
  ],
  "matthew-villa-makeover": [
    "Matthew’s home needed a full makeover rework—living, dining, kitchen, bedrooms, and circulation treated as one programme rather than isolated upgrades.",
    "We rebuilt the kitchen on an L-plan with powder-blue joinery, integrated appliances, and display cabinetry; the dining room and stairwell were opened to each other with marble floors and sculptural lighting.",
    "Bedrooms received built-in wardrobes, window seats, and study niches; the stairwell gained a timber arch, glass guards, and cascading globe pendants. Exterior façade lighting completed the transformation.",
  ],
  "coastal-apartment-bbsr": [
    "A compact coastal apartment needed maximum storage and resilient finishes without sacrificing openness toward the bay.",
    "We pushed services into a tight core, freed the perimeter for seating and views, and specified sealants and stone transitions for monsoon splash zones.",
    "Modular systems were detailed for service access so maintenance does not mean dismantling entire panels.",
  ],
  "modular-kitchen-odisha": [
    "The kitchen is the social heart of this home—open to dining but visually anchored with a deep canopy and integrated appliances.",
    "Workflow was tested against real cookware and cleaning habits; tall units hide bulk storage while base drawers keep daily rhythm efficient.",
    "Hyderabad-fabricated carcasses met local stone and backsplash trades on a shared milestone chart so the handover date stayed predictable.",
  ],
  "wardrobe-study-patia": [
    "A combined wardrobe and study niche had to switch modes from focused work to guest readiness in a single glance.",
    "We used a sliding screen system and integrated desk lighting with blackout layering for the sleep zone behind.",
    "Interior tones pick up Odisha daylight—warm greys and muted greens—so the room feels steady through long monsoon weeks.",
  ],
};

export function getProjectStory(slug: string): string[] {
  return PROJECT_STORY[slug] ?? [
    "Case study copy for this project is being expanded. Reach the studio for drawings, schedules, and references.",
  ];
}

/** Slugs defined for each city gallery / case study. */
export function allStaticProjectParams(): { city: StudioLocationId; slug: string }[] {
  const cities: StudioLocationId[] = ["hyderabad", "bhubaneswar"];
  const out: { city: StudioLocationId; slug: string }[] = [];
  for (const city of cities) {
    for (const p of CITY_PAGE_COPY[city].galleryProjects) {
      out.push({ city, slug: p.slug });
    }
  }
  return out;
}
