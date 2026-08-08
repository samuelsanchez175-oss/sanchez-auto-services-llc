"use client";

import { Shield, Car } from "lucide-react";
import { trustedInsurers, trustedMakes } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { MessageCircle } from "lucide-react";

export function CleanPartners() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      id="partners"
      className="scroll-mt-28 py-14 sm:py-20"
      style={{ background: brand.paper }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.orange }}
          >
            {es ? "Socios de confianza" : "Trusted partners"}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: brand.navy }}
          >
            {es
              ? "Aseguradoras y marcas que vemos a diario"
              : "Insurers & makes we work with every day"}
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: brand.steel }}>
            {es
              ? "Como Network Auto Body muestra socios de confianza, aquí listamos aseguradoras y marcas comunes. No es una lista cerrada ni certificación de fabricante — si no ves la tuya, escribe igual."
              : "Like Network Auto Body’s trusted-partner wall, we list common insurers and vehicle brands. Not a closed list or factory certification claim — don’t see yours? Message us anyway."}
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="size-5" style={{ color: brand.orange }} />
            <h3 className="text-lg font-bold" style={{ color: brand.navy }}>
              {es ? "Ejemplos de aseguradoras" : "Insurance partners (examples)"}
            </h3>
          </div>
          <ul className="flex flex-wrap gap-2">
            {trustedInsurers.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() =>
                    openQuote(
                      es ? `Reclamo de seguro — ${name}` : `Insurance claim — ${name}`,
                    )
                  }
                  className="rounded-xl border bg-white px-4 py-2.5 text-sm font-bold transition-shadow hover:shadow-md"
                  style={{ borderColor: "#E6EAEF", color: brand.navy }}
                >
                  {name}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() =>
                  openQuote(es ? "Reclamo — otra aseguradora" : "Insurance — other carrier")
                }
                className="rounded-xl border px-4 py-2.5 text-sm font-bold"
                style={{
                  borderColor: brand.orangeBorder,
                  color: brand.orangeDeep,
                  background: brand.orangeSoft,
                }}
              >
                {es ? "Otra / no listada" : "Other / not listed"}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Car className="size-5" style={{ color: brand.orange }} />
            <h3 className="text-lg font-bold" style={{ color: brand.navy }}>
              {es ? "Marcas que reparamos" : "Makes we repair"}
            </h3>
          </div>
          <ul className="flex flex-wrap gap-2">
            {trustedMakes.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() =>
                    openQuote(es ? `Cotización — ${name}` : `Quote — ${name}`)
                  }
                  className="rounded-xl border bg-white px-4 py-2.5 text-sm font-bold transition-shadow hover:shadow-md"
                  style={{ borderColor: "#E6EAEF", color: brand.navy }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() =>
            openQuote(es ? "Reclamo de seguro / colisión" : "Insurance claim / collision")
          }
          className="mt-10 inline-flex items-center gap-2 rounded-xl border-0 px-6 py-3.5 text-sm font-bold text-white"
          style={{ background: brandGradients.whatsappCta }}
        >
          <MessageCircle className="size-4" />
          {es ? "Cotizar mi reclamo" : "Quote my claim"}
        </button>
      </div>
    </section>
  );
}
