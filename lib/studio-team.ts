/** Leadership & studio team — sourced from https://waytowebs.in/vivid/about/ */
export type StudioTeamMember = {
  id: string;
  name: string;
  role: string;
  studio: "hyderabad" | "bhubaneswar" | "both";
  tier: "ceo" | "studio";
  phone?: string;
  phoneHref?: string;
  imageSrc?: string;
  imageAlt: string;
};

export const STUDIO_TEAM: readonly StudioTeamMember[] = [
  {
    id: "ceo",
    name: "Soubhagya Laxmi Nayakk",
    role: "Founder & CEO",
    studio: "both",
    tier: "ceo",
    imageSrc: "/team/soubhagya-laxmi-nayakk.jpg",
    imageAlt: "Soubhagya Laxmi Nayakk, Founder & CEO — Vivid In2erio",
  },
  {
    id: "bhubaneswar-ceo",
    name: "Gargi Panda",
    role: "CEO · Bhubaneswar",
    studio: "bhubaneswar",
    tier: "ceo",
    phone: "+91 78540 01410",
    phoneHref: "tel:+917854001410",
    imageSrc: "/team/gargi-panda-bhubaneswar.png",
    imageAlt: "Gargi Panda, CEO — Vivid In2erio Bhubaneswar",
  },
  {
    id: "chief-designer",
    name: "Ar. Ganesh",
    role: "Chief Designer & Architect · Hyderabad & Bhubaneswar",
    studio: "both",
    tier: "studio",
    imageSrc: "/team/ar-ganesh.jpg",
    imageAlt: "Ar. Ganesh, Chief Designer & Architect — Vivid In2erio",
  },
  {
    id: "operations-manager",
    name: "Chandrika",
    role: "Operations Manager",
    studio: "hyderabad",
    tier: "studio",
    imageSrc: "/team/chandrika.jpg",
    imageAlt: "Chandrika, Operations Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "zunaid-parvez",
    name: "Zunaid Parvez",
    role: "Project Manager",
    studio: "hyderabad",
    tier: "studio",
    imageAlt: "Zunaid Parvez, Project Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "afzal",
    name: "Afzal",
    role: "Admin / Video",
    studio: "hyderabad",
    tier: "studio",
    imageAlt: "Afzal, Admin and Video — Vivid In2erio Hyderabad",
  },
  {
    id: "siva",
    name: "Siva",
    role: "Site Supervisor",
    studio: "hyderabad",
    tier: "studio",
    imageAlt: "Siva, Site Supervisor — Vivid In2erio Hyderabad",
  },
  {
    id: "n-jay-kumar",
    name: "N. Jay Kumar",
    role: "Showroom Manager",
    studio: "hyderabad",
    tier: "studio",
    imageAlt: "N. Jay Kumar, Showroom Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "ganesh-ghani",
    name: "Ganesh Ghani",
    role: "Architect · Landscaping",
    studio: "hyderabad",
    tier: "studio",
    imageAlt: "Ganesh Ghani, Architect Landscaping — Vivid In2erio Hyderabad",
  },
  {
    id: "tejo-sunder",
    name: "Tejo Sunder",
    role: "",
    studio: "both",
    tier: "studio",
    imageAlt: "Tejo Sunder — Vivid In2erio",
  },
  {
    id: "bhubaneswar-sales",
    name: "Sanjay Das",
    role: "Sales & Execution · Bhubaneswar",
    studio: "bhubaneswar",
    tier: "studio",
    phone: "+91 73963 79237",
    phoneHref: "tel:+917396379237",
    imageSrc: "/team/sanjay-das-bhubaneswar.png",
    imageAlt: "Sanjay Das, Sales & Execution — Vivid In2erio Bhubaneswar",
  },
] as const;

export const STUDIO_LEADERSHIP = STUDIO_TEAM.filter((m) => m.tier === "ceo");

export const STUDIO_TEAM_INTRO = {
  eyebrow: "Our team",
  title: "Expertise that brings your vision to life",
  body: "Two CEOs — Hyderabad office and Bhubaneswar studio — then architects, managers, and site coordinators from first consultation through handover.",
} as const;
