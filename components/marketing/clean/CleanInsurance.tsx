"use client";

import { MessageCircle, Shield } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand, brandGradients } from "@/lib/brand";

const STEPS_EN = [
  { n: "1", t: "Message us", d: "Car year/make/model, photos, claim # if you have it." },
  { n: "2", t: "We document", d: "Clear estimate and notes your adjuster can work with." },
  { n: "3", t: "We repair", d: "Body, paint, and mechanical under one roof in Paterson." },
] as const;

const STEPS_ES = [
  { n: "1", t: "Escríbenos", d: "Año/marca/modelo, fotos y # de reclamo si lo tienes." },
  { n: "2", t: "Documentamos", d: "Estimado claro y notas para tu ajustador." },
  { n: "3", t: "Reparamos", d: "Carrocería, pintura y mecánica en un solo taller." },
] as const;

/** Common carriers NJ drivers often have — we work with these and other major insurers. */
const INSURERS = [
  "Progressive",
  "GEICO",
  "State Farm",
  "Allstate",
  "Liberty Mutual",
  "NJM",
  "Travelers",
  "USAA",
  "Nationwide",
  "Farmers",
  "Plymouth Rock",
  "Selective",
  "Amica",
  "Erie",
  "The General",
  "Other / not listed",
] as const;

export function CleanInsurance() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const steps = es ? STEPS_ES : STEPS_EN;

  return (
    <section id="insurance" className="scroll-mt-20 py-14 sm:py-20" style={{ background: brand.mist }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: brand.orange }}
            >
              {es ? "Seguros" : "Insurance"}
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: brand.navy }}
            >
              {es
                ? "Trabajamos con tu seguro"
                : "We work with your insurance"}
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: brand.steel }}>
              {es
                ? "Aseguradoras principales son bienvenidas. No necesitas un taller “preferido” para cotizar o pedir ayuda con el reclamo. Si no ves la tuya abajo, escríbenos igual."
                : "Major carriers welcome. You don’t need a “preferred shop” assignment to get a quote or claim help. Don’t see yours below? Message us anyway."}
            </p>
            <button
              type="button"
              onClick={() =>
                openQuote(es ? "Reclamo de seguro / colisión" : "Insurance claim / collision")
              }
              className="mt-8 inline-flex items-center gap-2 rounded-xl border-0 px-6 py-3.5 text-[15px] font-bold text-white"
              style={{ background: brandGradients.whatsappCta }}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Cotizar mi reclamo" : "Quote my claim"}
            </button>
          </div>

          <ol className="space-y-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
                style={{ border: "1px solid #E6EAEF" }}
              >
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ background: brand.navy }}
                >
                  {s.n}
                </span>
                <div>
                  <p className="font-bold" style={{ color: brand.navy }}>
                    {s.t}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: brand.steel }}>
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Insurer examples */}
        <div
          className="mt-12 rounded-2xl bg-white p-6 sm:p-8"
          style={{ border: "1px solid #E6EAEF" }}
        >
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: brand.orangeSoft }}
              >
                <Shield className="size-5" style={{ color: brand.orange }} aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: brand.navy }}>
                  {es
                    ? "Ejemplos de aseguradoras que atendemos"
                    : "Examples of insurers we work with"}
                </h3>
                <p className="mt-1 text-sm" style={{ color: brand.steel }}>
                  {es
                    ? "Lista ilustrativa de compañías comunes en NJ — no es una lista cerrada ni un endoso oficial."
                    : "Illustrative list of carriers common in NJ — not a closed list or official endorsement."}
                </p>
              </div>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            {INSURERS.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() =>
                    openQuote(
                      es
                        ? `Reclamo de seguro — ${name}`
                        : `Insurance claim — ${name}`,
                    )
                  }
                  className="rounded-full border px-3.5 py-2 text-xs font-bold transition-colors hover:border-transparent"
                  style={{
                    borderColor: "#E6EAEF",
                    color: brand.navy,
                    background: brand.paper,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = brand.orangeSoft;
                    e.currentTarget.style.borderColor = brand.orangeBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = brand.paper;
                    e.currentTarget.style.borderColor = "#E6EAEF";
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed" style={{ color: brand.steelLight }}>
            {es
              ? "Toca una aseguradora para abrir WhatsApp con ese nombre en el mensaje. También puedes escribir otra compañía en el formulario de cotización."
              : "Tap a carrier to open WhatsApp with that name in the message. You can also type another company in the quote form."}
          </p>
        </div>
      </div>
    </section>
  );
}
