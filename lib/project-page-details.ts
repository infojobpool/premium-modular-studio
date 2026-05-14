/**
 * Rich case-study layouts keyed by `galleryProjects[].slug`.
 * Copy is tailored to each project name / typology (kitchen vs villa vs apartment).
 */
export type ProjectPageDetail = {
  typology: string;
  /** Short line under the title (place, programme, or client context). */
  contextLine: string;
  /** Intro shown after the city excerpt. */
  lead: string;
  /** Deliverables / inclusions for this typology. */
  scope: string[];
  /** Optional facts for the summary strip. */
  facts?: { label: string; value: string }[];
  /** Extra pool indices into `interiorImages.gallery` for an on-page strip (no duplicates with hero). */
  galleryStripIndices: number[];
  /** Named sections after the main story paragraphs. */
  sections: { heading: string; paragraphs: string[] }[];
};

export const PROJECT_PAGE_DETAILS: Record<string, ProjectPageDetail> = {
  "delhi-kitchen-design": {
    typology: "Kitchen · Delhi NCR",
    contextLine: "Delhi NCR · full kitchen replacement with services upgrade",
    lead:
      "Named for the programme rather than a single layout template, this Delhi kitchen design prioritises circulation around a central island, concealed services, and finishes that read true under both north-Indian winter light and warm evening lamps.",
    scope: [
      "Measured survey, demolition sequence, and MEP coordination for hob, chimney, and water points",
      "Modular carcass + bespoke shutter language with integrated appliance banks",
      "Layered task, ambient, and in-cabinet lighting on approved circuits",
      "Quartz / stone selection with splash-back and edge detail drawings",
      "Site snagging list tied to handover sign-off",
    ],
    facts: [
      { label: "Programme", value: "Kitchen + utility adjacency" },
      { label: "Documentation", value: "Shop + services drawings" },
      { label: "Sign-off", value: "3D + sample board" },
    ],
    galleryStripIndices: [1, 2, 3, 4],
    sections: [
      {
        heading: "Delhi-specific considerations",
        paragraphs: [
          "Dust control during civil touch-ups, vendor lead times from the NCR fabrication belt, and clear cold-storage for imported hardware were written into the milestone chart from week one.",
          "Clients saw appliance cut-outs and services in plan before any stone was ordered, so the counter template arrived site-ready.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A calm, high-function kitchen that reads as part of the home’s architecture—not a standalone catalog insert—with documentation the studio can extend to dining or wardrobe phases later.",
        ],
      },
    ],
  },
  "joseph-kitchen-design": {
    typology: "Kitchen · Custom residence",
    contextLine: "Joseph residence · open kitchen to dining axis",
    lead:
      "The Joseph kitchen brief asked for a strong focal wall without losing storage depth: a rhythm of tall units, open shelving, and a defined canopy over the cooking run so the room stays legible from both the dining table and the entry path.",
    scope: [
      "Workflow study against real cookware, cleaning habits, and peak guest load",
      "Integrated chimney, hob, oven tower, and under-counter services",
      "Open and closed storage mix with adjustable internals where depth varies",
      "Finish palette locked through in-studio samples before production release",
      "Alignment checks with flooring and ceiling vendors for one continuous datum",
    ],
    facts: [
      { label: "Focus", value: "Social kitchen + storage" },
      { label: "Method", value: "3D-led approvals" },
      { label: "Execution", value: "Modular + site stone" },
    ],
    galleryStripIndices: [0, 2, 3, 5],
    sections: [
      {
        heading: "Design moves",
        paragraphs: [
          "A darker timber language wraps the tall bank; the island and perimeter bases pick up a lighter tone so the volume breathes. LED profiles sit behind valances so worktops are lit without visible glare in mirrored backsplashes.",
        ],
      },
      {
        heading: "Client journey",
        paragraphs: [
          "Joseph’s team reviewed two layout options in plan and perspective, chose a single direction, then froze joinery details before appliances were on PO—protecting lead times and avoiding late swaps on site.",
        ],
      },
    ],
  },
  "sheeba-villa-157-indukuri": {
    typology: "Villa · Indukuri corridor",
    contextLine: "Sheeba Villa 157 · Hyderabad-region villa renders",
    lead:
      "Sheeba Villa 157 is a full-villa interior study along the Indukuri corridor: entry sequence, double-height living, private wings, and service cores treated as one coordinated envelope rather than room-by-room packages.",
    scope: [
      "Spatial planning, ceiling and lighting intent, and joinery strategy across levels",
      "Façade-adjacent glazing treatments and glare control for west- and south-facing bays",
      "Primary suites, secondary bedrooms, and family lounges on a shared finish schedule",
      "Kitchens, back kitchens, and staff areas where the brief requires them",
      "Smart-home and AC grille coordination at documentation stage",
    ],
    facts: [
      { label: "Scale", value: "Full villa interior" },
      { label: "Deliverable", value: "Renders + drawings" },
      { label: "Region", value: "Indukuri · Hyderabad" },
    ],
    galleryStripIndices: [3, 4, 5, 6, 7],
    sections: [
      {
        heading: "Villa narrative",
        paragraphs: [
          "Sightlines from the foyer through living were composed so art, stone, and timber read in sequence; bedrooms peel off a clear circulation spine so privacy does not fight openness in the social core.",
        ],
      },
      {
        heading: "Visualization",
        paragraphs: [
          "Photoreal stills carried sign-off on stone veining, joinery profiles, and ceiling steps before site mobilisation—reducing improvisation during execution.",
        ],
      },
    ],
  },
  "villa-173-west-indukuri-lakeshore": {
    typology: "Villa · Lakeshore (west)",
    contextLine: "Villa 173 · West Indukuri lakeshore orientation",
    lead:
      "West-facing lakeshore glass demanded a disciplined approach to solar gain, privacy from the water side, and durable stone-to-timber transitions where monsoon splash and humidity are real variables.",
    scope: [
      "Glazing schedule with shading intent and drapery pockets",
      "Living, dining, and lakeside decks tied to one interior datum",
      "Kitchen and wet areas specified for easy maintenance beside the water",
      "Joinery designed for expansion joints where long runs meet structural movement",
      "Exterior-adjacent rooms with sealant and sill details in working drawings",
    ],
    facts: [
      { label: "Orientation", value: "West · lakeshore" },
      { label: "Risk", value: "Glare + humidity" },
      { label: "Output", value: "Shell-to-styling" },
    ],
    galleryStripIndices: [2, 4, 6, 8, 9],
    sections: [
      {
        heading: "Lakeshore west",
        paragraphs: [
          "Late-afternoon sun is managed with a combination of sheer and blackout layers, deep ceiling coffers, and canopies that keep the view while cutting direct heat on seating.",
        ],
      },
      {
        heading: "Material continuity",
        paragraphs: [
          "Exterior stone tones step inside at the threshold so the eye reads one landscape from deck to interior—without matching slabs in a way that feels literal or flat.",
        ],
      },
    ],
  },
  "villa-193-east-indukuri-lakeshore": {
    typology: "Villa · Lakeshore (east)",
    contextLine: "Villa 193 · East Indukuri lakeshore composition",
    lead:
      "The east lakeshore set emphasises morning light, generous living volume, and joinery that ages quietly beside natural materials. This portfolio entry mirrors the studio’s premium design-to-delivery promise on a villa scale.",
    scope: [
      "Living and dining choreography with integrated AV and lighting scenes",
      "Primary suite with wardrobe, vanity, and sleep zone as one calm volume",
      "Secondary suites and study niches on a coordinated palette",
      "Landscape-facing decks with exterior-rated transitions",
      "Precision execution oversight through handover",
    ],
    facts: [
      { label: "Orientation", value: "East · lakeshore" },
      { label: "Tone", value: "Warm minimal" },
      { label: "Studio", value: "Hyderabad-led" },
    ],
    galleryStripIndices: [0, 1, 5, 7, 10],
    sections: [
      {
        heading: "East light strategy",
        paragraphs: [
          "Morning sun fills social spaces without washing out screens; deeper overhangs and planting studies were part of the same conversation as interior ceiling heights.",
        ],
      },
      {
        heading: "Handover standard",
        paragraphs: [
          "Snagging, fixture programming, and joinery adjustment lists are completed before keys—so the first week in the home is about living, not chasing vendors.",
        ],
      },
    ],
  },
  "coastal-apartment-bbsr": {
    typology: "Apartment · Bhubaneswar coast",
    contextLine: "Bhubaneswar · compact coastal plan",
    lead:
      "This coastal apartment needed resilient transitions, a tight services core, and storage that does not eat the view corridor toward the bay—typical of Patia–Chandrasekharpur stock plans we re-planned for real humidity data.",
    scope: [
      "Core-first planning to free the perimeter for seating and glazing",
      "Sealant and sill details at monsoon splash zones",
      "Modular storage with service access panels documented on drawings",
      "Finishes specified for heat and humidity swings",
    ],
    facts: [
      { label: "Climate", value: "Coastal + monsoon" },
      { label: "City", value: "Bhubaneswar" },
      { label: "Type", value: "Apartment" },
    ],
    galleryStripIndices: [6, 8, 9, 10],
    sections: [
      {
        heading: "Odisha execution",
        paragraphs: [
          "Local site leadership pairs with Hyderabad fabrication when CNC or veneer complexity warrants it—one PM owns the thread end to end.",
        ],
      },
    ],
  },
  "modular-kitchen-odisha": {
    typology: "Kitchen · Odisha",
    contextLine: "Bhubaneswar · open kitchen to dining",
    lead:
      "An open Odisha kitchen anchored by a deep canopy, integrated appliances, and English-led documentation so overseas clients or mixed-language households get one clear sign-off path.",
    scope: [
      "Appliance matrix and services coordination",
      "Canopy + tall unit composition with bulk storage",
      "Stone and backsplash shop drawings",
      "Milestone chart linking Hyderabad carcass production to local stone trades",
    ],
    facts: [
      { label: "Bridge", value: "Hyderabad fab" },
      { label: "Hub", value: "Bhubaneswar site" },
      { label: "Language", value: "English drawings" },
    ],
    galleryStripIndices: [3, 4, 5, 9],
    sections: [
      {
        heading: "Workflow",
        paragraphs: [
          "Cooking, prep, and sink legs were tested against real routines; the island hosts power and breakfast storage without becoming a visual barrier to the dining zone.",
        ],
      },
    ],
  },
  "wardrobe-study-patia": {
    typology: "Wardrobe · Study niche",
    contextLine: "Patia corridor · combined wardrobe + desk",
    lead:
      "A single volume switches between focused work and guest-ready calm: sliding screens, layered lighting, and wardrobe internals sized for monsoon-season textiles.",
    scope: [
      "Sliding screen system with soft close and lock-out for travel",
      "Desk lighting + wardrobe lighting on separate circuits",
      "Internals for long hang, drawers, and seasonal storage",
      "Tones tuned to Odisha daylight (warm greys, muted greens)",
    ],
    facts: [
      { label: "Zone", value: "Patia corridor" },
      { label: "Modes", value: "Work / guest" },
      { label: "Detail", value: "Integrated lighting" },
    ],
    galleryStripIndices: [7, 8, 9, 0],
    sections: [
      {
        heading: "Small room discipline",
        paragraphs: [
          "Every millimetre is documented: track positions, reveal lines, and switch heights so the room feels composed even when luggage and laptops share the same afternoon.",
        ],
      },
    ],
  },
};

export function getProjectPageDetail(slug: string): ProjectPageDetail | undefined {
  return PROJECT_PAGE_DETAILS[slug];
}
