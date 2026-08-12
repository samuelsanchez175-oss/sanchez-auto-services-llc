export type ServiceLanding = {
  slug: "collision" | "paint" | "mechanical";
  titleEn: string;
  titleEs: string;
  h1En: string;
  h1Es: string;
  introEn: string;
  introEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  ctaEn: string;
  ctaEs: string;
  seoTitleEn: string;
  seoTitleEs: string;
  seoDescEn: string;
  seoDescEs: string;
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: "collision",
    titleEn: "Collision & body",
    titleEs: "Colisión y carrocería",
    h1En: "Collision repair in Paterson, NJ",
    h1Es: "Reparación de colisiones en Paterson, NJ",
    introEn:
      "Accident and parking-lot damage at Sanchez Auto Services LLC — structure, panels, bumpers, and frame work. Insurance claims welcome.",
    introEs:
      "Daños de accidente o estacionamiento en Sanchez Auto — estructura, paneles, parachoques y chasis. Seguros bienvenidos.",
    bulletsEn: [
      "Front / rear / side impact repair",
      "Frame and unibody straightening",
      "Insurance estimate support",
      "WhatsApp photo estimates",
    ],
    bulletsEs: [
      "Colisión delantera / trasera / lateral",
      "Enderezado de chasis / unibody",
      "Soporte de estimado de seguro",
      "Estimados con fotos por WhatsApp",
    ],
    ctaEn: "Quote collision repair",
    ctaEs: "Cotizar colisión",
    seoTitleEn: "Collision Repair Paterson NJ | Sanchez Auto Services",
    seoTitleEs: "Reparación de colisiones Paterson NJ | Sanchez Auto",
    seoDescEn:
      "Collision and body repair at 99 E Railway Ave, Paterson NJ. Insurance welcome. Free WhatsApp estimates.",
    seoDescEs:
      "Carrocería y colisiones en 99 E Railway Ave, Paterson NJ. Seguros bienvenidos. Estimados gratis por WhatsApp.",
  },
  {
    slug: "paint",
    titleEn: "Paint & refinish",
    titleEs: "Pintura y acabado",
    h1En: "Auto paint & refinish — Paterson, NJ",
    h1Es: "Pintura automotriz — Paterson, NJ",
    introEn:
      "Color-matched respray, blend, clear coat, and scratch repair so repaired panels match the rest of the car.",
    introEs:
      "Repintado con igualación de color, mezcla, clear y rayones para que el panel combine con el resto del auto.",
    bulletsEn: [
      "Single- and multi-panel respray",
      "Blend & color match",
      "Scratch / scuff / chip repair",
      "Clear coat and correction",
    ],
    bulletsEs: [
      "Uno o varios paneles",
      "Mezcla e igualación",
      "Rayones y desconchones",
      "Clear y corrección",
    ],
    ctaEn: "Quote paint work",
    ctaEs: "Cotizar pintura",
    seoTitleEn: "Auto Paint Shop Paterson NJ | Sanchez Auto Services",
    seoTitleEs: "Taller de pintura Paterson NJ | Sanchez Auto",
    seoDescEn:
      "Auto paint and refinishing in Paterson NJ. Color match, clear coat, insurance-friendly body paint.",
    seoDescEs:
      "Pintura automotriz en Paterson NJ. Igualación de color, clear, compatible con seguros.",
  },
  {
    slug: "mechanical",
    titleEn: "Diagnostics & mechanical",
    titleEs: "Diagnóstico y mecánica",
    h1En: "Auto diagnostics & mechanical — Paterson",
    h1Es: "Diagnóstico y mecánica — Paterson",
    introEn:
      "Check-engine lights, brakes, suspension, alignment after bodywork, A/C, and maintenance under the same roof as collision.",
    introEs:
      "Check-engine, frenos, suspensión, alineación post-carrocería, A/C y mantenimiento bajo el mismo techo.",
    bulletsEn: [
      "Computer diagnostics",
      "Brakes and suspension",
      "Post-collision mechanical",
      "A/C, battery, oil service",
    ],
    bulletsEs: [
      "Diagnóstico por computadora",
      "Frenos y suspensión",
      "Mecánica post-colisión",
      "A/C, batería, aceite",
    ],
    ctaEn: "Quote diagnostics",
    ctaEs: "Cotizar diagnóstico",
    seoTitleEn: "Auto Repair & Diagnostics Paterson NJ | Sanchez Auto",
    seoTitleEs: "Mecánica y diagnóstico Paterson NJ | Sanchez Auto",
    seoDescEn:
      "Mechanical repair and diagnostics in Paterson NJ. Brakes, check-engine, alignment — same shop as body work.",
    seoDescEs:
      "Mecánica y diagnóstico en Paterson NJ. Frenos, check-engine, alineación — mismo taller de carrocería.",
  },
];

export function landingBySlug(slug: string): ServiceLanding | undefined {
  return SERVICE_LANDINGS.find((s) => s.slug === slug);
}
