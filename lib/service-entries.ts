/** Livspace-style service entry tiles on the city home page. */
export const SERVICE_ENTRIES = [
  {
    label: "Modular kitchen & wardrobes",
    hint: "Functional cores · signed-off renders",
    href: (city: string) => `/${city}/gallery?type=kitchen#work`,
  },
  {
    label: "Full home interiors",
    hint: "Turnkey apartments & residences",
    href: (city: string) => `/${city}/projects`,
    featured: true,
  },
  {
    label: "Luxury & turnkey",
    hint: "Tailored villas · premium finishes",
    href: (city: string) => `/${city}/services`,
  },
  {
    label: "Renovation",
    hint: "Live-in upgrades · phased execution",
    href: (city: string) => `/${city}/process`,
  },
] as const;
