import type { ServiceDashKind, ServiceId } from "@/lib/catalog/types";

/**
 * Canonical NAP — keep identical to Google Business Profile.
 * WhatsApp uses main line digits only.
 */
export const site = {
  name: "Sanchez Auto Services LLC",
  tagline:
    "Collision, paint & mechanical — insurance claims welcome. Paterson, NJ.",
  businessType: "Auto repair & body shop",
  /** In service since 1998 */
  foundedYear: 1998,
  phones: [
    { label: "Main line", tel: "+19736094586", display: "(973) 609-4586" },
    { label: "Alt line", tel: "+19732250400", display: "(973) 225-0400" },
  ],
  address: {
    line1: "99 E Railway Ave",
    city: "Paterson",
    state: "NJ",
    postalCode: "07503",
  },
  mapSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC+99+E+Railway+Ave+Paterson+NJ+07503",
  /** Google Business / Maps place (ChIJ from public listing). */
  googlePlaceId: "ChIJ41vYeyf8wokRWPDXF7m7A3c",
  /** Canonical GBP — Maps search API with place_id (most reliable open target). */
  googleBusinessUrl:
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC&query_place_id=ChIJ41vYeyf8wokRWPDXF7m7A3c",
  /** Public reviews list for this place. */
  googleReviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJ41vYeyf8wokRWPDXF7m7A3c",
  /** Direct “Write a review” flow. */
  googleWriteReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJ41vYeyf8wokRWPDXF7m7A3c",
  social: {
    facebook: "https://www.facebook.com/SanchezAutoService.LLC/",
    instagram: "https://www.instagram.com/francisco4704/",
  },
  /** WhatsApp Business — digits only; matches main line for GBP consistency. */
  whatsappPhone: "19736094586",
  googleRating: 4.8,
  googleReviewCount: 13,
  googleRatingSummary: "4.8-star average on Google Reviews (public listing).",
  logo: {
    src: "/logo-sanchez-auto-services.png",
    brandSrc: "/brand/sanchez-auto-services-logo.png",
    width: 1924,
    height: 1251,
    alt: "Sanchez Auto Services LLC",
  },
};

/**
 * SEO keywords — local + service + insurance intent.
 * Used in meta keywords, JSON-LD knowsAbout, and on-page “areas served” copy.
 * Primary ranking still comes from titles, H1s, NAP, and Google Business — not meta keywords alone.
 */
export const siteSeoKeywords = [
  // Brand
  "Sanchez Auto Services LLC",
  "Sanchez Auto Paterson",
  "Sanchez Auto Services Paterson NJ",
  // Core local
  "auto body shop Paterson NJ",
  "body shop Paterson NJ",
  "collision repair Paterson NJ",
  "auto repair Paterson NJ",
  "car accident repair Paterson",
  "99 E Railway Ave Paterson",
  "East Railway Ave auto shop",
  "Passaic County body shop",
  "auto body near Route 80",
  "body shop near me Paterson",
  // Insurance
  "insurance claim auto body Paterson",
  "insurance collision repair NJ",
  "work with insurance body shop Paterson",
  "free estimate body shop Paterson",
  "auto body Progressive GEICO State Farm NJ",
  "NJM auto body shop",
  // Services
  "auto paint shop Paterson NJ",
  "paint and refinishing Paterson",
  "bumper repair Paterson",
  "dent repair Paterson NJ",
  "frame straightening Paterson",
  "brake service Paterson NJ",
  "check engine light Paterson",
  "automotive diagnostics Paterson",
  "engine repair Paterson NJ",
  "transmission service Paterson",
  "suspension and alignment Paterson",
  "AC repair auto Paterson",
  "oil change Paterson NJ",
  // Fleet / commercial
  "fleet vehicle repair Paterson NJ",
  "commercial van repair Paterson",
  // Conversion / bilingual
  "WhatsApp auto body quote NJ",
  "WhatsApp auto repair quote",
  "taller de carrocería Paterson",
  "reparación de colisiones Paterson NJ",
  "cotización WhatsApp taller",
  // Nearby cities (local SEO)
  "body shop Clifton NJ",
  "collision repair Passaic NJ",
  "auto body Wayne NJ",
  "body shop Haledon NJ",
  "auto repair Totowa NJ",
  "family owned body shop Paterson",
] as const satisfies readonly string[];

/** Nearby areas for on-page local SEO (visible + structured data). */
export const areasServed = [
  "Paterson",
  "Clifton",
  "Passaic",
  "Wayne",
  "Haledon",
  "Prospect Park",
  "Totowa",
  "Elmwood Park",
  "Garfield",
  "Lodi",
  "Fair Lawn",
  "Hawthorne",
] as const;

/** Insurers commonly worked with — illustrative, not exclusive. */
export const trustedInsurers = [
  "Progressive",
  "GEICO",
  "State Farm",
  "Allstate",
  "Liberty Mutual",
  "NJM",
  "Travelers",
  "USAA",
  "Nationwide",
  "Farmers",
  "Plymouth Rock",
  "Selective",
  "Amica",
  "Erie",
] as const;

/**
 * Vehicle brands we commonly repair — local North Jersey priority
 * (Honda, MINI, BMW, Subaru + others drivers bring from nearby dealers).
 * Not manufacturer certification claims.
 */
export const trustedMakes = [
  "Honda",
  "MINI",
  "BMW",
  "Subaru",
  "Toyota",
  "Acura",
  "Mercedes",
  "Lexus",
  "Nissan",
  "Hyundai",
  "Kia",
  "Ford",
  "Chevy",
  "Jeep",
  "Volkswagen",
  "Audi",
] as const;

/** Brand logo paths under /public/partners (Simple Icons / local SVG). */
export const brandLogos: Record<string, string> = {
  Honda: "/partners/honda.svg",
  MINI: "/partners/mini.svg",
  BMW: "/partners/bmw.svg",
  Subaru: "/partners/subaru.svg",
  Toyota: "/partners/toyota.svg",
  Acura: "/partners/acura.svg",
  Mercedes: "/partners/mercedes.svg",
  Lexus: "/partners/lexus.svg",
  Nissan: "/partners/nissan.svg",
  Hyundai: "/partners/hyundai.svg",
  Kia: "/partners/kia.svg",
  Ford: "/partners/ford.svg",
  Chevy: "/partners/chevy.svg",
  Jeep: "/partners/jeep.svg",
  Volkswagen: "/partners/volkswagen.svg",
  Audi: "/partners/audi.svg",
};

export type LocalDealership = {
  brand: string;
  name: string;
  city: string;
  /** Display phone, e.g. (973) 777-1600 */
  phone: string;
  /** tel: href digits with +1 */
  tel: string;
  /** Dark logo (for light UI) */
  logo: string;
  /** White logo for dark photo cards */
  logoWhite: string;
  /** Storefront-style background for Network carousel cards */
  photo: string;
};

/** White brand marks for dark dealership photo cards */
export const brandLogosWhite: Record<string, string> = {
  Honda: "/partners/white-honda.svg",
  MINI: "/partners/white-mini.svg",
  BMW: "/partners/white-bmw.svg",
  Subaru: "/partners/white-subaru.svg",
  Toyota: "/partners/white-toyota.svg",
  Acura: "/partners/white-acura.svg",
  Mercedes: "/partners/white-mercedes.svg",
  Lexus: "/partners/white-lexus.svg",
  Nissan: "/partners/white-nissan.svg",
  Hyundai: "/partners/white-hyundai.svg",
  Kia: "/partners/white-kia.svg",
  Ford: "/partners/white-ford.svg",
  Chevy: "/partners/white-chevy.svg",
  Jeep: "/partners/white-jeep.svg",
  Volkswagen: "/partners/white-volkswagen.svg",
  Audi: "/partners/white-audi.svg",
};

/**
 * Franchise / brand dealerships near Paterson, NJ.
 * Network-style photo carousel — logos + phones + storefront cards.
 * Not exclusive partnerships or factory certifications.
 */
/**
 * Each card photo is a car of that brand (not a random stock photo).
 * Paths under /public/partners/dealers/brands/
 */
export const localDealerships: readonly LocalDealership[] = [
  {
    brand: "Honda",
    name: "Garden State Honda",
    city: "Clifton",
    phone: "(973) 777-1600",
    tel: "tel:+19737771600",
    logo: brandLogos.Honda,
    logoWhite: brandLogosWhite.Honda,
    photo: "/partners/dealers/brands/honda.jpg", // Honda CR-V
  },
  {
    brand: "MINI",
    name: "MINI of Ramsey",
    city: "Ramsey",
    phone: "(201) 669-3370",
    tel: "tel:+12016693370",
    logo: brandLogos.MINI,
    logoWhite: brandLogosWhite.MINI,
    photo: "/partners/dealers/brands/mini.jpg", // MINI Cooper S
  },
  {
    brand: "BMW",
    name: "BMW of Ramsey",
    city: "Ramsey",
    phone: "(201) 669-3248",
    tel: "tel:+12016693248",
    logo: brandLogos.BMW,
    logoWhite: brandLogosWhite.BMW,
    photo: "/partners/dealers/brands/bmw.jpg", // BMW M5
  },
  {
    brand: "Subaru",
    name: "Wayne Subaru",
    city: "Pompton Plains",
    phone: "(973) 835-4700",
    tel: "tel:+19738354700",
    logo: brandLogos.Subaru,
    logoWhite: brandLogosWhite.Subaru,
    photo: "/partners/dealers/brands/subaru.jpg", // Subaru Outback
  },
  {
    brand: "Subaru",
    name: "Ramsey Subaru",
    city: "Ramsey",
    phone: "(201) 327-0070",
    tel: "tel:+12013270070",
    logo: brandLogos.Subaru,
    logoWhite: brandLogosWhite.Subaru,
    photo: "/partners/dealers/brands/subaru2.jpg", // Subaru WRX STI
  },
  {
    brand: "BMW",
    name: "Paul Miller BMW",
    city: "Wayne",
    phone: "(973) 696-6060",
    tel: "tel:+19736966060",
    logo: brandLogos.BMW,
    logoWhite: brandLogosWhite.BMW,
    photo: "/partners/dealers/brands/bmw2.jpg", // BMW M4
  },
  {
    brand: "Toyota",
    name: "Toyota of Hackensack",
    city: "Hackensack",
    phone: "(201) 546-5053",
    tel: "tel:+12015465053",
    logo: brandLogos.Toyota,
    logoWhite: brandLogosWhite.Toyota,
    photo: "/partners/dealers/brands/toyota.jpg", // Toyota Corolla
  },
  {
    brand: "Mercedes",
    name: "Mercedes-Benz of Wayne",
    city: "Wayne",
    phone: "(973) 256-9200",
    tel: "tel:+19732569200",
    logo: brandLogos.Mercedes,
    logoWhite: brandLogosWhite.Mercedes,
    photo: "/partners/dealers/brands/mercedes.jpg", // Mercedes-AMG GT
  },
  {
    brand: "Acura",
    name: "Acura of Ramsey",
    city: "Ramsey",
    phone: "(201) 825-9000",
    tel: "tel:+12018259000",
    logo: brandLogos.Acura,
    logoWhite: brandLogosWhite.Acura,
    photo: "/partners/dealers/brands/acura.jpg", // Acura TLX
  },
  {
    brand: "Audi",
    name: "Audi Meadowlands",
    city: "Little Ferry",
    phone: "(201) 843-8100",
    tel: "tel:+12018438100",
    logo: brandLogos.Audi,
    logoWhite: brandLogosWhite.Audi,
    photo: "/partners/dealers/brands/audi.jpg", // Audi R8
  },
  {
    brand: "Jeep",
    name: "Chrysler Jeep of Totowa",
    city: "Totowa",
    phone: "(973) 785-1111",
    tel: "tel:+19737851111",
    logo: brandLogos.Jeep,
    logoWhite: brandLogosWhite.Jeep,
    photo: "/partners/dealers/brands/jeep.jpg", // Jeep Wrangler
  },
  {
    brand: "Nissan",
    name: "Nissan of Clifton",
    city: "Clifton",
    phone: "(973) 777-3500",
    tel: "tel:+19737773500",
    logo: brandLogos.Nissan,
    logoWhite: brandLogosWhite.Nissan,
    photo: "/partners/dealers/brands/nissan.jpg",
  },
  {
    brand: "Ford",
    name: "All American Ford of Paramus",
    city: "Paramus",
    phone: "(201) 262-7300",
    tel: "tel:+12012627300",
    logo: brandLogos.Ford,
    logoWhite: brandLogosWhite.Ford,
    photo: "/partners/dealers/brands/ford.jpg",
  },
  {
    brand: "Chevy",
    name: "Paul Miller Chevrolet",
    city: "Parsippany",
    phone: "(973) 575-1600",
    tel: "tel:+19735751600",
    logo: brandLogos.Chevy,
    logoWhite: brandLogosWhite.Chevy,
    photo: "/partners/dealers/brands/chevy.jpg",
  },
  {
    brand: "Hyundai",
    name: "Hyundai of Englewood",
    city: "Englewood",
    phone: "(201) 567-7200",
    tel: "tel:+12015677200",
    logo: brandLogos.Hyundai,
    logoWhite: brandLogosWhite.Hyundai,
    photo: "/partners/dealers/brands/hyundai.jpg",
  },
  {
    brand: "Kia",
    name: "Kia of Totowa",
    city: "Totowa",
    phone: "(973) 785-2900",
    tel: "tel:+19737852900",
    logo: brandLogos.Kia,
    logoWhite: brandLogosWhite.Kia,
    photo: "/partners/dealers/brands/kia.jpg",
  },
  {
    brand: "Volkswagen",
    name: "Volkswagen of Freehold",
    city: "N. Jersey",
    phone: "(732) 462-6060",
    tel: "tel:+17324626060",
    logo: brandLogos.Volkswagen,
    logoWhite: brandLogosWhite.Volkswagen,
    photo: "/partners/dealers/brands/volkswagen.jpg",
  },
  {
    brand: "Lexus",
    name: "Lexus of Route 10",
    city: "Whippany",
    phone: "(973) 560-9000",
    tel: "tel:+19735609000",
    logo: brandLogos.Lexus,
    logoWhite: brandLogosWhite.Lexus,
    photo: "/partners/dealers/brands/lexus.jpg",
  },
] as const;

/** Google Maps turn-by-turn directions to the shop (address + place_id). */
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
)}&destination_place_id=${site.googlePlaceId}`;

export const schedule = [
  { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 6:00 PM" },
  { days: "Sunday", hours: "Call ahead — hours may vary" },
];

export type SiteService = {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
  dashIndicator?: ServiceDashKind | null;
};

export const services: SiteService[] = [
  {
    id: "collision",
    title: "Collision & Body Repair",
    description:
      "Expert structural and panel repair after accidents. We restore your vehicle's factory geometry, safety integrity, and appearance.",
    icon: "car-front",
    dashIndicator: "airbag_srs",
  },
  {
    id: "paint",
    title: "Paint & Refinishing",
    description:
      "Full automotive painting from touch-ups to complete respray. Precise color matching and professional prep for a flawless, lasting finish.",
    icon: "paintbrush",
  },
  {
    id: "engine",
    title: "Engine Repair & Rebuilds",
    description:
      "Diagnosis, repair, and full engine rebuilds for all makes and models. From head gaskets to complete overhauls — we fix it right.",
    icon: "cog",
    dashIndicator: "oil_pressure",
  },
  {
    id: "mechanics",
    title: "General Mechanics",
    description:
      "Comprehensive mechanical services: belts, hoses, cooling systems, exhaust, and everything that keeps your car running safely.",
    icon: "wrench",
  },
  {
    id: "brakes",
    title: "Brake Service",
    description:
      "Pads, rotors, calipers, brake lines, and fluid flushes. We ensure your stopping power is always reliable and safe.",
    icon: "circle-stop",
    dashIndicator: "brake_warning",
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Check Engine",
    description:
      "Advanced OBD scanning and system diagnostics. We read codes, test components, and give you clear answers — not guesses.",
    icon: "scan-line",
    dashIndicator: "check_engine",
  },
  {
    id: "transmission",
    title: "Transmission Service",
    description:
      "Fluid changes, filter replacements, adjustments, and full transmission rebuilds for both automatic and manual vehicles.",
    icon: "gauge",
    dashIndicator: "transmission_temp",
  },
  {
    id: "oil",
    title: "Oil Changes & Maintenance",
    description:
      "Conventional, synthetic, and high-mileage oil changes. We also handle filter replacements and routine maintenance schedules.",
    icon: "droplets",
    dashIndicator: "maintenance",
  },
  {
    id: "suspension",
    title: "Suspension & Steering",
    description:
      "Shocks, struts, ball joints, tie rods, and wheel alignments. Restore your ride quality and keep your tires wearing evenly.",
    icon: "arrow-up-down",
  },
  {
    id: "electrical",
    title: "Electrical Systems",
    description:
      "Battery testing and replacement, alternators, starters, wiring, and electrical diagnostics for all modern vehicle systems.",
    icon: "zap",
    dashIndicator: "battery_charge",
  },
  {
    id: "ac",
    title: "A/C & Heating",
    description:
      "Recharge, leak detection, compressor replacement, and heater core repairs. Stay comfortable all year round.",
    icon: "wind",
  },
  {
    id: "tires",
    title: "Tires & Wheels",
    description:
      "Tire mounting, balancing, rotation, and pressure checks. We'll help you find the right tires for your vehicle and budget.",
    icon: "circle-dot",
    dashIndicator: "tpms",
  },
];

export const whyUs = [
  {
    title: "Family-Owned & Operated",
    description:
      "We treat every car like it belongs to family. Honest assessments, no unnecessary upsells.",
  },
  {
    title: "All Makes & Models",
    description:
      "Domestic, import, luxury — our experienced technicians work on everything that rolls in.",
  },
  {
    title: "Quality Parts & Materials",
    description:
      "We use quality OEM and aftermarket parts backed by manufacturer warranties on every repair.",
  },
  {
    title: "Transparent Pricing",
    description:
      "You'll know the cost before we start. No surprise charges, no hidden fees.",
  },
  {
    title: "Fast Turnaround",
    description:
      "We respect your time. Most repairs are completed on schedule, often the same or next day.",
  },
  {
    title: "4.8-Star Rated",
    description:
      "Hundreds of satisfied customers in Paterson and the surrounding area trust us with their vehicles.",
  },
];

export const testimonials = [
  {
    name: "Maria G.",
    location: "Paterson, NJ",
    stars: 5,
    quote:
      "Amazing work on my car after the accident. The paint match was perfect and it came back looking brand new. Highly recommend!",
  },
  {
    name: "Carlos R.",
    location: "Clifton, NJ",
    stars: 5,
    quote:
      "Took my truck in for engine trouble nobody else could figure out. They diagnosed it fast and the repair price was very fair.",
  },
  {
    name: "Jasmine T.",
    location: "Paterson, NJ",
    stars: 5,
    quote:
      "Best auto shop in Paterson hands down. Honest, fast, and they always explain what they're doing. I won't go anywhere else.",
  },
];

export function formatAddressInline() {
  const { address } = site;
  return `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}`;
}
