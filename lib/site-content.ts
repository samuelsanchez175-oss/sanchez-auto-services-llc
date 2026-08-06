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
  phones: [
    { label: "Main line", tel: "+19736094586", display: "(973) 609-4586" },
    { label: "Alt line", tel: "+19732250400", display: "(973) 225-0400" },
  ],
  address: {
    line1: "101 E Railway Ave",
    city: "Paterson",
    state: "NJ",
    postalCode: "07503",
  },
  mapSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC+101+E+Railway+Ave+Paterson+NJ+07503",
  googleBusinessUrl:
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC+101+E+Railway+Ave+Paterson+NJ+07503",
  social: {
    facebook: "https://www.facebook.com/SanchezAutoService.LLC/",
  },
  /** WhatsApp Business — digits only; matches main line for GBP consistency. */
  whatsappPhone: "19736094586",
  googleRatingSummary: "~4.8-star average on Google Reviews (public listing).",
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
  "101 E Railway Ave Paterson",
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

/** Google Maps turn-by-turn directions to the shop (single source: `site.address`). */
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
)}`;

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
