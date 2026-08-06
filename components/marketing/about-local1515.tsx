"use client";

import { MapPin, Navigation, Clock } from "lucide-react";
import { formatAddressInline, mapDirectionsUrl, site, schedule } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { MessageCircle } from "lucide-react";

export function AboutLocalSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      id="about"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: "#07253F" }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div>
          <p
            className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "#FB8C33" }}
          >
            {isEs ? "Sobre el taller" : "About the shop"}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {isEs
              ? "Sanchez Auto Services LLC"
              : "Sanchez Auto Services LLC"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            {isEs
              ? "Taller familiar de carrocería y mecánica en Paterson. Colisiones, pintura, frenos, diagnóstico y mantenimiento — más vans y flotas ligeras. Cotizaciones por WhatsApp, seguros bienvenidos, inglés y español."
              : "Family-run body shop and mechanical garage in Paterson. Collision, paint, brakes, diagnostics, and maintenance — plus light fleet and commercial vans. WhatsApp quotes, insurance welcome, English & Spanish."}
          </p>
          <ul className="mt-6 space-y-3">
            {[
              isEs
                ? "Estimados documentados para seguros y ajustadores"
                : "Documented estimates for insurance & adjusters",
              isEs
                ? "Fotos y reclamo por WhatsApp para cotizar más rápido"
                : "Photos & claim details on WhatsApp for faster quotes",
              isEs
                ? "Colisión, mecánica y flota ligera bajo un techo"
                : "Collision, mechanical & light fleet under one roof",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-sm text-white/80">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ background: "#FB8C33" }}
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(224,78,40,0.15)" }}
            >
              <MapPin className="size-5" style={{ color: "#FB8C33" }} aria-hidden />
            </div>
            <div>
              <p className="font-bold text-white">{site.name}</p>
              <a
                href={site.mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block text-sm no-underline hover:underline"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {formatAddressInline()}
              </a>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(224,78,40,0.15)" }}
            >
              <Clock className="size-5" style={{ color: "#FB8C33" }} aria-hidden />
            </div>
            <ul className="space-y-1.5 text-sm">
              {schedule.map((row) => (
                <li key={row.days} className="flex flex-wrap gap-x-2">
                  <span className="font-semibold text-white/90">{row.days}</span>
                  <span style={{ color: "rgba(255,255,255,0.45)" }}>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => openQuote()}
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-0 py-3 text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
            >
              <MessageCircle className="size-4" aria-hidden />
              {isEs ? "WhatsApp" : "WhatsApp quote"}
            </button>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white no-underline"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Navigation className="size-4" aria-hidden />
              {isEs ? "Cómo llegar" : "Directions"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
