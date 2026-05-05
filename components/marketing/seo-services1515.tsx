"use client";

import { useState } from "react";
import {
  Car, Paintbrush, Settings, Wrench, CircleOff,
  Scan, Gauge, Droplets, ArrowUpDown, Zap, Wind, CircleDot,
} from "lucide-react";
import { services, site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { ServiceQuoteModal } from "@/components/marketing/service-quote-modal1515";

const iconMap: Record<string, React.ElementType> = {
  "car-front": Car,
  paintbrush: Paintbrush,
  cog: Settings,
  wrench: Wrench,
  "circle-stop": CircleOff,
  "scan-line": Scan,
  gauge: Gauge,
  droplets: Droplets,
  "arrow-up-down": ArrowUpDown,
  zap: Zap,
  wind: Wind,
  "circle-dot": CircleDot,
};

export function SeoServicesSection() {
  const c = useCatalog();
  const [activeService, setActiveService] = useState<string | null>(null);
  const isEs = c.locale === "es";

  return (
    <>
      <section
        id="services"
        className="scroll-mt-0 py-12 sm:py-16"
        style={{ background: "#0d0b17" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-5">

          {/* ── SEO block ── */}
          <div className="mb-10 rounded-2xl px-5 py-7 sm:px-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]" style={{ color: "#e04e28" }}>
              Auto Repair · Paterson NJ
            </p>
            <h2 className="mb-3 text-xl font-black tracking-tight text-white sm:text-2xl">
              {isEs ? "Taller de Reparación de Autos en Paterson, NJ" : "Paterson's Trusted Auto Repair & Body Shop"}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
              {isEs
                ? <>Sanchez Auto Services LLC es un <strong className="text-white/80">taller de reparación de autos</strong> en Paterson, NJ — especialistas en <strong className="text-white/80">reparación de colisiones</strong>, <strong className="text-white/80">pintura automotriz</strong>, <strong className="text-white/80">mecánica general</strong>, frenos, transmisión, diagnóstico y más. Calificados con <strong className="text-white/80">4.8 estrellas en Google</strong>. Llame al <a href={site.phones[0].tel} className="text-red-400 no-underline hover:underline font-semibold">{site.phones[0].display}</a>.</>
                : <>Sanchez Auto Services LLC is a <strong className="text-white/80">full-service auto repair shop in Paterson, NJ</strong> — specialists in <strong className="text-white/80">collision repair</strong>, <strong className="text-white/80">auto painting &amp; refinishing</strong>, <strong className="text-white/80">engine repair</strong>, brake service, transmission, diagnostics, A/C, and more. Rated <strong className="text-white/80">4.8 stars on Google</strong>. Call <a href={site.phones[0].tel} className="text-red-400 no-underline hover:underline font-semibold">{site.phones[0].display}</a> or tap a service below for a fast quote.</>
              }
            </p>
          </div>

          {/* ── Section header ── */}
          <div className="mb-6">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em]" style={{ color: "#e04e28" }}>
              {isEs ? "Lo que hacemos" : "What We Do"}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {isEs ? "12 Servicios. Un Solo Taller." : "12 Services. One Shop."}
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              {isEs ? "Toca cualquier servicio para pedir una cotización." : "Tap any service tile to request a quote."}
            </p>
          </div>

          {/* ── Square tile grid ── */}
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon] ?? Wrench;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveService(s.title)}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl p-3 text-center transition-all active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    aspectRatio: "1 / 1",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="flex size-9 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                    style={{ background: "rgba(224,78,40,0.12)" }}
                  >
                    <Icon className="size-4.5" style={{ color: "#e04e28" }} aria-hidden />
                  </div>
                  {/* Label */}
                  <span
                    className="text-[10px] font-bold leading-tight"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                  >
                    {s.title.replace(" & ", " & ")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Gallery strip ── */}
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 overflow-hidden rounded-2xl">
            {["/gallery/shop-1.jpg", "/gallery/shop-2.jpg", "/gallery/shop-3.jpg", "/gallery/shop-4.jpg"].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`Sanchez Auto Services shop photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.18)" }} aria-hidden />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Quote modal */}
      {activeService && (
        <ServiceQuoteModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </>
  );
}
