/**
 * Imagery + editorial copy sourced from the public Vivid In2wrio demo
 * https://waytowebs.in/vivid/ (WordPress media API).
 * Replace with self-hosted /public assets when you migrate off Waytowebs CDN.
 */
export const VIVID_WP_MEDIA =
  "https://waytowebs.in/vivid/wp-content/uploads/2026/04" as const;

/**
 * Self-hosted portfolio stills (home hero, inspiration strip, gallery pool).
 * Additional project-specific sets live in `lib/vivid-gallery-segmented.ts`.
 */
export const PORTFOLIO_GALLERY = "/gallery/portfolio" as const;

export const vividGalleryImagePool = [
  `${PORTFOLIO_GALLERY}/living-room-tv-feature-wall.png`,
  `${PORTFOLIO_GALLERY}/modern-dining-room-green-chairs.png`,
  `${PORTFOLIO_GALLERY}/living-room-sectional-circular-art.png`,
  `${PORTFOLIO_GALLERY}/living-room-red-bird-art.png`,
  `${PORTFOLIO_GALLERY}/modular-kitchen-wood-beige.png`,
  `${PORTFOLIO_GALLERY}/galley-kitchen-samsung-fridge.png`,
  `${PORTFOLIO_GALLERY}/living-room-kitchenette-open-plan.png`,
  `${PORTFOLIO_GALLERY}/master-bedroom-geometric-panel.png`,
  `${PORTFOLIO_GALLERY}/bedroom-wardrobe-tinted-glass.png`,
  `${PORTFOLIO_GALLERY}/bedroom-tan-headboard-wardrobe.png`,
] as const;

export const vividImages = {
  /** Hero — architectural render */
  hero: vividGalleryImagePool[0]!,
  /** Signature work strip (first three pool frames) */
  gallery: [vividGalleryImagePool[1]!, vividGalleryImagePool[2]!, vividGalleryImagePool[3]!] as const,
  /** Six service cards — kitchens, living, bedrooms */
  services: [
    vividGalleryImagePool[4]!,
    vividGalleryImagePool[5]!,
    vividGalleryImagePool[6]!,
    vividGalleryImagePool[7]!,
    vividGalleryImagePool[8]!,
    vividGalleryImagePool[9]!,
  ] as const,
  /** About strip */
  about: vividGalleryImagePool[8]!,
} as const;

/** Editorial aligned with the public Vivid In2wrio site (Waytowebs build). */
export const vividCopy = {
  heroEyebrow: "Premium & luxury interiors",
  heroTitle: "Premium & luxury interiors — curated for how you live",
  heroLead:
    "At Vivid In2wrio, we design more than spaces — we curate refined lifestyles. By blending timeless aesthetics, intelligent planning, and flawless execution, we deliver premium interiors and architectural solutions tailored for discerning homeowners and forward-thinking businesses.",
  heroStudio:
    "Vivid In2wrio is a luxury interior and architectural design studio with presence in Hyderabad and Bhubaneswar, known for creating bespoke residential and commercial spaces. Every project we craft is a balance of elegance, functionality, and enduring value — designed to elevate the way you live and work.",
  servicesIntro:
    "We offer complete design-to-delivery solutions for luxury homes, modern workspaces, and high-end commercial environments.",
  processIntroTitle: "A seamless journey from vision to reality",
  processIntroBody:
    "A carefully curated approach that guides you from initial concept to final execution, ensuring clarity, collaboration, and beautifully crafted interiors at every stage.",
  whyTitle: "Why choose Vivid In2wrio",
  whySubtitle: "Designed for those who expect the best",
  testimonialsIntroTitle: "Trusted by homeowners & businesses",
  ctaTitle: "Transform your vision into a timeless masterpiece",
  ctaBody:
    "Connect with our design experts today and take the first step toward a space that reflects luxury, comfort, and lasting value.",
} as const;

/** Service titles match https://waytowebs.in/vivid/ — bodies expand each line with project-specific detail. */
export const vividServices = [
  {
    title: "Premium architectural design",
    body: "Concept-led façades, spatial planning, and bespoke architectural detailing—aligned with the full design-to-delivery promise for luxury homes and forward-looking workplaces.",
    alt: "Architectural interior render — living volume",
  },
  {
    title: "High-end residential & commercial interiors",
    body: "Layered palettes, artisan joinery, and lighting choreography for residential comfort and commercial presence across premium apartments, villas, and workspaces.",
    alt: "Residential interior perspective",
  },
  {
    title: "Turnkey interior solutions",
    body: "Single-studio ownership from procurement through execution and final styling—timelines, vendors, and QC under one roadmap.",
    alt: "Interior vignette with joinery",
  },
  {
    title: "Photorealistic 3D visualization",
    body: "Walkthroughs and approvals-ready renders so finishes, proportions, and joinery are signed off before materials are ordered.",
    alt: "3D visualization still",
  },
  {
    title: "End-to-end project management",
    body: "Milestones, budgeting, coordination, and site quality control from concept to luxury handover.",
    alt: "Project coordination mood",
  },
  {
    title: "Smart & automated living solutions",
    body: "Integrated lighting, climate, security, and smart-home layers composed discreetly within the interior architecture.",
    alt: "Smart living interior",
  },
] as const;

export const vividProcessSteps = [
  {
    num: "01",
    title: "Consultation",
    copy: "We begin with a private consultation to understand your lifestyle, functional needs, aesthetic preferences, and project goals. This stage focuses on listening, aligning expectations, and establishing a clear design vision along with timelines and budget parameters.",
  },
  {
    num: "02",
    title: "Conceptualization",
    copy: "Based on the insights gathered, our design team develops a refined concept that defines the overall style, spatial flow, and mood of the project. Design themes, layout ideas, and material directions are carefully curated to reflect your personality and aspirations.",
  },
  {
    num: "03",
    title: "3D visualization",
    copy: "We translate approved concepts into photoreal renders and walkthroughs—refining light, materials, and joinery details so decisions are confident before procurement begins.",
  },
  {
    num: "04",
    title: "Detailed design",
    copy: "Once the visuals are finalized, we prepare comprehensive technical drawings and specifications. This includes detailed layouts, elevations, material selections, lighting plans, furniture details, and execution-ready documentation for flawless on-site implementation.",
  },
  {
    num: "05",
    title: "Precision execution",
    copy: "Our experienced project management team oversees every stage of execution with strict quality control. From procurement and workmanship to timelines and coordination, every detail is managed meticulously to ensure the design vision is delivered exactly as planned.",
  },
  {
    num: "06",
    title: "Luxury handover",
    copy: "The project concludes with a white-glove handover, ensuring every detail is completed, tested, and refined. The final space is delivered ready for use — immaculate, elegant, and true to the original design intent.",
  },
] as const;

export const vividWhyBullets = [
  "Bespoke, client-centric designs",
  "Premium materials & luxury finishes",
  "Experienced architects & interior designers",
  "Transparent process & committed timelines",
] as const;

export const vividTestimonials = [
  {
    quote:
      "From concept to execution, the team delivered beyond our expectations. Every detail was thoughtfully designed.",
    name: "Priya Narayanan",
    role: "Homeowner · 3BHK interior — Jubilee Hills, Hyderabad",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=320&h=320&fit=crop&crop=faces",
    photoAlt: "Portrait of Priya Narayanan",
  },
  {
    quote:
      "A seamless process from start to finish. The space feels elegant, functional, and perfectly tailored to us.",
    name: "Vikram Mehta",
    role: "Director · Lakeside villa — Shamirpet corridor",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=320&fit=crop&crop=faces",
    photoAlt: "Portrait of Vikram Mehta",
  },
  {
    quote:
      "Professional, creative, and reliable. The final result reflects quality and thoughtful design.",
    name: "Ananya Mishra",
    role: "Co-founder · Studio workspace — Bhubaneswar",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&h=320&fit=crop&crop=faces",
    photoAlt: "Portrait of Ananya Mishra",
  },
] as const;


export const vividCareerOpenings = [
  {
    role: "Interior Designer",
    experience: "1-4 years",
    skills:
      "Residential and commercial interiors, space planning, material selection, client presentations, concept development, AutoCAD / SketchUp / 3Ds Max.",
  },
  {
    role: "Architect",
    experience: "2-5 years",
    skills:
      "Architectural planning, design development, working drawings, technical documentation, site coordination, AutoCAD / Revit.",
  },
  {
    role: "3D Visualizer",
    experience: "1-4 years",
    skills:
      "Photoreal rendering and walkthroughs, lighting and texture detailing, 3Ds Max / Lumion / V-Ray / SketchUp.",
  },
  {
    role: "Site Supervisor / Project Coordinator",
    experience: "2-6 years",
    skills:
      "On-site execution supervision, vendor coordination, quality checks, timeline tracking, material handling, reporting.",
  },
  {
    role: "Internship (Interior / Architecture)",
    experience: "2-6 months",
    skills:
      "Design process support, studio workflow exposure, site visits, drafting and presentation assistance.",
  },
] as const;

/**
 * Tile / case-study hero URLs aligned to each project name.
 * Sheeba, Joseph, and Villa 173 match the first linked `.jpg` in their columns on
 * https://waytowebs.in/vivid/gallery/. Delhi and Villa 193 East use corrected assets
 * (the live WP gallery mis-links those columns to the wrong media).
 */
export const vividGalleryCoverImageByProjectSlug = {
  "delhi-kitchen-design": `${PORTFOLIO_GALLERY}/modular-kitchen-wood-beige.png`,
  "joseph-kitchen-design": `${PORTFOLIO_GALLERY}/galley-kitchen-samsung-fridge.png`,
  "sheeba-villa-157-indukuri": `${PORTFOLIO_GALLERY}/master-bedroom-geometric-panel.png`,
  "villa-173-west-indukuri-lakeshore": `${PORTFOLIO_GALLERY}/living-room-tv-feature-wall.png`,
  "villa-193-east-indukuri-lakeshore": `${PORTFOLIO_GALLERY}/living-room-sectional-circular-art.png`,
  "coastal-apartment-bbsr": `${PORTFOLIO_GALLERY}/living-room-red-bird-art.png`,
  "modular-kitchen-odisha": `${PORTFOLIO_GALLERY}/galley-kitchen-samsung-fridge.png`,
  "wardrobe-study-patia": `${PORTFOLIO_GALLERY}/bedroom-wardrobe-tinted-glass.png`,
} as const satisfies Record<string, string>;

/** Names as listed on the Waytowebs gallery page (portfolio-wide). */
export const vividGalleryProjects = [
  { tag: "Delhi", name: "Delhi Kitchen Design", alt: "Kitchen interior render — Delhi project" },
  { tag: "Joseph", name: "Joseph Kitchen Design", alt: "Kitchen design perspective" },
  { tag: "Indukuri", name: "Sheeba Villa 157 Indukuri Renders", alt: "Villa interior — Indukuri" },
  { tag: "Indukuri Lakeshore", name: "Villa 173 West Indukuri Lakeshore Renders", alt: "Lakeshore villa render — west" },
  { tag: "Indukuri Lakeshore", name: "Villa 193 East Indukuri Lakeshore Renders", alt: "Lakeshore villa render — east" },
] as const;

/** Intro paragraph from https://waytowebs.in/vivid/gallery/ “Our Projects”. */
export const vividGalleryPageIntro =
  "At Vivid In2wrio, our specialized services are designed to elevate every project with clarity, control, and complete confidence. From detailed planning to advanced visualization and smart integrations, we ensure every stage of your project is seamless, efficient, and executed to premium standards." as const;
