"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { formatAddressInline, mapDirectionsUrl, site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { getShopOpenStatus } from "@/lib/shop-hours";
import { trackEvent } from "@/lib/analytics";
import { brand } from "@/lib/brand";

export function HoursMapSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const encoded = encodeURIComponent(formatAddressInline());
  const mapSrc = `https://maps.google.com/maps?q=${encoded}&z=16&output=embed`;
  const [status, setStatus] = useState(() => getShopOpenStatus());

  useEffect(() => {
    setStatus(getShopOpenStatus());
    const id = window.setInterval(() => setStatus(getShopOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hours"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: brand.navy }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: brand.orange }}
          aria-hidden
        >
          Hours &amp; Location
        </p>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {c.hours.title}
          </h2>
          <div
            className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: status.isOpen
                ? "rgba(37,211,102,0.15)"
                : "rgba(255,255,255,0.08)",
              color: status.isOpen ? "#86efac" : "rgba(255,255,255,0.7)",
              border: status.isOpen
                ? "1px solid rgba(37,211,102,0.35)"
                : "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              className="size-2 rounded-full"
              style={{ background: status.isOpen ? "#25d366" : brand.steel }}
              aria-hidden
            />
            {isEs ? status.labelEs : status.labelEn}
          </div>
        </div>
        <p className="mb-8 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {isEs ? status.detailEs : status.detailEn}
        </p>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5">
            <div
              className="flex items-start gap-3 rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: brand.orangeSoft }}
              >
                <MapPin className="size-5" style={{ color: brand.orange }} aria-hidden />
              </div>
              <div>
                <p className="mb-1 font-bold text-white">{site.name}</p>
                <a
                  href={site.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm no-underline transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  onClick={() => trackEvent("directions_click", { source: "hours_address" })}
                >
                  {formatAddressInline()}
                </a>
                <p className="mt-1 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {isEs
                    ? "Mismo nombre, dirección y teléfono que en Google Business."
                    : "Same name, address & phone as our Google Business Profile."}
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Clock className="size-4" style={{ color: brand.orange }} aria-hidden />
                <p className="text-sm font-bold tracking-wide text-white">
                  {isEs ? "Horario" : "Business hours"}
                </p>
              </div>
              <ul className="space-y-0">
                {c.scheduleRows.map(([days, hrs]) => (
                  <li
                    key={days}
                    className="flex justify-between gap-4 py-3 text-sm"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>
                      {days}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.50)" }}>{hrs}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                {c.hours.sundayNote}{" "}
                {isEs
                  ? "WhatsApp acepta mensajes a cualquier hora; respondemos en horario de taller."
                  : "WhatsApp accepts messages anytime; we reply during shop hours."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  onClick={() => trackEvent("call_click", { line: p.display })}
                  className="inline-flex flex-col rounded-xl px-5 py-3.5 no-underline transition-all hover:opacity-90"
                  style={{
                    background: brandGradientsOrange(),
                    boxShadow: "0 4px 20px rgba(251,140,51,0.3)",
                  }}
                >
                  <span className="text-base font-bold text-white">{p.display}</span>
                  <span className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {p.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="sr-only">{c.hours.mapHeading}</h3>
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: "1.5px solid rgba(255,255,255,0.08)" }}
            >
              <div className="aspect-[4/3]">
                <iframe
                  title="Google map — Sanchez Auto Services LLC, Paterson NJ"
                  src={mapSrc}
                  className="h-full min-h-[280px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-center text-sm">
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:underline"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onClick={() => trackEvent("directions_click", { source: "hours_map" })}
              >
                {c.hours.directionsLink}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function brandGradientsOrange() {
  return "linear-gradient(165deg, #FB8C33 0%, #E07020 100%)";
}
