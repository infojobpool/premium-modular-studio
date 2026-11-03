/** Stills of clients with the founder & CEO — stories page showcase. */
export type CeoShowcasePortrait = {
  name: string;
  detail: string;
  image: string;
  alt: string;
  objectPosition?: string;
};

export const CEO_SHOWCASE_PORTRAITS: readonly CeoShowcasePortrait[] = [
  {
    name: "Mr. Partha & Mrs. Beena",
    detail: "Om Shree Pritvi D901 · Rtd. Air Force Officer",
    image: "/stories/partha-beena-with-ceo.jpg",
    alt: "Mr. Partha and Mrs. Beena with Vivid In2erio founder and CEO Soubhagya Laxmi Nayakk",
  },
  {
    name: "Asim Mohanty",
    detail: "RNR Residency, Kowkoor",
    image: "/stories/asim-mohanty-with-ceo.jpg",
    alt: "Asim Mohanty and family with Vivid In2erio founder and CEO Soubhagya Laxmi Nayakk",
  },
  {
    name: "Home handover",
    detail: "Living · with the CEO",
    image: "/stories/handover-living-ceo.jpg",
    alt: "Clients at home with Vivid In2erio founder and CEO Soubhagya Laxmi Nayakk",
    objectPosition: "center 18%",
  },
  {
    name: "Home handover",
    detail: "Portrait · with the CEO",
    image: "/stories/handover-portrait-ceo.jpg",
    alt: "Client with Vivid In2erio founder and CEO Soubhagya Laxmi Nayakk",
    objectPosition: "center 12%",
  },
  {
    name: "Home handover",
    detail: "Bar · with the CEO",
    image: "/stories/handover-bar-ceo.jpg",
    alt: "Client and Vivid In2erio founder and CEO Soubhagya Laxmi Nayakk at the home bar",
    objectPosition: "center 20%",
  },
] as const;
