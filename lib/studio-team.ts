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
    imageAlt: "Soubhagyalaxmi Nayak, CEO — Vivid In2erio",
  },
  {
    id: "chief-designer",
    name: "Ar. Ganesh",
    role: "Chief Designer & Architect · Hyderabad & Bhubaneswar",
    studio: "both",
    imageSrc: "/team/ar-ganesh.jpg",
    imageAlt: "Ar. Ganesh, Chief Designer & Architect — Vivid In2erio",
  },
  {
    id: "bhubaneswar-ceo",
    name: "Gargi Panda",
    role: "CEO · Bhubaneswar",
    studio: "bhubaneswar",
    phone: "+91 78540 01410",
    phoneHref: "tel:+917854001410",
    imageSrc: "/team/gargi-panda-bhubaneswar.png",
    imageAlt: "Gargi Panda, CEO — Vivid In2erio Bhubaneswar",
  },
  {
    id: "bhubaneswar-sales",
    name: "Sanjay Das",
    role: "Sales & Execution · Bhubaneswar",
    studio: "bhubaneswar",
    imageSrc: "/team/sanjay-das-bhubaneswar.png",
    imageAlt: "Sanjay Das, Sales & Execution — Vivid In2erio Bhubaneswar",
  },
  {
    id: "odisha-assistant",
    name: "Ganesh",
    role: "Assistant · Odisha Office",
    studio: "bhubaneswar",
    phone: "+91 95735 97839",
    phoneHref: "tel:+919573597839",
    imageSrc: "/team/ganesh-odisha.png",
    imageAlt: "Ganesh, Odisha studio assistant — Vivid In2erio",
  },
] as const;

export const STUDIO_TEAM_INTRO = {
  eyebrow: "Our team",
  title: "Expertise that brings your vision to life",
  body: "Architects, interior designers, project managers, and site coordinators — one studio thread from first consultation through luxury handover.",
} as const;
