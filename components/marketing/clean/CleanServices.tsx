"use client";

import Image from "next/image";
import { ArrowRight, Check, Shield, Zap } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

/**
 * Core services — body, paint, mechanical + “why book” UX framing.
 * Collision is the default/popular path (smart default + goal gradient).
 */
const CORE = [
  {
    id: "collision",
    popular: true,
    src: "/gallery/shop-1.jpg",
    titleEn: "Collision & body",
    titleEs: "Colisión y carrocería",
    bodyEn: "Accident and parking-lot damage — structure, panels, and safety systems.",
    bodyEs: "Daños de choque o estacionamiento — estructura, paneles y seguridad.",
    whyEn: "Avoid driving with bent structure or airbag lights — book before it gets costlier.",
    whyEs: "No manejes con estructura torcida o luces de airbag — cotiza antes de que salga más caro.",
    stepsEn: ["Send photos", "Get estimate", "Drop off"],
    stepsEs: ["Envía fotos", "Recibe estimado", "Entrega el auto"],
    itemsEn: [
      "Front & rear collision repair",
      "Door, fender & quarter panels",
      "Bumper & fascia repair",
      "Frame / unibody straightening",
    ],
    itemsEs: [
      "Colisión delantera y trasera",
      "Puerta, guardafango y panel trasero",
      "Parachoques y fascia",
      "Enderezado de chasis / unibody",
    ],
    ctaEn: "Quote collision repair",
    ctaEs: "Cotizar colisión",
  },
  {
    id: "paint",
    popular: false,
    src: "/gallery/shop-3.jpg",
    titleEn: "Paint & refinish",
    titleEs: "Pintura y acabado",
    bodyEn: "Color-matched refinish so repaired panels blend with the rest of the car.",
    bodyEs: "Pintura igualada para que los paneles reparados combinen con el resto del auto.",
    whyEn: "Faded or mismatched paint kills resale and looks unfinished — fix the panel right once.",
    whyEs: "Pintura despareja baja el valor y se ve a medias — repáralo bien una sola vez.",
    stepsEn: ["Match color", "Approve work", "Pick up"],
    stepsEs: ["Igualar color", "Aprobar trabajo", "Recoger"],
    itemsEn: [
      "Single- & multi-panel respray",
      "Blend & color match",
      "Scratch, scuff & chip repair",
      "Clear coat & paint correction",
    ],
    itemsEs: [
      "Repintado de uno o varios paneles",
      "Mezcla e igualación de color",
      "Rayones, roces y desconchones",
      "Clear y corrección de pintura",
    ],
    ctaEn: "Quote paint work",
    ctaEs: "Cotizar pintura",
  },
  {
    id: "mechanical",
    popular: false,
    src: "/gallery/shop-2.jpg",
    titleEn: "Diagnostics & mechanical",
    titleEs: "Diagnóstico y mecánica",
    bodyEn: "Check-engine, brakes, and post-collision mechanical so it drives right.",
    bodyEs: "Check-engine, frenos y mecánica post-colisión para que ruede bien.",
    whyEn: "Ignore a check-engine light and risk a roadside bill — diagnose under one roof.",
    whyEs: "Ignorar el check-engine puede dejarte varado — diagnóstico bajo un techo.",
    stepsEn: ["Scan codes", "Approve repair", "Drive safe"],
    stepsEs: ["Escanear códigos", "Aprobar reparación", "Manejar seguro"],
    itemsEn: [
      "Computer diagnostics",
      "Brakes & suspension",
      "Alignment after bodywork",
      "A/C, battery & maintenance",
    ],
    itemsEs: [
      "Diagnóstico por computadora",
      "Frenos y suspensión",
      "Alineación después de carrocería",
      "A/C, batería y mantenimiento",
    ],
    ctaEn: "Quote diagnostics",
    ctaEs: "Cotizar diagnóstico",
  },
] as const;

export function CleanServices() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="services" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap">
        <div className="nw-center mx-auto mb-6 max-w-2xl">
          <p className="nw-kicker">{es ? "Servicios" : "Services"}</p>
          <h2 className="nw-h2">
            {es ? "Carrocería, pintura y mecánica" : "Body, paint & mechanical"}
          </h2>
          <p className="nw-lead">
            {es
              ? "Elige un servicio — 3 pasos hasta el estimado por WhatsApp. Colisión es el camino más pedido."
              : "Pick a service — 3 steps to a WhatsApp estimate. Collision is the most-booked path."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE.map((dept) => {
            const title = es ? dept.titleEs : dept.titleEn;
            const body = es ? dept.bodyEs : dept.bodyEn;
            const items = es ? dept.itemsEs : dept.itemsEn;
            const why = es ? dept.whyEs : dept.whyEn;
            const steps = es ? dept.stepsEs : dept.stepsEn;
            const cta = es ? dept.ctaEs : dept.ctaEn;

            return (
              <article
                key={dept.id}
                className="relative flex flex-col overflow-hidden border"
                style={{
                  background: brand.white,
                  borderRadius: "0.25rem",
                  borderColor: dept.popular ? brand.orangeBorder : "#E6EAEF",
                  boxShadow: dept.popular ? "0 10px 28px rgba(251, 140, 51, 0.12)" : undefined,
                }}
              >
                {dept.popular ? (
                  <span
                    className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white"
                    style={{ background: brand.orange }}
                  >
                    <Zap className="size-3" aria-hidden />
                    {es ? "Más pedido" : "Most booked"}
                  </span>
                ) : null}

                <div className="nw-photo relative aspect-[16/10]">
                  <Image
                    src={dept.src}
                    alt={`${title} — Sanchez Auto Services LLC Paterson NJ`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,37,63,0.75) 0%, transparent 55%)",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-xl font-extrabold text-white">{title}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#5c6570" }}>
                    {body}
                  </p>

                  <p
                    className="mt-3 rounded-sm border px-3 py-2 text-[12px] font-semibold leading-snug"
                    style={{
                      borderColor: brand.orangeBorder,
                      background: brand.orangeSoft,
                      color: brand.navy,
                    }}
                  >
                    {why}
                  </p>

                  <ol className="mt-3 flex flex-wrap gap-1.5" aria-label={es ? "3 pasos" : "3 steps"}>
                    {steps.map((s, i) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: brand.navySoft, color: brand.navy }}
                      >
                        <span style={{ color: brand.orange }}>{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ol>

                  <ul className="mb-5 mt-4 flex-1 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: brand.navy }}>
                        <Check
                          className="mt-0.5 size-3.5 shrink-0"
                          style={{ color: brand.orange }}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("quote_click", { source: "services", service: dept.id });
                      openQuote(title);
                    }}
                    className="nw-btn nw-btn--wa w-full"
                  >
                    {cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed"
          style={{ color: brand.steel }}
        >
          <Shield
            className="mr-1.5 inline size-4 align-[-2px]"
            style={{ color: brand.orange }}
            aria-hidden
          />
          {es
            ? "Seguros bienvenidos — Progressive, GEICO, State Farm, NJM y más. Estimado gratis por WhatsApp."
            : "Insurance welcome — Progressive, GEICO, State Farm, NJM & more. Free estimate on WhatsApp."}
        </p>
      </div>
    </section>
  );
}
