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
      "Collision, paint refinishing, and mechanical—all under one roof at 101 E Railway Ave.",
    ],
  },
  process: {
    title: "A simple repair experience",
    lead: "We keep paperwork and surprises to a minimum so you’re never guessing what happens next.",
    steps: [
      {
        title: "Check-in",
        body: "We listen, photograph damage when needed, and note your priorities (timeline, deductible, OEM vs aftermarket preferences).",
      },
      {
        title: "Assess & estimate",
        body: "We inspect, diagnose, and walk you through a clear estimate before we authorize labor or parts ordering.",
      },
      {
        title: "Repair & refinish",
        body: "Body, paint, and mechanical teams coordinate so your vehicle spends less time parked and more time done right.",
      },
      {
        title: "Quality check & pickup",
        body: "We verify fit, finish, and function with you—or share photos if you can’t swing by until later.",
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
    },
    paint: {
      title: "Paint & refinishing",
      description:
        "Tri-stage and single-stage coatings, feathered blend panels, bumper respray, correction, chip repair, and clear-coat leveling with controlled booth prep.",
    },
    engine: {
      title: "Engine repair & rebuilds",
      description:
        "Compression tests, gasket jobs, cylinder head service, timing systems, turbo/diesel basics, and full rebuild planning when longevity demands it.",
    },
    mechanics: {
      title: "General mechanical",
      description:
        "Accessory belts, hoses, cooling systems, exhaust repairs, mounts, fluids, inspections, and preventative maintenance queues.",
    },
    brakes: {
      title: "Brake systems",
      description:
        "Pads/shoes, rotors/drums, calipers, hydraulics, ABS diagnostics, machining when appropriate, brake fluid exchanges.",
    },
    diagnostics: {
      title: "Diagnostics & check-engine",
      description:
        "OBD-II deep dives, oscilloscope leads when needed, software/calibration support, documenting proof for warranty or resale.",
    },
    transmission: {
      title: "Transmission service",
      description:
        "Fluid/filter services, linkage adjustments, valve body concerns, clutch hydraulics, and rebuilt units coordinated with specialty partners.",
    },
    oil: {
      title: "Oil changes & upkeep",
      description:
        "Conventional, synthetic blend, full synthetic schedules, cartridges, magnets, preventive inspections tied to mileage.",
    },
    suspension: {
      title: "Suspension & steering",
      description:
        "Struts/shocks, control arms, bushings, ball joints, inner/outer ties, racks, hubs, geometry corrections via partner alignments.",
    },
    electrical: {
      title: "Electrical systems",
      description:
        "Charging diagnostics, starters, grounding issues, fused circuits, BCM quirks, aftermarket accessory integration troubleshooting.",
    },
    ac: {
      title: "HVAC climate",
      description:
        "R-134a/R-1234yf readiness, evacuation/recharge with leak sniffers, compressor and HVAC box access work.",
    },
    tires: {
      title: "Tires & wheels",
      description:
        "Mount/balance/rotate, pressure sensors, pothole bends evaluated, sourcing recommendations when supply tight.",
    },
  },
  testimonials: {
    title: "What neighbors say",
    googleNote: "~4.8★ average reflects public Google Reviews—figures shift as new reviews arrive.",
    mapsGalleryNote:
      "Next: optional Google Places photo & review excerpts once you authorize the nightly sync script (keeps attribution honest).",
    samples: [
      {
        name: "Maria G.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Paint match looked factory after sideswipe damage. Estimate matched final bill and they communicated every supplement.",
      },
      {
        name: "Carlos R.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Intermittent misfire stumped two shops—their diag path was logical and invoices showed the parts swapped step-by-step.",
      },
      {
        name: "Jasmine T.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Straightforward timeline on brakes + suspension noise. Respect how they document photos for insurance filings.",
      },
    ],
  },
  hours: {
    title: "Hours & location",
    mapHeading: "Map",
    directionsLink: "Open directions in Google Maps",
    sundayNote: "Sunday hours vary across directories—please call ahead so front desk sets expectations.",
  },
  scheduleRows: [
    ["Monday – Friday", "9:00 AM – 6:00 PM"],
    ["Saturday", "9:00 AM – 6:00 PM"],
    ["Sunday", "Call ahead — hours may vary"],
  ],
  quote: {
    title: "Request a quote",
    lead: "SMS-friendly summary is fine—we’ll follow up by phone.",
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
    vehicleOptional: "Vehicle (optional)",
    message: "What’s going on?",
    submit: "Submit request",
    selectPlaceholder: "Select…",
    noEndpointLead:
      "Point this form at Formspree, Web3Forms, or Turnstile + email relay—whatever fits your inbox workflow.",
    noEndpointFormspreeHint:
      "Set NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your_id (or equivalent) before deploy.",
    noEndpointPhoneCue: "Prefer the phone?",
  },
  faq: {
    title: "Quick answers",
    lead: "Save a phone call—these cover what Paterson shoppers ask weekly.",
    items: [
      {
        question: "Do you work directly with insurance on collision?",
        answer:
          "Yes. Bring your claim adjuster paperwork and photos—we coordinate supplements and keep you apprised.",
      },
      {
        question: "Can you source OEM versus aftermarket?",
        answer:
          "Absolutely. Different deductibles demand different budgets; we outline trade-offs clearly per line item.",
      },
      {
        question: "Need a shuttle or tow recommendation?",
        answer:
          "We maintain local partner lists for rollback tows plus rental counters—tell us urgency and borough.",
      },
      {
        question: "Spanish-speaking staff?",
        answer:
          "Toggle ES in the corner for key UI chrome; bilingual staff varies by shift—calling ahead confirms coverage.",
      },
      {
        question: "Payments accepted?",
        answer:
          "Major cards, cash, and certified checks commonly—call ahead for fleet PO / split-pay edge cases.",
      },
      {
        question: "Warranty coverage?",
        answer:
          "Parts carry manufacturer warranties; labor policies depend on repair type—we document both on the invoice.",
      },
    ],
  },
  footer: {
    connected: "Stay connected",
    facebook: "Facebook",
    directions: "Directions (Google Maps)",
    legalNote: "© {year} {name}. Serving Paterson & nearby New Jersey communities.",
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
