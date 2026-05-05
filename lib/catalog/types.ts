/** Service identifiers — must mirror `services[].id` in `lib/site-content.ts`. */
export type ServiceId =
  | "collision"
  | "paint"
  | "engine"
  | "mechanics"
  | "brakes"
  | "diagnostics"
  | "transmission"
  | "oil"
  | "suspension"
  | "electrical"
  | "ac"
  | "tires";

export type Locale = "en" | "es";

export type FAQItem = {
  question: string;
  answer: string;
};

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type Catalog = {
  locale: Locale;
  /** html lang hint */
  htmlLang: string;
  brand: {
    wordmarkPrimary: string;
    wordmarkSecondary: string;
  };
  nav: {
    services: string;
    whyUs: string;
    reviews: string;
    hours: string;
    quote: string;
    faq: string;
    pagesServices: string;
    privacy: string;
    terms: string;
    homeAria: string;
  };
  language: {
    enShort: string;
    esShort: string;
    label: string;
  };
  hero: {
    kickerLine: string;
    headlineLead: string;
    headlineAccentLine1: string;
    headlineTail: string;
    subheadline: string;
    callPrimary: string;
    viewServices: string;
    starsLabel: string;
  };
  trustStrip: {
    title: string;
    bullets: string[];
  };
  process: {
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
  };
  whyUs: {
    title: string;
    lead: string;
    cards: { title: string; description: string }[];
  };
  services: {
    title: string;
    leadTemplate: string; // `{name}` replaced with site.name
  };
  serviceCopy: Record<ServiceId, { title: string; description: string }>;
  testimonials: {
    title: string;
    googleNote: string;
    mapsGalleryNote: string;
    samples: {
      name: string;
      location: string;
      stars: number;
      quote: string;
    }[];
  };
  hours: {
    title: string;
    mapHeading: string;
    directionsLink: string;
    sundayNote: string;
  };
  scheduleRows: [label: string, hours: string][];
  quote: {
    title: string;
    lead: string;
    name: string;
    phone: string;
    emailOptional: string;
    serviceNeeded: string;
    /** Stable machine values persist to email/backend; labels localize per locale. */
    serviceOptions: { value: string; label: string }[];
    vehicleOptional: string;
    message: string;
    submit: string;
    selectPlaceholder: string;
    noEndpointLead: string;
    noEndpointFormspreeHint: string;
    noEndpointPhoneCue: string;
  };
  faq: {
    title: string;
    lead: string;
    items: FAQItem[];
  };
  footer: {
    connected: string;
    facebook: string;
    directions: string;
    legalNote: string;
  };
  servicesPage: {
    title: string;
    intro: string;
    backHome: string;
  };
  privacy: {
    title: string;
    updated: string;
    sections: LegalSection[];
  };
  terms: {
    title: string;
    updated: string;
    sections: LegalSection[];
  };
  mapsSync: {
    title: string;
    body: string;
    steps: string;
    attribution: string;
  };
};
