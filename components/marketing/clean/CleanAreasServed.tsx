"use client";

import { MapPin } from "lucide-react";
import { areasServed } from "@/lib/site-content";
import { brand } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";

/** On-page local SEO — nearby cities + keyword-rich intro (natural language, not stuffing). */
export function CleanAreasServed() {
  const { locale } = useCatalog();
  const es = locale === "es";

  return (
    <section
      id="areas"
      className="scroll-mt-20 border-t py-12 sm:py-14"
      style={{ background: brand.white, borderColor: "#E6EAEF" }}
      aria-labelledby="areas-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: brand.orangeSoft }}
          >
            <MapPin className="size-5" style={{ color: brand.orange }} aria-hidden />
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: brand.orange }}
            >
              {es ? "Área de servicio" : "Service area"}
            </p>
            <h2
              id="areas-heading"
              className="mt-1 text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: brand.navy }}
            >
              {es
                ? "Taller de carrocería en Paterson y alrededores"
                : "Body shop serving Paterson & nearby NJ"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: brand.steel }}>
              {es
                ? "Sanchez Auto Services LLC ofrece reparación de colisiones, pintura automotriz y mecánica en Paterson, NJ (101 E Railway Ave). También atendemos conductores de ciudades cercanas en el condado de Passaic y alrededores — cotizaciones por WhatsApp y seguros bienvenidos."
                : "Sanchez Auto Services LLC provides collision repair, auto paint, and mechanical service in Paterson, NJ (101 E Railway Ave). We also welcome drivers from nearby Passaic County towns for free estimates on WhatsApp — insurance claims welcome."}
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={es ? "Ciudades" : "Cities served"}>
          {areasServed.map((city) => (
            <li key={city}>
              <span
                className="inline-block rounded-full px-3.5 py-1.5 text-xs font-bold"
                style={{
                  background: brand.paper,
                  color: brand.navy,
                  border: "1px solid #E6EAEF",
                }}
              >
                {city}
                {city === "Paterson" ? ", NJ" : ""}
              </span>
            </li>
          ))}
        </ul>

        {/* Secondary keyword line for crawlers — readable, not stuffed */}
        <p className="mt-5 text-xs leading-relaxed" style={{ color: brand.steelLight }}>
          {es
            ? "Palabras clave: body shop Paterson NJ · collision repair · auto paint · frenos · diagnóstico · taller WhatsApp · reclamos de seguro."
            : "Related searches: auto body shop Paterson NJ · collision repair · car accident repair · paint shop · brake service · check engine diagnostics · insurance body shop · WhatsApp quote."}
        </p>
      </div>
    </section>
  );
}
