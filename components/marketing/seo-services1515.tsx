"use client";

import { useState } from "react";
import { services, site } from "@/lib/site-content";
import type { ServiceId } from "@/lib/catalog/types";
import { useCatalog } from "@/lib/locale";
import { ServiceQuoteModal } from "@/components/marketing/service-quote-modal1515";
import { SeoServiceTileIcon } from "@/components/marketing/seo-service-tile-icons";
import { SeoServiceDashBadge } from "@/components/marketing/seo-service-dash-icons";

/** Google SERP-style star row: static display only (rating from public listing copy, not live API). */
const SNIPPET_LISTING_RATING = 4.8 as const;

function GoogleSnippetStars({
  rating,
  ariaLabel,
  className = "",
}: {
  rating: number;
  /** Single accessible name for the star + score + label row (avoids implying a live Google API). */
  ariaLabel: string;
  className?: string;
}) {
  const clamped = Math.min(5, Math.max(0, rating));
  const stars = [0, 1, 2, 3, 4].map((index) => {
    const fill = Math.min(1, Math.max(0, clamped - index));
    return (
      <span
        key={index}
        className="relative inline-block size-[12px] shrink-0 sm:size-[13px]"
        aria-hidden
      >
        <svg
          className="absolute inset-0 size-full text-neutral-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fill * 100}%` }}
        >
          <svg
            className="size-full text-[#fbbc04]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </span>
      </span>
    );
  });

  return (
    <div
      className={`flex flex-wrap items-center gap-[3px] text-[13px] leading-none tracking-tight sm:gap-1 sm:text-sm ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="flex items-center gap-0" aria-hidden>
        {stars}
      </span>
      <span className="ml-0.5 text-[#3c4043]" aria-hidden>
        {rating.toFixed(1)}
      </span>
      <span className="text-[#70757a]" aria-hidden>
        Google
      </span>
    </div>
  );
}

const SERVICE_COLORS: Record<string, string> = {
  collision:    "#e04e28",
  paint:        "#3b82f6",
  engine:       "#f59e0b",
  mechanics:    "#10b981",
  brakes:       "#ef4444",
  diagnostics:  "#8b5cf6",
  transmission: "#06b6d4",
  oil:          "#84cc16",
  suspension:   "#f97316",
  electrical:   "#facc15",
  ac:           "#0ea5e9",
  tires:        "#6366f1",
};

export function SeoServicesSection() {
  const c = useCatalog();
  const [activeService, setActiveService] = useState<string | null>(null);
  const isEs = c.locale === "es";

  return (
    <>
      <section
        id="services"
        className="relative overflow-hidden scroll-mt-4 py-12 sm:scroll-mt-6 sm:py-16"
      >
        {/* Base vertical gradient: full-bleed behind layout width */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#000000] via-[#0a1628] to-[#0c4a6e]"
          aria-hidden
        />
        {/* Subtle star field (CSS repeating radial layers) — above gradient, below content */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.55] sm:opacity-50"
          aria-hidden
          style={{
            backgroundImage: [
              "radial-gradient(rgba(255,255,255,0.55) 0.6px, transparent 0.65px)",
              "radial-gradient(rgba(255,255,255,0.32) 0.45px, transparent 0.5px)",
              "radial-gradient(rgba(255,255,255,0.18) 0.35px, transparent 0.4px)",
            ].join(", "),
            backgroundSize: "128px 96px, 212px 168px, 316px 244px",
            backgroundPosition: "0 0, 37px 62px, 13px 103px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5">

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
                const copy = c.serviceCopy[s.id as ServiceId];
                const title = copy?.title ?? s.title;
                const whenToService = copy?.whenToService ?? "";
                return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveService(title)}
                  aria-label={
                    isEs
                      ? `Solicitar cotización: ${title}`
                      : `Request a quote for ${title}`
                  }
                  className="group flex min-h-[148px] flex-col items-stretch gap-1.5 rounded-2xl p-3 text-center outline-none active:scale-95 sm:min-h-[156px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "background 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = `${SERVICE_COLORS[s.id] ?? "#e04e28"}14`;
                    el.style.borderColor = `${SERVICE_COLORS[s.id] ?? "#e04e28"}55`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <div className="flex w-full min-w-0 items-start justify-between gap-2">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        background: `${SERVICE_COLORS[s.id] ?? "#e04e28"}22`,
                        border: `1.5px solid ${SERVICE_COLORS[s.id] ?? "#e04e28"}55`,
                      }}
                    >
                      <SeoServiceTileIcon
                        serviceId={s.id}
                        className="h-6 w-6 shrink-0"
                        style={{ color: SERVICE_COLORS[s.id] ?? "#e04e28" }}
                      />
                    </div>
                    <div className="flex min-h-10 shrink-0 flex-col items-end justify-start">
                      {s.dashIndicator ? (
                        <SeoServiceDashBadge kind={s.dashIndicator} />
                      ) : (
                        <span className="inline-block size-[18px] shrink-0" aria-hidden />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold leading-tight text-white">
                    {title.replace(" & ", " & ")}
                  </span>
                  {whenToService ? (
                    <p className="line-clamp-3 text-[11px] leading-snug sm:text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {whenToService}
                    </p>
                  ) : null}
                </button>
                );
              })}
          </div>

          {/* ── SEO block (organic SERP snippet card) ── */}
          <div
            className="mt-10 rounded-xl border border-neutral-200 bg-white px-5 py-6 shadow-md ring-1 ring-black/5 [-webkit-font-smoothing:antialiased]"
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <p
              className="mb-[5px] truncate text-[13px] leading-snug tracking-tight text-[#70757a]"
              title={isEs ? "Taller · Paterson NJ" : "Auto Repair · Paterson NJ"}
            >
              {isEs ? "Taller · Paterson NJ" : "Auto Repair · Paterson NJ"}
            </p>
            <h2 className="mb-1 text-[20px] font-normal leading-snug text-[#1a0dab] hover:underline sm:mb-[5px] sm:text-[22px] sm:font-medium">
              {isEs
                ? "Taller de Reparación de Autos en Paterson, NJ"
                : "Paterson's Trusted Auto Repair & Body Shop"}
            </h2>
            <div className="mb-2 sm:mb-[7px]">
              <GoogleSnippetStars
                rating={SNIPPET_LISTING_RATING}
                ariaLabel={
                  isEs
                    ? `${SNIPPET_LISTING_RATING.toFixed(1)} de 5 estrellas; presentación tipo listado de Google (solo diseño).`
                    : `${SNIPPET_LISTING_RATING.toFixed(1)} out of 5 stars; Google-style listing presentation (visual styling only).`
                }
              />
            </div>
            <p className="text-[14px] leading-[1.45] tracking-[-0.01em] text-[#4d5156] sm:text-sm">
              {isEs ? (
                <>
                  Sanchez Auto Services LLC es un{" "}
                  <strong className="font-bold text-[#4d5156]">taller de reparación de autos</strong>{" "}
                  en Paterson, NJ — especialistas en{" "}
                  <strong className="font-bold text-[#4d5156]">reparación de colisiones</strong>,{" "}
                  <strong className="font-bold text-[#4d5156]">pintura automotriz</strong>,{" "}
                  <strong className="font-bold text-[#4d5156]">mecánica general</strong>, frenos,
                  transmisión, diagnóstico y más. Llame al{" "}
                  <a
                    href={site.phones[0].tel}
                    className="font-semibold text-[#e04e28] no-underline hover:underline"
                  >
                    {site.phones[0].display}
                  </a>
                  .
                </>
              ) : (
                <>
                  Sanchez Auto Services LLC is a{" "}
                  <strong className="font-bold text-[#4d5156]">
                    full-service auto repair shop in Paterson, NJ
                  </strong>{" "}
                  — specialists in{" "}
                  <strong className="font-bold text-[#4d5156]">collision repair</strong>,{" "}
                  <strong className="font-bold text-[#4d5156]">
                    auto painting &amp; refinishing
                  </strong>
                  , <strong className="font-bold text-[#4d5156]">engine repair</strong>, brake
                  service, transmission, diagnostics, A/C, and more. Call{" "}
                  <a
                    href={site.phones[0].tel}
                    className="font-semibold text-[#e04e28] no-underline hover:underline"
                  >
                    {site.phones[0].display}
                  </a>{" "}
                  or tap a service above for a fast quote.
                </>
              )}
            </p>
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
