import type { Catalog } from "@/lib/catalog/types";

export const enCatalog: Catalog = {
  locale: "en",
  htmlLang: "en-US",
  brand: {
    wordmarkPrimary: "SANCHEZ AUTO",
    wordmarkSecondary: "Services LLC · Paterson, NJ",
  },
  nav: {
    services: "Services",
    whyUs: "Why us",
    reviews: "Reviews",
    hours: "Hours & location",
    quote: "Get a quote",
    faq: "FAQ",
    directions: "Directions",
    pagesServices: "Services",
    privacy: "Privacy",
    terms: "Terms",
    homeAria: "Sanchez Auto Services LLC — home",
  },
  language: {
    enShort: "EN",
    esShort: "ES",
    label: "Language",
  },
  hero: {
    kickerLine: "AUTO REPAIR & BODY SHOP — PATERSON, NJ",
    headlineLead: "Honest Work.",
    headlineAccentLine1: "Quality Results.",
    headlineTail: "Every Time.",
    subheadline:
      "From paint and collision work to engine repair, diagnostics, and everyday maintenance—we’re the Paterson-area shop neighbors trust for clarity, fair estimates, and careful craftsmanship.",
    callPrimary: "Call",
    viewServices: "View services",
    starsLabel: "4.8 on Google",
  },
  trustStrip: {
    title: "Why drivers choose us first",
    bullets: [
      "Written estimates explained in plain English before major work begins.",
      "Quality parts and workmanship—talk to us about warranty coverage where it applies.",
      "Collision, paint refinishing, and mechanical—all under one roof at 99 E Railway Ave.",
    ],
  },
  process: {
    title: "From claim to keys — a clear path",
    lead: "Insurance claims welcome. We document damage, explain the estimate, and keep you (and your adjuster) in the loop.",
    steps: [
      {
        title: "Send claim details",
        body: "WhatsApp us photos, claim number if you have it, and year/make/model. We start a shop-ready file before you even drop off.",
      },
      {
        title: "Inspect & estimate",
        body: "We inspect thoroughly, write a clear estimate, and support supplements when hidden damage shows up—straight talk on deductible and options.",
      },
      {
        title: "Repair & refinish",
        body: "Collision, paint, and mechanical work under one roof so your claim stays coordinated and your car spends less time waiting.",
      },
      {
        title: "Quality check & pickup",
        body: "We review fit, finish, and function with you. Photos available if you need updates for insurance or your schedule.",
      },
    ],
  },
  whyUs: {
    title: "Built for neighbors, not quotas",
    lead:
      "You’ll see familiar faces behind the bays. Straight answers matter—especially when insurance timelines and deductible math are involved.",
    cards: [
      {
        title: "Family-owned tone",
        description: "Straight talk, practical options, and no mystery line items.",
      },
      {
        title: "All common makes/models",
        description: "Domestic, Asian, European—bring what you drive; we maintain modern diagnostic tooling.",
      },
      {
        title: "Parts that match the job",
        description: "OEM, OE-supplier, and vetted aftermarket—aligned to how you plan to keep the vehicle.",
      },
      {
        title: "Collision + mechanical",
        description: "One shop for cosmetic and mechanical work keeps schedules simpler.",
      },
      {
        title: "Timing you can plan around",
        description: "We’ll give realistic windows and call proactively if supplemental damage appears.",
      },
      {
        title: "Highly rated locally",
        description: "Thousands of Northeast drivers weigh in on Maps—reviews stay on Google where they belong.",
      },
    ],
  },
  services: {
    title: "Services",
    leadTemplate:
      "{name} blends structural body repair, refinishing, and full mechanical capabilities—everything from preventive maintenance to major component work.",
  },
  serviceCopy: {
    collision: {
      title: "Collision & body repair",
      description:
        "Structural pulls, outer panel replacement, bumper and fascia work, corrosion protection, and unibody alignment—we focus on restoring safe geometry.",
      whenToService:
        "After an impact—misaligned panels or gaps by doors, airbag light, or you need a written estimate before the insurer approves repairs.",
    },
    paint: {
      title: "Paint & refinishing",
      description:
        "Tri-stage and single-stage coatings, feathered blend panels, bumper respray, correction, chip repair, and clear-coat leveling with controlled booth prep.",
      whenToService:
        "Clear coat peeling, deep scratches, faded panels, or a repaired area where color no longer matches—customers usually want a blend or respray.",
    },
    engine: {
      title: "Engine repair & rebuilds",
      description:
        "Compression tests, gasket jobs, cylinder head service, timing systems, turbo/diesel basics, and full rebuild planning when longevity demands it.",
      whenToService:
        "Knocking or ticking, smoke, overheating, big power loss, or oil consumption—often after deferred maintenance or very high miles.",
    },
    mechanics: {
      title: "General mechanical",
      description:
        "Accessory belts, hoses, cooling systems, exhaust repairs, mounts, fluids, inspections, and preventative maintenance queues.",
      whenToService:
        "Coolant or oil leaks, burning smells, loud exhaust, squealing belts, or vague drivability issues between scheduled visits.",
    },
    brakes: {
      title: "Brake systems",
      description:
        "Pads/shoes, rotors/drums, calipers, hydraulics, ABS diagnostics, machining when appropriate, brake fluid exchanges.",
      whenToService:
        "Spongy pedal, grind or squeal, pull when stopping, pulsation in the pedal, or a brake warning lamp that will not clear.",
    },
    diagnostics: {
      title: "Diagnostics & check-engine",
      description:
        "OBD-II deep dives, oscilloscope leads when needed, software/calibration support, documenting proof for warranty or resale.",
      whenToService:
        "Check-engine or other warnings, rough idle, stalling, failed inspection, or fault codes that return after parts were already replaced.",
    },
    transmission: {
      title: "Transmission service",
      description:
        "Fluid/filter services, linkage adjustments, valve body concerns, clutch hydraulics, and rebuilt units coordinated with specialty partners.",
      whenToService:
        "Slipping, harsh shifts, delayed engagement, burnt-smelling fluid, or red drips under the middle of the vehicle.",
    },
    oil: {
      title: "Oil changes & upkeep",
      description:
        "Conventional, synthetic blend, full synthetic schedules, cartridges, magnets, preventive inspections tied to mileage.",
      whenToService:
        "Overdue by sticker or mileage, very dark gritty oil on the dipstick, top-end noise on cold start, or prep before a long trip.",
    },
    suspension: {
      title: "Suspension & steering",
      description:
        "Struts/shocks, control arms, bushings, ball joints, inner/outer ties, racks, hubs, geometry corrections via partner alignments.",
      whenToService:
        "Clunks over bumps, uneven tire wear, wandering steering, or one corner sitting low after a pothole or curb hit.",
    },
    electrical: {
      title: "Electrical systems",
      description:
        "Charging diagnostics, starters, grounding issues, fused circuits, BCM quirks, aftermarket accessory integration troubleshooting.",
      whenToService:
        "Slow cranking, dim lights, dead mornings, random warning lights, or accessories that only work sometimes.",
    },
    ac: {
      title: "HVAC climate",
      description:
        "R-134a/R-1234yf readiness, evacuation/recharge with leak sniffers, compressor and HVAC box access work.",
      whenToService:
        "Weak cooling, heat when you want A/C, long defrost times in winter, or musty smell whenever the blower runs.",
    },
    tires: {
      title: "Tires & wheels",
      description:
        "Mount/balance/rotate, pressure sensors, pothole bends evaluated, sourcing recommendations when supply tight.",
      whenToService:
        "Low tread, sidewall damage, vibration at speed, TPMS warning, or seasonal swap plus mount and balance.",
    },
  },
  testimonials: {
    title: "What neighbors say",
    googleNote:
      "4.8★ average on Google. Sample quotes below reflect common local feedback — full attributed reviews live on Google Business.",
    mapsGalleryNote:
      "Link out to Google Business for attributed reviews; optional Places API sync keeps photos honest.",
    samples: [
      {
        name: "Sofia L.",
        location: "Totowa, NJ",
        stars: 5,
        quote:
          "I had a great experience at Sanchez Auto Services body shop. The team was professional, honest, and fast. They took great care of my car and the results were outstanding.",
      },
      {
        name: "Jonathan H.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Brought my car in after a side hit — body work and paint look factory. Fair price and they kept me updated the whole time.",
      },
      {
        name: "Maria G.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Paint match looked factory after sideswipe damage. Estimate matched final bill and they communicated every insurance supplement.",
      },
      {
        name: "Winston O.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Solid shop. Fixed my brakes and alignment same day. No upsell games — just told me what I needed.",
      },
      {
        name: "Carlos R.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Intermittent misfire stumped two shops — their diagnostic path was logical and the invoice showed every part swapped step-by-step.",
      },
      {
        name: "Robert R.",
        location: "Passaic, NJ",
        stars: 5,
        quote:
          "Insurance claim was a headache until this shop took over. Photos, estimate, and repair all lined up. Highly recommend.",
      },
    ],
  },
  hours: {
    title: "Hours & location",
    mapHeading: "Map",
    directionsLink: "Open directions in Google Maps",
    sundayNote:
      "Sunday hours vary — always call or WhatsApp ahead before you drive over. We do not guarantee Sunday staffing.",
  },
  scheduleRows: [
    ["Monday – Friday", "9:00 AM – 6:00 PM"],
    ["Saturday", "9:00 AM – 6:00 PM"],
    ["Sunday", "Call ahead — hours may vary"],
  ],
  quote: {
    title: "Request a quote",
    lead: "Tell us the car and the problem — we open WhatsApp with a structured message the shop can act on fast.",
    name: "Name",
    phone: "Phone",
    emailOptional: "Email (optional)",
    serviceNeeded: "Service needed",
    serviceOptions: [
      { value: "collision", label: "Collision repair / structural" },
      { value: "maintenance", label: "Maintenance (oil, brakes, tune‑up)" },
      { value: "diagnostics", label: "Diagnostics / check‑engine" },
      { value: "paint", label: "Paint / refinishing" },
      { value: "other", label: "Other / not sure" },
    ],
    vehicleOptional: "Vehicle (year / make / model)",
    message: "What’s going on?",
    submit: "Open WhatsApp with this quote",
    selectPlaceholder: "Select…",
    noEndpointLead:
      "Quotes go straight to the shop WhatsApp with client, vehicle, and issue fields filled in.",
    noEndpointFormspreeHint:
      "No email form endpoint required — WhatsApp is the lead channel.",
    noEndpointPhoneCue: "Prefer the phone?",
  },
  faq: {
    title: "Quick answers",
    lead: "Common questions from Paterson drivers before they message us on WhatsApp.",
    items: [
      {
        question: "Do you work with all insurance companies?",
        answer:
          "Yes — all major insurers are welcome. You don’t need a “preferred shop” assignment to get a quote. Send claim #, photos, and vehicle info on WhatsApp and we help with adjuster coordination.",
      },
      {
        question: "How do WhatsApp quotes work?",
        answer:
          "Fill name, phone, year/make/model, issue, and optional claim details. WhatsApp opens with a structured shop message — tap Send, then attach 3–6 photos in the chat.",
      },
      {
        question: "What photos should I send for a claim?",
        answer:
          "All four corners of the vehicle, close-ups of each damage area, and the dashboard if any lights are on. More angles = better first estimate.",
      },
      {
        question: "Can you source OEM vs aftermarket parts?",
        answer:
          "Yes. We outline options against your deductible, timeline, and how long you plan to keep the vehicle — no mystery line items.",
      },
      {
        question: "How fast can I drop the car off?",
        answer:
          "Message us first with photos. Same-week slots are common; rush jobs depend on bay availability and parts. Sunday hours vary — call or WhatsApp ahead.",
      },
      {
        question: "Spanish-speaking staff?",
        answer:
          "Use the ES toggle on the site. Bilingual help is often available — mention Spanish on WhatsApp and we’ll match who can help.",
      },
      {
        question: "Fleet or commercial vans?",
        answer:
          "Yes — light fleet and commercial work is welcome. Send unit details on WhatsApp and ask for fleet timing.",
      },
      {
        question: "What payments do you accept?",
        answer:
          "Major cards, cash, and certified checks are common. Call ahead for fleet POs or split-pay situations.",
      },
    ],
  },
  footer: {
    connected: "Stay connected",
    facebook: "Facebook",
    directions: "Directions (Google Maps)",
    legalNote: "© {year} {name}. Serving Paterson & nearby New Jersey communities.",
    servicesBrowseAria:
      "View the full services page — general mechanics, collision and body repair, paint, engine, brakes, diagnostics, and more.",
    stickyWhatsApp: "Chat with us on WhatsApp",
    stickyWhatsAppAria: "Open WhatsApp chat",
  },
  servicesPage: {
    title: "Full service catalog",
    intro:
      "Same bays that handle collision/refinish tackle everyday mechanical—scroll to understand scope, then dial or send the quote form with photos.",
    backHome: "Back to homepage",
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated May 2026",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Sanchez Auto Services LLC respects your privacy. This site is informational unless you voluntarily submit forms or emails.",
          "This document supplements—rather than replaces—Google’s requirements when Places API-derived media is surfaced.",
        ],
      },
      {
        heading: "Contact & form submissions",
        paragraphs: [
          "Quote requests relay through whichever processor you configure (Formspree, Web3Forms, etc.). Inspect their privacy posture separately.",
          "We store only business messages needed to fulfill repair scheduling and invoicing workflows.",
        ],
      },
      {
        heading: "Analytics & telemetry",
        paragraphs: [
          "No trackers ship by default. If analytics are added later, this section will cite providers and retention windows expressly.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "New Jersey consumers may inquire about retained personal records—email or call either published line referencing this policy.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    updated: "Last updated May 2026",
    sections: [
      {
        heading: "Estimates & invoicing",
        paragraphs: [
          "Written estimates are good-faith forecasts. Additional damage, parts delays, supply-chain shortages, or insurance supplements may revise totals—we communicate before proceeding.",
        ],
      },
      {
        heading: "Payments & lien",
        paragraphs: [
          "All work remains property of the shop until balances clear unless otherwise dictated by lien filings permitted under NJ statutes.",
        ],
      },
      {
        heading: "Limitation",
        paragraphs: [
          "Site contents are descriptive only—not a warranty promise. Operational decisions stay between you and the service writer at check-in.",
        ],
      },
    ],
  },
  mapsSync: {
    title: "Photos & Maps review snippets",
    body:
      "Scraping Google Maps HTML violates Google’s Terms. Pull listing photos/review excerpts with Places API (New) using a server-side key, then rerun `npm run build`.",
    steps:
      '# 1) Enable "Places API (New)" + billing\n# 2) From project root:\nGOOGLE_PLACES_API_KEY=YOUR_KEY_HERE npm run gallery:pull\n# Optional exact listing:\n# GOOGLE_PLACE_ID="ChIJxxxxxxxx" npm run gallery:pull\nnpm run build',
    attribution:
      "When Places returns photographer attributions they must remain visible beside each image.",
  },
};
