"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";

/**
 * Expanded services — body shop, paint shop, and diagnostic / mechanical teams.
 * Each department lists concrete job types customers can quote on WhatsApp.
 */
const DEPARTMENTS = [
  {
    id: "body",
    src: "/gallery/shop-1.jpg",
    titleEn: "Body shop",
    titleEs: "Carrocería",
    kickerEn: "Collision & structural",
    kickerEs: "Colisión y estructura",
    bodyEn:
      "After an accident or parking-lot hit, we restore structure, panels, and safety systems so the car is solid again.",
    bodyEs:
      "Después de un choque o golpe en el estacionamiento, restauramos estructura, paneles y sistemas de seguridad.",
    itemsEn: [
      "Front-end & rear-end collision repair",
      "Side-impact / T-bone panel repair",
      "Door, fender & quarter panel replacement",
      "Hood, decklid & roof panel work",
      "Bumper cover, fascia & grille repair",
      "Frame / unibody measuring & straightening",
      "Dent repair (paintless when possible)",
      "Rust repair & panel sectioning",
      "Welded structural replacements",
      "Plastic bumper welding & re-tabbing",
      "Glass: windshield & door glass (coordination)",
      "Post-collision reassembly & alignment setup",
    ],
    itemsEs: [
      "Colisión delantera y trasera",
      "Impacto lateral / paneles de costado",
      "Cambio de puerta, guardafango y panel trasero",
      "Capó, tapa de maletero y techo",
      "Parachoques, fascia y parrilla",
      "Medición y enderezado de chasis / unibody",
      "Abolladuras (sin pintura cuando se puede)",
      "Reparación de óxido y seccionamiento",
      "Reemplazos estructurales soldados",
      "Soldadura y pestañas de parachoques plásticos",
      "Cristales: parabrisas y puertas (coordinación)",
      "Reensamblaje y preparación de alineación",
    ],
  },
  {
    id: "paint",
    src: "/gallery/shop-3.jpg",
    titleEn: "Paint shop",
    titleEs: "Pintura",
    kickerEn: "Refinish & color match",
    kickerEs: "Acabado y color",
    bodyEn:
      "Color-matched refinish so repaired panels blend with the rest of the car — prep, base, and clear done carefully.",
    bodyEs:
      "Pintura igualada para que los paneles reparados combinen con el resto del auto — prep, base y clear con cuidado.",
    itemsEn: [
      "Single-panel respray",
      "Multi-panel blend & color match",
      "Full vehicle respray",
      "Clear coat peeling / fade repair",
      "Scratch, scuff & chip repair",
      "Bumper & plastic trim paint match",
      "Metallic, pearl & tri-coat colors",
      "Spot refinish for door dings",
      "Wheel refinishing (as available)",
      "Paint correction & buffing",
      "Underbody / jamb refinish when needed",
      "Insurance refinish documentation photos",
    ],
    itemsEs: [
      "Repintado de un solo panel",
      "Mezcla multi-panel e igualación de color",
      "Repintado completo del vehículo",
      "Clear dañado o descolorido",
      "Rayones, roces y desconchones",
      "Pintura de parachoques y molduras plásticas",
      "Colores metalizados, perla y tri-capa",
      "Retoque de golpes de puerta",
      "Refinish de rines (según disponibilidad)",
      "Corrección de pintura y pulido",
      "Pintura de bastidor / marcos cuando aplica",
      "Fotos de documentación para el seguro",
    ],
  },
  {
    id: "diagnostics",
    src: "/gallery/shop-2.jpg",
    titleEn: "Diagnostics & mechanical",
    titleEs: "Diagnóstico y mecánica",
    kickerEn: "Scan, fix & road-ready",
    kickerEs: "Escanear, reparar y listo",
    bodyEn:
      "Check-engine lights, brakes, and post-collision mechanical — so it drives, stops, and shifts right when you leave.",
    bodyEs:
      "Check-engine, frenos y mecánica post-colisión — para que ruede, frene y cambie bien al salir.",
    itemsEn: [
      "Computer diagnostics & scan tools",
      "Check-engine light diagnosis",
      "ABS / airbag / TPMS warning lights",
      "Post-collision sensor & camera reset",
      "ADAS / radar & camera calibration (as equipped)",
      "Brake pads, rotors & calipers",
      "Brake fluid flush & line repair",
      "Suspension, struts & control arms",
      "Wheel alignment after bodywork",
      "Steering rack & tie-rod service",
      "Battery, charging & electrical",
      "A/C diagnosis & recharge",
      "Oil change & maintenance services",
      "Transmission service & diagnostics",
      "Cooling system & radiator",
      "Exhaust & emission-related repairs",
    ],
    itemsEs: [
      "Diagnóstico por computadora y escáner",
      "Diagnóstico de luz check-engine",
      "Luces ABS / airbag / TPMS",
      "Reset de sensores y cámaras post-colisión",
      "Calibración ADAS / radar y cámara (según equipo)",
      "Pastillas, discos y calipers",
      "Cambio de líquido de frenos y líneas",
      "Suspensión, struts y brazos",
      "Alineación después de carrocería",
      "Cremallera y terminales de dirección",
      "Batería, carga y electricidad",
      "Diagnóstico y recarga de A/C",
      "Cambio de aceite y mantenimiento",
      "Servicio y diagnóstico de transmisión",
      "Sistema de enfriamiento y radiador",
      "Escape y reparaciones de emisiones",
    ],
  },
] as const;

export function CleanServices() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="services" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap">
        <div className="nw-center mx-auto mb-12 max-w-3xl">
          <p className="nw-kicker">{es ? "Servicios" : "Services"}</p>
          <h2 className="nw-h2">
            {es
              ? "Carrocería, pintura y diagnóstico — más tipos de trabajo"
              : "Body, paint & diagnostics — more kinds of work"}
          </h2>
          <p className="nw-lead">
            {es
              ? "Tres equipos bajo un techo en Paterson: taller de carrocería, cabina de pintura y mecánica / diagnóstico. Toca un servicio o cotiza todo el departamento por WhatsApp."
              : "Three teams under one roof in Paterson: body shop, paint booth, and mechanical / diagnostics. Tap a job type or quote the whole department on WhatsApp."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {DEPARTMENTS.map((dept) => {
            const title = es ? dept.titleEs : dept.titleEn;
            const kicker = es ? dept.kickerEs : dept.kickerEn;
            const body = es ? dept.bodyEs : dept.bodyEn;
            const items = es ? dept.itemsEs : dept.itemsEn;

            return (
              <article
                key={dept.id}
                className="flex flex-col overflow-hidden border border-[#E6EAEF]"
                style={{ background: brand.white, borderRadius: "0.25rem" }}
              >
                <div className="nw-photo relative aspect-[16/10]">
                  <Image
                    src={dept.src}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,37,63,0.75) 0%, transparent 55%)",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: brand.orange }}
                    >
                      {kicker}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-sm leading-relaxed" style={{ color: "#5c6570" }}>
                    {body}
                  </p>

                  <p
                    className="mb-3 mt-5 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: brand.steelLight }}
                  >
                    {es ? "Ejemplos de trabajos" : "Examples of work we do"}
                  </p>

                  <ul className="mb-6 flex-1 space-y-2">
                    {items.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => openQuote(`${title} — ${item}`)}
                          className="group flex w-full items-start gap-2 border-0 bg-transparent p-0 text-left text-sm leading-snug"
                          style={{ color: brand.navy }}
                        >
                          <Check
                            className="mt-0.5 size-3.5 shrink-0"
                            style={{ color: brand.orange }}
                            aria-hidden
                          />
                          <span className="underline-offset-2 group-hover:underline">
                            {item}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openQuote(title)}
                    className="nw-btn nw-btn--wa w-full"
                  >
                    {es ? `Cotizar ${title.toLowerCase()}` : `Quote ${title.toLowerCase()}`}
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm" style={{ color: brand.steel }}>
          {es
            ? "¿No ves tu trabajo en la lista? Escríbenos igual — carrocería, pintura y diagnóstico atienden más casos de los que caben aquí."
            : "Don’t see your job listed? Message us anyway — body, paint, and diagnostics handle more than we can fit on one page."}
        </p>
      </div>
    </section>
  );
}
