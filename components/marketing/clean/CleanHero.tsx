"use client";

import {
  MessageCircle,
  Phone,
  Star,
  MapPin,
  Shield,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { formatAddressInline, mapDirectionsUrl, site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { trackEvent } from "@/lib/analytics";

export function CleanHero() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];
  const addressLine = formatAddressInline();
  const googleMapsUrl = site.mapSearchUrl;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(addressLine)}&z=16&output=embed`;

  return (
    <section id="home" className="bg-white pt-16 sm:pt-[4.5rem]">
      <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
        {/* Left — copy + CTAs */}
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:py-16 lg:pr-10">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{ background: brand.orangeSoft, color: brand.orangeDeep }}
            >
              <Shield className="size-3.5" aria-hidden />
              {es ? "Seguros bienvenidos" : "Insurance claims welcome"}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{ background: brand.mist, color: brand.navy }}
            >
              <Star className="size-3.5 fill-current" style={{ color: brand.star }} aria-hidden />
              4.8 Google
            </span>
          </div>

          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.steel }}
          >
            {es ? "Taller de carrocería · Paterson, NJ" : "Auto body shop · Paterson, NJ"}
          </p>

          <h1
            className="max-w-lg text-[2.15rem] font-black leading-[1.1] tracking-tight sm:text-5xl"
            style={{ color: brand.navy }}
          >
            {es ? (
              <>
                Estimados gratis.
                <br />
                <span style={{ color: brand.orange }}>Menos estrés con el seguro.</span>
              </>
            ) : (
              <>
                Free estimates.
                <br />
                <span style={{ color: brand.orange }}>Stress-free insurance help.</span>
              </>
            )}
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: brand.steel }}>
            {es
              ? "Colisión, pintura y mecánica en un solo taller. Cotiza por WhatsApp con fotos y datos del auto."
              : "Collision, paint, and mechanical under one roof. Quote on WhatsApp with photos and vehicle details."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() =>
                openQuote(es ? "Reclamo / cotización" : "Insurance / free estimate")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border-0 px-6 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
              style={{
                background: brandGradients.whatsappCta,
                boxShadow: "0 8px 24px rgba(37,211,102,0.28)",
              }}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Cotizar por WhatsApp" : "Get a WhatsApp quote"}
            </button>
            <a
              href={phone.tel}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold no-underline transition-transform active:scale-[0.98]"
              style={{
                color: brand.navy,
                background: brand.mist,
                border: `1px solid ${brand.steelLight}55`,
              }}
            >
              <Phone className="size-4" style={{ color: brand.orange }} aria-hidden />
              {phone.display}
            </a>
          </div>
        </div>

        {/* Right — Google address + map */}
        <div
          className="flex flex-col border-t lg:border-l lg:border-t-0"
          style={{ background: brand.paper, borderColor: "#E6EAEF" }}
        >
          <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
            <div className="flex items-start gap-3">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: brand.orangeSoft }}
              >
                <MapPin className="size-5" style={{ color: brand.orange }} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: brand.steel }}
                >
                  {es ? "Dirección en Google" : "Google address"}
                </p>
                <p className="mt-1 text-lg font-black leading-snug" style={{ color: brand.navy }}>
                  {site.name}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block text-[15px] font-medium leading-snug no-underline hover:underline"
                  style={{ color: brand.navy }}
                  onClick={() => trackEvent("directions_click", { source: "hero_address" })}
                >
                  {addressLine}
                </a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-xs font-bold no-underline"
                style={{ background: brand.white, color: brand.navy, border: "1px solid #E6EAEF" }}
                onClick={() => trackEvent("directions_click", { source: "hero_maps" })}
              >
                <ExternalLink className="size-3.5" aria-hidden />
                {es ? "Ver en Google Maps" : "Open in Google Maps"}
              </a>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-xs font-bold no-underline"
                style={{ background: brand.navy, color: "#fff" }}
                onClick={() => trackEvent("directions_click", { source: "hero_directions" })}
              >
                <Navigation className="size-3.5" aria-hidden />
                {es ? "Cómo llegar" : "Get directions"}
              </a>
            </div>

            {/* Embedded Google map fills remaining right-side space */}
            <div
              className="mt-5 min-h-[220px] flex-1 overflow-hidden rounded-2xl sm:min-h-[260px] lg:min-h-[280px]"
              style={{ border: "1px solid #E6EAEF", boxShadow: "0 4px 16px rgba(7,37,63,0.06)" }}
            >
              <iframe
                title={es ? "Mapa de Google — Sanchez Auto" : "Google Map — Sanchez Auto"}
                src={mapEmbedSrc}
                className="h-full min-h-[220px] w-full border-0 sm:min-h-[260px] lg:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
