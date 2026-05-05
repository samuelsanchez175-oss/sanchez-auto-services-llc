export const site = {
  name: "Sanchez Auto Services LLC",
  tagline: "Collision repair, mechanical maintenance, and refinishing — Paterson, NJ.",
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
    "https://www.google.com/maps/search/?api=1&query=101+E+Railway+Ave+Paterson+NJ+07503",
  social: {
    facebook: "https://www.facebook.com/SanchezAutoService.LLC/",
  },
  googleRatingSummary: "~4.8-star average on Google Reviews (public listing).",
};

export const schedule = [
  { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 6:00 PM" },
  { days: "Sunday", hours: "Call ahead — hours may vary" },
];

export const services = [
  {
    id: "collision",
    title: "Collision & Body Repair",
    description:
      "Expert structural and panel repair after accidents. We restore your vehicle's factory geometry, safety integrity, and appearance.",
    icon: "car-front",
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
  },
  {
    id: "diagnostics",
    title: "Diagnostics & Check Engine",
    description:
      "Advanced OBD scanning and system diagnostics. We read codes, test components, and give you clear answers — not guesses.",
    icon: "scan-line",
  },
  {
    id: "transmission",
    title: "Transmission Service",
    description:
      "Fluid changes, filter replacements, adjustments, and full transmission rebuilds for both automatic and manual vehicles.",
    icon: "gauge",
  },
  {
    id: "oil",
    title: "Oil Changes & Maintenance",
    description:
      "Conventional, synthetic, and high-mileage oil changes. We also handle filter replacements and routine maintenance schedules.",
    icon: "droplets",
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
