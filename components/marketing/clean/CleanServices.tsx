"use client";

import Image from "next/image";
import { ArrowRight, Check, Shield } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";

/**
 * Core services only — body, paint, diagnostics/mechanical + insurance line.
 */
const CORE = [
  {
    id: "collision",
    src: "/gallery/shop-1.jpg",
    titleEn: "Collision & body",
    titleEs: "Colisión y carrocería",
    bodyEn: "Accident and parking-lot damage — structure, panels, and safety systems.",
    bodyEs: "Daños de choque o estacionamiento — estructura, paneles y seguridad.",
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
  },
  {
    id: "paint",
    src: "/gallery/shop-3.jpg",
    titleEn: "Paint & refinish",
    titleEs: "Pintura y acabado",
    bodyEn: "Color-matched refinish so repaired panels blend with the rest of the car.",
    bodyEs: "Pintura igualada para que los paneles reparados combinen con el resto del auto.",
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
  },
  {
    id: "mechanical",
    src: "/gallery/shop-2.jpg",
    titleEn: "Diagnostics & mechanical",
    titleEs: "Diagnóstico y mecánica",
    bodyEn: "Check-engine, brakes, and post-collision mechanical so it drives right.",
    bodyEs: "Check-engine, frenos y mecánica post-colisión para que ruede bien.",
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
  },
] as const;

export function CleanServices() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="services" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap">
        <div className="nw-center mx-auto mb-10 max-w-2xl">
          <p className="nw-kicker">{es ? "Servicios" : "Services"}</p>
          <h2 className="nw-h2">
            {es ? "Carrocería, pintura y mecánica" : "Body, paint & mechanical"}
          </h2>
          <p className="nw-lead">
            {es
              ? "Lo esencial bajo un techo en Paterson. Toca un servicio para cotizar por WhatsApp."
              : "The essentials under one roof in Paterson. Tap a service to quote on WhatsApp."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE.map((dept) => {
            const title = es ? dept.titleEs : dept.titleEn;
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
                    onClick={() => openQuote(title)}
                    className="nw-btn nw-btn--wa w-full"
                  >
                    {es ? "Cotizar" : "Get estimate"}
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Insurance one-liner */}
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
            ? "Seguros bienvenidos — Progressive, GEICO, State Farm, NJM y más."
            : "Insurance welcome — Progressive, GEICO, State Farm, NJM & more."}
        </p>
      </div>
    </section>
  );
}
