/** Leadership & studio team — sourced from https://waytowebs.in/vivid/about/ */
export type StudioTeamMember = {
  id: string;
  name: string;
  role: string;
  studio: "hyderabad" | "bhubaneswar" | "both";
  phone?: string;
  phoneHref?: string;
  imageSrc?: string;
  imageAlt: string;
};

export const STUDIO_TEAM: readonly StudioTeamMember[] = [
  {
    id: "ceo",
    name: "Soubhagyalaxmi Nayak",
    role: "CEO",
    studio: "both",
    imageSrc: "/founder-soubhagya-laxmi-nayak.png",
    imageAlt: "Soubhagyalaxmi Nayak, CEO — Vivid In2wrio",
  },
  {
    id: "chief-designer",
    name: "Ar. Ganesh",
    role: "Chief Designer & Architect · Hyderabad & Bhubaneswar",
    studio: "both",
    imageSrc: "/team/ar-ganesh.jpg",
    imageAlt: "Ar. Ganesh, Chief Designer & Architect — Vivid In2wrio",
  },
  {
    id: "bhubaneswar-lead",
    name: "Gargi Panda",
    role: "Branch Head · Bhubaneswar",
    studio: "bhubaneswar",
    phone: "+91 78540 01410",
    phoneHref: "tel:+917854001410",
    imageSrc: "/partner-gargi-panda-bhubaneswar.png",
    imageAlt: "Gargi Panda, Branch Head — Vivid In2wrio Bhubaneswar",
  },
  {
    id: "odisha-assistant",
    name: "Ganesh",
    role: "Assistant · Odisha Office",
    studio: "bhubaneswar",
    phone: "+91 95735 97839",
    phoneHref: "tel:+919573597839",
    imageSrc: "/team/ganesh-odisha.png",
    imageAlt: "Ganesh, Odisha studio assistant — Vivid In2wrio",
  },
] as const;

export const STUDIO_TEAM_INTRO = {
  eyebrow: "Our team",
  title: "Expertise that brings your vision to life",
  body: "Architects, interior designers, project managers, and site coordinators — one studio thread from first consultation through luxury handover.",
} as const;
