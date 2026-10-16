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
    name: "Soubhagya Laxmi Nayakk",
    role: "Founder & CEO",
    studio: "both",
    imageSrc: "/team/soubhagya-laxmi-nayakk.jpg",
    imageAlt: "Soubhagya Laxmi Nayakk, Founder & CEO — Vivid In2erio",
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
    id: "operations-manager",
    name: "Chandrika",
    role: "Operations Manager",
    studio: "hyderabad",
    imageSrc: "/team/chandrika.jpg",
    imageAlt: "Chandrika, Operations Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "zunaid-parvez",
    name: "Zunaid Parvez",
    role: "Project Manager",
    studio: "hyderabad",
    imageAlt: "Zunaid Parvez, Project Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "afzal",
    name: "Afzal",
    role: "Admin / Video",
    studio: "hyderabad",
    imageAlt: "Afzal, Admin and Video — Vivid In2erio Hyderabad",
  },
  {
    id: "siva",
    name: "Siva",
    role: "Site Supervisor",
    studio: "hyderabad",
    imageAlt: "Siva, Site Supervisor — Vivid In2erio Hyderabad",
  },
  {
    id: "n-jay-kumar",
    name: "N. Jay Kumar",
    role: "Showroom Manager",
    studio: "hyderabad",
    imageAlt: "N. Jay Kumar, Showroom Manager — Vivid In2erio Hyderabad",
  },
  {
    id: "ak-basha",
    name: "A.K Basha",
    role: "Business Consultant",
    studio: "hyderabad",
    imageAlt: "A.K Basha, Business Consultant — Vivid In2erio Hyderabad",
  },
  {
    id: "ganesh-ghani",
    name: "Ganesh Ghani",
    role: "Architect · Landscaping",
    studio: "hyderabad",
    imageAlt: "Ganesh Ghani, Architect Landscaping — Vivid In2erio Hyderabad",
  },
  {
    id: "tejo-sunder",
    name: "Tejo Sunder",
    role: "",
    studio: "both",
    imageAlt: "Tejo Sunder — Vivid In2erio",
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
    phone: "+91 73963 79237",
    phoneHref: "tel:+917396379237",
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
  body: "Architects, interior designers, project managers, and site coordinators — one team from first consultation through luxury handover.",
} as const;
