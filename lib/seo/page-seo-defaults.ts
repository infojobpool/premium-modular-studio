import type { Metadata } from "next";
import type { StudioLocationId } from "@/lib/locations";
import { BRAND_NAME } from "./constants";

/** Shape shared by Keystatic entries and runtime SEO resolution. */
export type PageSeoFields = {
  title: string;
  description: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  focusKeyword?: string;
  robots?: Metadata["robots"];
};

export type CmsSeoEntry = PageSeoFields & {
  slug: string;
  pagePath: string;
  indexInSearch?: boolean;
  followLinks?: boolean;
};

export function pathToSeoSlug(pagePath: string): string {
  if (pagePath === "/") return "home";
  return pagePath.slice(1).replace(/\//g, "-");
}

export function cmsEntryToPageSeoFields(entry: CmsSeoEntry): PageSeoFields {
  const index = entry.indexInSearch ?? true;
  const follow = entry.followLinks ?? true;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    openGraphTitle: entry.openGraphTitle,
    openGraphDescription: entry.openGraphDescription,
    focusKeyword: entry.focusKeyword,
    robots: { index, follow },
  };
}

/** Hub + global routes — seeded into Keystatic; kept as dev fallback. */
export const GLOBAL_PAGE_SEO: Record<"/" | "/projects" | "/privacy", PageSeoFields> = {
  "/": {
    title: "Choose your studio",
    description:
      "Vivid In2wrio — premium & luxury interiors in Hyderabad and Bhubaneswar. Select your city for consultations, projects, and studio contact.",
    focusKeyword: "premium interiors Hyderabad Bhubaneswar",
    keywords: ["luxury interior design", "modular kitchen", "design studio India"],
  },
  "/projects": {
    title: "All projects",
    description:
      "Case studies across Hyderabad and Bhubaneswar — kitchens, villas, and apartments with name-specific scope and documentation.",
    focusKeyword: "interior design portfolio",
    keywords: ["luxury home projects", "modular kitchen case study", BRAND_NAME],
  },
  "/privacy": {
    title: "Privacy",
    description:
      "How Vivid In2wrio handles information you share through this marketing site and enquiry forms.",
    robots: { index: true, follow: true },
  },
};

/** City home `/hyderabad`, `/bhubaneswar`. */
export const CITY_HOME_SEO: Record<StudioLocationId, PageSeoFields> = {
  hyderabad: {
    title: "Hyderabad studio",
    description:
      "Premium & luxury interiors in Hyderabad — bespoke residential and commercial design, modular kitchens, 3D sign-off, and studio-led execution from Secunderabad.",
    focusKeyword: "interior design Hyderabad",
    keywords: [
      "luxury interiors Hyderabad",
      "modular kitchen Hyderabad",
      "interior designer Secunderabad",
      "Telangana interior studio",
    ],
  },
  bhubaneswar: {
    title: "Bhubaneswar studio",
    description:
      "Premium & luxury interiors in Bhubaneswar — climate-smart homes, modular kitchens, English-led documentation, and Odisha studio execution.",
    focusKeyword: "interior design Bhubaneswar",
    keywords: [
      "luxury interiors Bhubaneswar",
      "modular kitchen Odisha",
      "interior designer Puri Bypass",
      "Bhubaneswar design studio",
    ],
  },
};

/** City subpages — key: `{city}/{subpage}`. */
export const CITY_SUBPAGE_SEO: Record<string, PageSeoFields> = {
  "hyderabad/about": {
    title: "About · Hyderabad",
    description:
      "Meet the Vivid In2wrio Hyderabad studio — luxury residential and commercial interiors, founder-led design, and execution from Sainikpuri, Secunderabad.",
    focusKeyword: "about Vivid In2wrio Hyderabad",
    keywords: ["Hyderabad interior design studio", "luxury residential interiors"],
  },
  "hyderabad/services": {
    title: "Services · Hyderabad",
    description:
      "Modular kitchens, full-home interiors, architecture, 3D visualization, and turnkey execution — Hyderabad studio services from consultation to handover.",
    focusKeyword: "interior design services Hyderabad",
    keywords: ["modular kitchen Hyderabad", "turnkey interiors", "3D interior visualization"],
  },
  "hyderabad/process": {
    title: "Process · Hyderabad",
    description:
      "Our Hyderabad design process — consultation, planning, 3D sign-off, procurement, and precision execution with clear milestones and studio accountability.",
    focusKeyword: "interior design process Hyderabad",
  },
  "hyderabad/gallery": {
    title: "Gallery · Hyderabad",
    description:
      "Hyderabad project gallery — kitchens, villas, and apartments with renders, joinery detail, and design-to-delivery outcomes from our Telangana studio.",
    focusKeyword: "interior design gallery Hyderabad",
  },
  "hyderabad/projects": {
    title: "Projects · Hyderabad",
    description:
      "Named Hyderabad case studies — Delhi kitchen, Indukuri villas, and signature residential work with dedicated pages, scope, and imagery.",
    focusKeyword: "interior design projects Hyderabad",
  },
  "hyderabad/contact": {
    title: "Book Free Consultation · Hyderabad",
    description:
      "Book a free design consultation and plan your studio visit — phone, WhatsApp, email, enquiry form, and map for our Hyderabad studio in Sainikpuri.",
    focusKeyword: "book interior consultation Hyderabad",
    keywords: ["book interior consultation Hyderabad", "Vivid In2wrio contact", "studio visit Hyderabad"],
  },
  "hyderabad/visit": {
    title: "Visit · Hyderabad",
    description:
      "Visit Vivid In2wrio Hyderabad — Phase II, Valluvar Nagar, Laxmipuri, Sainikpuri, Secunderabad 500094. Mon–Sat by appointment.",
    focusKeyword: "interior design studio Secunderabad",
  },
  "hyderabad/faq": {
    title: "FAQ · Hyderabad",
    description:
      "Hyderabad studio FAQs — service areas, first consultation prep, parking, and typical timelines for modular kitchens and full-home interiors.",
    focusKeyword: "interior design FAQ Hyderabad",
  },
  "hyderabad/blog": {
    title: "Blog · Hyderabad",
    description:
      "Editorial insights from Vivid In2wrio Hyderabad on planning, kitchens, luxury residential trends, and studio-led interior design.",
    focusKeyword: "interior design blog Hyderabad",
  },
  "hyderabad/careers": {
    title: "Careers · Hyderabad",
    description:
      "Careers at Vivid In2wrio Hyderabad — interior design, architecture, 3D visualization, and site execution roles in Telangana.",
    focusKeyword: "interior design jobs Hyderabad",
  },
  "bhubaneswar/about": {
    title: "About · Bhubaneswar",
    description:
      "Meet the Vivid In2wrio Bhubaneswar studio — Odisha-led delivery, climate-aware specifications, and premium residential interiors on Puri Bypass.",
    focusKeyword: "about Vivid In2wrio Bhubaneswar",
  },
  "bhubaneswar/services": {
    title: "Services · Bhubaneswar",
    description:
      "Modular kitchens, full-home interiors, and turnkey execution in Bhubaneswar — English-led documentation and Hyderabad fabrication when needed.",
    focusKeyword: "interior design services Bhubaneswar",
  },
  "bhubaneswar/process": {
    title: "Process · Bhubaneswar",
    description:
      "Our Bhubaneswar design process — consultation, drawings, 3D approvals, procurement, and site leadership tuned for Odisha climate and pace.",
    focusKeyword: "interior design process Bhubaneswar",
  },
  "bhubaneswar/gallery": {
    title: "Gallery · Bhubaneswar",
    description:
      "Bhubaneswar project gallery — coastal apartments, modular kitchens, and wardrobe studies with renders and milestone-led delivery.",
    focusKeyword: "interior design gallery Bhubaneswar",
  },
  "bhubaneswar/projects": {
    title: "Projects · Bhubaneswar",
    description:
      "Named Bhubaneswar case studies — coastal apartments, modular kitchens, and Patia corridor work with dedicated project pages.",
    focusKeyword: "interior design projects Bhubaneswar",
  },
  "bhubaneswar/contact": {
    title: "Book Free Consultation · Bhubaneswar",
    description:
      "Book a free design consultation and plan your studio visit — phone, WhatsApp, email, enquiry form, and map for our Bhubaneswar studio on Puri Bypass.",
    focusKeyword: "book interior consultation Bhubaneswar",
  },
  "bhubaneswar/visit": {
    title: "Visit · Bhubaneswar",
    description:
      "Visit Vivid In2wrio Bhubaneswar — Plot No. 2165/8180, Puri Bypass, Mangaraj Point, Bhubaneswar 751006. Mon–Sat by appointment.",
    focusKeyword: "interior design studio Bhubaneswar",
  },
  "bhubaneswar/faq": {
    title: "FAQ · Bhubaneswar",
    description:
      "Bhubaneswar studio FAQs — monsoon-ready finishes, site surveys, Hyderabad fabrication bridge, and English-only project documentation.",
    focusKeyword: "interior design FAQ Bhubaneswar",
  },
  "bhubaneswar/blog": {
    title: "Blog · Bhubaneswar",
    description:
      "Editorial insights from Vivid In2wrio Bhubaneswar on Odisha homes, planning, and luxury residential interior trends.",
    focusKeyword: "interior design blog Bhubaneswar",
  },
  "bhubaneswar/careers": {
    title: "Careers · Bhubaneswar",
    description:
      "Careers at Vivid In2wrio Bhubaneswar — interior design, architecture, visualization, and execution roles in Odisha.",
    focusKeyword: "interior design jobs Bhubaneswar",
  },
};

/** Optional per-project SEO overrides — key: `{city}/{slug}`. */
export const PROJECT_SEO_OVERRIDES: Partial<Record<string, PageSeoFields>> = {
  "hyderabad/delhi-kitchen-design": {
    title: "Delhi kitchen design",
    description:
      "Delhi-region kitchen case study — work triangles, integrated appliances, and signed-off finishes before fabrication.",
    focusKeyword: "luxury modular kitchen design",
  },
};

function robotsFlags(fields: PageSeoFields): { indexInSearch: boolean; followLinks: boolean } {
  const robots = fields.robots;
  if (robots == null || typeof robots === "string") {
    return { indexInSearch: true, followLinks: true };
  }
  return {
    indexInSearch: robots.index !== false,
    followLinks: robots.follow !== false,
  };
}

function toCmsEntry(pagePath: string, fields: PageSeoFields): CmsSeoEntry {
  const { indexInSearch, followLinks } = robotsFlags(fields);
  return {
    slug: pathToSeoSlug(pagePath),
    pagePath,
    title: fields.title,
    description: fields.description,
    focusKeyword: fields.focusKeyword,
    keywords: fields.keywords,
    openGraphTitle: fields.openGraphTitle,
    openGraphDescription: fields.openGraphDescription,
    indexInSearch,
    followLinks,
  };
}

/** Default SEO entries used to seed Keystatic content files. */
export function listDefaultSeoEntries(): CmsSeoEntry[] {
  const entries: CmsSeoEntry[] = [];

  for (const [path, fields] of Object.entries(GLOBAL_PAGE_SEO)) {
    entries.push(toCmsEntry(path, fields));
  }

  for (const city of ["hyderabad", "bhubaneswar"] as StudioLocationId[]) {
    entries.push(toCmsEntry(`/${city}`, CITY_HOME_SEO[city]));
  }

  for (const [key, fields] of Object.entries(CITY_SUBPAGE_SEO)) {
    entries.push(toCmsEntry(`/${key}`, fields));
  }

  return entries;
}
