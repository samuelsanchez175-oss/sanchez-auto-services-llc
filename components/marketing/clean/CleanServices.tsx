"use client";

import { Car, Paintbrush, Wrench, ArrowRight, Check } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";

const CARDS = [
  {
    id: "collision",
    icon: Car,
    titleEn: "Collision & body",
    titleEs: "Colisión y carrocería",
    bodyEn: "After an accident or parking lot hit — we restore structure and panels.",
    bodyEs: "Después de un choque o golpe en el estacionamiento — restauramos estructura y paneles.",
    examplesEn: [
      "Front-end / rear-end collision",
      "Door, fender & quarter panel",
      "Bumper cover & fascia",
      "Frame / unibody alignment",
      "Dent repair (with or without paint)",
    ],
    examplesEs: [
      "Colisión delantera / trasera",
      "Puerta, guardafango y panel",
      "Parachoques y fascia",
      "Alineación de chasis / unibody",
      "Abolladuras (con o sin pintura)",
    ],
  },
  {
    id: "paint",
    icon: Paintbrush,
    titleEn: "Paint & refinish",
    titleEs: "Pintura y acabado",
    bodyEn: "Color-matched refinish so repaired panels blend with the rest of the car.",
    bodyEs: "Pintura igualada para que los paneles reparados combinen con el resto del auto.",
    examplesEn: [
      "Single-panel respray",
      "Multi-panel blend",
      "Clear coat peeling / fade",
      "Scratch & chip repair",
      "Bumper paint match",
    ],
    examplesEs: [
      "Repintado de un panel",
      "Mezcla de varios paneles",
      "Clear dañado o descolorido",
      "Rayones y desconchones",
      "Pintura de parachoques",
    ],
  },
  {
    id: "mechanical",
    icon: Wrench,
    titleEn: "Mechanical",
    titleEs: "Mecánica",
    bodyEn: "Day-to-day repairs and post-collision mechanical so the car drives right.",
    bodyEs: "Reparaciones del día a día y mecánica post-colisión para que el auto ruede bien.",
    examplesEn: [
      "Brakes & rotors",
      "Check-engine diagnostics",
      "Oil change & maintenance",
      "Suspension & steering",
      "A/C, battery, lights",
    ],
    examplesEs: [
      "Frenos y discos",
      "Diagnóstico check-engine",
      "Aceite y mantenimiento",
      "Suspensión y dirección",
      "A/C, batería, luces",
    ],
  },
] as const;

export function CleanServices() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="services" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.orange }}
          >
            {es ? "Servicios" : "Services"}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: brand.navy }}
          >
            {es ? "Ejemplos de lo que reparamos" : "Examples of what we fix"}
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: brand.steel }}>
            {es
              ? "Cada tarjeta muestra ejemplos reales. Toca para cotizar ese tipo de trabajo por WhatsApp."
              : "Each card lists real examples. Tap to quote that kind of work on WhatsApp."}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            const title = es ? card.titleEs : card.titleEn;
            const examples = es ? card.examplesEs : card.examplesEn;
            return (
              <div
                key={card.id}
                className="flex flex-col rounded-2xl border bg-white p-6"
                style={{ borderColor: "#E6EAEF" }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: brand.orangeSoft }}
                >
                  <Icon className="size-6" style={{ color: brand.orange }} aria-hidden />
                </div>
                <h3 className="text-lg font-bold" style={{ color: brand.navy }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: brand.steel }}>
                  {es ? card.bodyEs : card.bodyEn}
                </p>

                <p
                  className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: brand.steelLight }}
                >
                  {es ? "Ejemplos" : "Examples"}
                </p>
                <ul className="mb-5 flex-1 space-y-2">
                  {examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: brand.navy }}
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0"
                        style={{ color: brand.orange }}
                        aria-hidden
                      />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openQuote(title)}
                  className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl border-0 py-3 text-sm font-bold text-white"
                  style={{ background: brand.navy }}
                >
                  {es ? "Cotizar este servicio" : "Quote this service"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
