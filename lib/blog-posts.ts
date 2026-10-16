const PORTFOLIO = "/gallery/portfolio";
const SHEEBA = "/gallery/sheeba-villa-157";

export type BlogPostSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; eyebrow: string; title: string; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Optional deck line under the headline */
  subtitle?: string;
  summary: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  lead: string;
  sections: BlogPostSection[];
  keywords?: string[];
  /** Editorial label in the article kicker, e.g. "Studio edition" */
  category?: string;
  /** Self-hosted PDF for download or in-browser viewing */
  pdfPath?: string;
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "art-of-designing-smarter-spaces",
    title: "The Art of Designing Smarter Spaces",
    subtitle: "Intelligent layouts that look spacious and maximize utility",
    summary:
      "Reflective finishes, smart storage, and modular kitchens — how thoughtful planning unlocks hidden square footage in modern Hyderabad homes.",
    publishedAt: "2026-09-08",
    category: "Studio edition",
    image: `${SHEEBA}/living-room.png`,
    imageAlt: "Living room with curved sofa, joinery, and layered lighting — Sheeba Villa 157",
    pdfPath: "/blog/art-of-designing-smarter-spaces.pdf",
    lead:
      "Modern home interiors are no longer just about filling rooms with furniture. Today, homeowners want spaces that feel wide, breathing, organized, and structurally optimized around the way they actually live. At Vivid In2erio, we believe good interior design unlocks hidden square footage through thoughtful material choices and high-density storage modules.",
    sections: [
      {
        type: "heading",
        text: "Reflective textures",
      },
      {
        type: "paragraph",
        text:
          "Selecting structural surfaces continues to be a massive factor for urban flats, but the direction is moving past flat matte textures. Integrating polished acrylics, tinted mirror paneling, and metallic glass finishes helps bounce light across tighter corridors. These finishes provide seamless aesthetic continuity, allowing interior spaces to feel significantly larger, cleaner, and visually uninterrupted.",
      },
      {
        type: "image",
        src: `${SHEEBA}/interior-17-20250505-065527.png`,
        alt: "Marble TV feature wall with integrated shelving",
        caption: "Reflective marble panels and recessed niches expand visual depth in compact living zones.",
      },
      {
        type: "heading",
        text: "Smart storage layout",
      },
      {
        type: "paragraph",
        text:
          "Hidden square footage is rarely about adding rooms — it is about designing every vertical surface to work harder. Floor-to-ceiling wardrobes, under-stair modules, integrated TV consoles, and corridor-width storage banks keep daily essentials out of sight while preserving clean sightlines through open plans.",
      },
      {
        type: "list",
        items: [
          "Full-height wardrobe banks with internal organizers and soft-close hardware",
          "Floating desks and study nooks integrated into bedroom and corridor joinery",
          "Dedicated luggage, shoe, and accessory zones to reduce surface clutter",
          "Service cores planned early so storage does not compete with plumbing and electrical runs",
        ],
      },
      {
        type: "image",
        src: `${SHEEBA}/study-workspace.png`,
        alt: "Home office with navy open shelving and floating desk",
        caption: "Study and workspace zones built into the joinery envelope — storage without sacrificing floor area.",
      },
      {
        type: "heading",
        text: "Modern modular kitchens",
      },
      {
        type: "paragraph",
        text:
          "The kitchen has become one of the most high-use zones in contemporary layouts. Homeowners are looking for systems that combine high structural load capacity with ergonomic daily comfort.",
      },
      {
        type: "list",
        items: [
          "Customized pull-out pantry towers and corner carousels",
          "Deep under-sink drawer organization bins",
          "Dedicated built-in electronic appliance housings",
          "Easy-to-clean premium quartz counter options",
        ],
      },
      {
        type: "image",
        src: `${PORTFOLIO}/modular-kitchen-wood-beige.png`,
        alt: "Modular kitchen with wood upper cabinets and integrated appliances",
        caption: "Modular kitchen layouts signed off in 3D before fabrication — workflow, storage, and finishes locked together.",
      },
      {
        type: "callout",
        eyebrow: "Vivid In2erio advantage",
        title: "Premium residential transformations across Hyderabad",
        text:
          "Vivid In2erio is widely recognized as a leading home interior design firm in Hyderabad, offering premium, end-to-end residential transformations. We specialize in creating spaces that seamlessly blend modern aesthetics with functional luxury — bespoke modular kitchens, space-saving wardrobes, and living room compositions tailored to your lifestyle. From contemporary luxury apartments in high-tech city hubs to expansive villas, our Hyderabad office handles every project phase with scientific precision and complete transparency. We prioritize durable materials, optimized storage, and strict adherence to timelines so your home makeover is stress-free, deeply personalized, and executed to international standards.",
      },
    ],
    keywords: [
      "smart storage design",
      "modular kitchen Hyderabad",
      "space-saving interiors",
      "reflective finishes",
    ],
  },
  {
    slug: "top-interior-design-trends-modern-homes",
    title: "Top Interior Design Trends for Modern Homes",
    summary:
      "Ten trends shaping contemporary homes — warm neutrals, smart storage, modular kitchens, layered lighting, and design that reflects how you live.",
    publishedAt: "2026-02-26",
    image: `${PORTFOLIO}/living-room-sectional-circular-art.png`,
    imageAlt: "Modern living room with warm neutral palette and layered lighting",
    pdfPath: "/blog/top-interior-design-trends-modern-homes.pdf",
    lead:
      "Modern home interiors are no longer just about looking stylish. Today, homeowners want spaces that are beautiful, functional, comfortable, and designed around the way they actually live. At Vivid In2erio, we believe good interior design brings together thoughtful planning, quality materials, smart storage, and a style that feels personal.",
    sections: [
      {
        type: "heading",
        text: "1. Warm and neutral colour palettes",
      },
      {
        type: "paragraph",
        text: "Neutral interiors continue to be a popular choice for modern homes, but the trend is moving beyond plain whites and greys. Warm beige, cream, taupe, earthy browns, muted greens, and natural wood tones create a welcoming and timeless atmosphere. These shades also provide flexibility, allowing homeowners to introduce colour through furniture, artwork, cushions, lighting, and décor.",
      },
      {
        type: "heading",
        text: "2. Smart storage and clutter-free spaces",
      },
      {
        type: "paragraph",
        text: "One of the biggest priorities in modern homes is making the most of available space. From modular kitchens and customized wardrobes to TV units, storage walls, and built-in cabinets, smart storage helps keep everyday essentials organized without compromising on design. A well-planned storage solution should not only provide space but also make it easy to access and maintain.",
      },
      {
        type: "heading",
        text: "3. Modern modular kitchens",
      },
      {
        type: "paragraph",
        text: "The kitchen has become one of the most important spaces in contemporary homes. Homeowners are looking for kitchens that combine aesthetics with everyday functionality.",
      },
      {
        type: "list",
        items: [
          "Efficient drawer and cabinet organization",
          "Tall storage units",
          "Dedicated appliance spaces",
          "Easy-to-maintain finishes",
          "Soft-close hardware",
          "Functional work zones",
          "Customized layouts based on the available space",
        ],
      },
      {
        type: "paragraph",
        text: "The right combination of materials, colours, lighting, and storage can turn a kitchen into a practical and visually appealing part of the home.",
      },
      {
        type: "heading",
        text: "4. Natural materials and textures",
      },
      {
        type: "paragraph",
        text: "Modern interiors are increasingly bringing natural-looking materials indoors. Wood finishes, stone textures, fluted panels, cane details, marble-inspired surfaces, and textured laminates can add warmth and depth to otherwise minimal spaces. Using a combination of textures instead of relying on a single material can make an interior feel richer without making it visually crowded.",
      },
      {
        type: "heading",
        text: "5. Minimalism with personality",
      },
      {
        type: "paragraph",
        text: "Minimalism does not mean an empty or boring home. Modern minimal interiors focus on clean lines, purposeful furniture, simple colour palettes, and clutter-free surfaces. The key is to combine simplicity with personal touches — artwork, plants, statement furniture, decorative lighting, or carefully selected accessories can make the space feel uniquely yours.",
      },
      {
        type: "heading",
        text: "6. Layered and statement lighting",
      },
      {
        type: "paragraph",
        text: "Lighting plays a major role in how an interior looks and feels. Instead of relying only on one central light, modern homes are using multiple layers of lighting.",
      },
      {
        type: "list",
        items: [
          "Ambient lighting",
          "Task lighting",
          "Accent lighting",
          "Cove and profile lighting",
          "Pendant lights",
          "Decorative fixtures",
        ],
      },
      {
        type: "paragraph",
        text: "In kitchens, wardrobes, TV units, and display areas, integrated lighting can also highlight design details while improving functionality.",
      },
      {
        type: "heading",
        text: "7. Multi-functional living spaces",
      },
      {
        type: "paragraph",
        text: "With homes becoming more adaptable, furniture and layouts are increasingly designed to serve multiple purposes. A living room may incorporate a work-from-home corner, a dining area may double as a study space, and storage can be integrated into walls or furniture. Thoughtful space planning allows homeowners to make smaller spaces feel more open and useful.",
      },
      {
        type: "heading",
        text: "8. Personalized bedrooms and wardrobes",
      },
      {
        type: "paragraph",
        text: "Bedrooms are moving toward a more relaxed and personalized aesthetic. Soft colours, warm lighting, comfortable materials, and well-designed wardrobes can create a calm environment while keeping everything organized. Wardrobe designs can be customized according to your requirements, with dedicated sections for clothing, accessories, footwear, luggage, and everyday essentials.",
      },
      {
        type: "heading",
        text: "9. Sustainable and long-lasting choices",
      },
      {
        type: "paragraph",
        text: "Homeowners are becoming more conscious about the materials they use and how long their interiors will remain practical. Choosing durable materials, efficient storage, timeless designs, and finishes that are easy to maintain can help create interiors that continue to look good and function well over the years.",
      },
      {
        type: "heading",
        text: "10. Design that reflects your lifestyle",
      },
      {
        type: "paragraph",
        text: "Perhaps the most important trend is personalization. There is no single interior style that works for every homeowner. A successful home interior should consider the family's lifestyle, daily routines, storage requirements, preferences, available space, and budget. At Vivid In2erio, our approach is to understand these requirements first and then create interiors that combine design, functionality, quality, and individuality.",
      },
      {
        type: "heading",
        text: "Create a home that works for you",
      },
      {
        type: "paragraph",
        text: "Interior design is not simply about following the latest trends. Trends can provide inspiration, but the best interiors are those that remain comfortable, functional, and relevant to your lifestyle. Whether you are planning a modular kitchen, customized wardrobe, living room, bedroom, or complete home interior, thoughtful planning can make a significant difference. You aspire. We deliver.",
      },
    ],
    keywords: [
      "interior design trends",
      "modern home interiors",
      "modular kitchen trends",
      "smart storage design",
    ],
  },
  {
    slug: "premium-kitchen-design-ideas",
    title: "Premium Kitchen Design Ideas That Combine Style & Functionality",
    summary:
      "Kitchen layouts, materials, and storage strategies that keep luxury aesthetics practical for daily use.",
    publishedAt: "2026-02-26",
    image: `${PORTFOLIO}/modular-kitchen-wood-beige.png`,
    imageAlt: "Modular kitchen with wood upper cabinets and integrated appliances",
    lead:
      "The kitchen is the heart of every home — and luxury kitchens must be both beautiful and highly practical. Here are premium kitchen ideas that elevate daily living without sacrificing workflow.",
    sections: [
      {
        type: "heading",
        text: "Luxury kitchen ideas",
      },
      {
        type: "list",
        items: [
          "Built-in appliances for a seamless, clutter-free aesthetic",
          "Modular layouts designed for smooth workflow",
          "Handle-less cabinets for a sleek modern finish",
          "Quartz or granite countertops for durability and elegance",
          "Smart storage solutions like tall units and corner systems",
          "Under-cabinet lighting for a premium and clean look",
        ],
      },
      {
        type: "paragraph",
        text: "At Vivid In2erio, we sign off appliance positions, services, and joinery in 3D before fabrication — so the kitchen you approve is the kitchen that arrives on site.",
      },
      {
        type: "paragraph",
        text: "A well-designed kitchen makes your entire home feel more refined and efficient. Book a studio consultation to review layouts, samples, and storage strategies tuned to how your household actually cooks.",
      },
    ],
    keywords: ["luxury modular kitchen", "premium kitchen design", "kitchen storage ideas"],
  },
  {
    slug: "architectural-planning-tips-luxury-home",
    title: "5 Architectural Planning Tips for a Modern Luxury Home",
    summary:
      "Planning principles for circulation, light, services, and proportion before interiors and procurement begin.",
    publishedAt: "2026-02-26",
    image: `${PORTFOLIO}/living-room-tv-feature-wall.png`,
    imageAlt: "Modern living room with architectural wood feature wall and integrated TV",
    lead:
      "Great architecture starts with smart planning. Before you begin construction, these essential tips will help you create a home that feels open, functional, and future-ready.",
    sections: [
      {
        type: "heading",
        text: "Top planning tips",
      },
      {
        type: "list",
        items: [
          "Prioritize natural light and ventilation for comfort and energy savings",
          "Design smart zoning — public vs private areas — for better flow",
          "Plan storage early to avoid clutter and improve usability",
          "Keep long-term flexibility for a growing family or changing needs",
          "Invest in elevation design to build strong premium presence",
        ],
      },
      {
        type: "paragraph",
        text: "A luxury home is not just about size — it is about how intelligently it is designed. Shell decisions on circulation, ceiling heights, and services should lock before interior procurement begins.",
      },
      {
        type: "paragraph",
        text: "Our studio pairs spatial planning with photoreal visualization so you can walk rooms, test light, and approve proportions before walls go up.",
      },
    ],
    keywords: ["luxury home planning", "architectural design tips", "residential zoning"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function blogPostHref(city: string, slug: string): string {
  return `/${city}/blog/${slug}`;
}
