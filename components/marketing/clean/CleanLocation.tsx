"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { formatAddressInline, mapDirectionsUrl, site, schedule } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { getShopOpenStatus } from "@/lib/shop-hours";
import { brand } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

export function CleanLocation() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const [status, setStatus] = useState(() => getShopOpenStatus());
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(formatAddressInline())}&z=16&output=embed`;

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getShopOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="hours" className="scroll-mt-20 py-14 sm:py-20" style={{ background: brand.navy }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: brand.orange }}
            >
              {es ? "Visítanos" : "Visit us"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {es ? "Horario y ubicación" : "Hours & location"}
            </h2>
          </div>
          <span
            className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: status.isOpen ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.08)",
              color: status.isOpen ? "#86efac" : "rgba(255,255,255,0.75)",
            }}
          >
            <span
              className="size-2 rounded-full"
              style={{ background: status.isOpen ? brand.whatsapp : brand.steel }}
            />
            {es ? status.labelEs : status.labelEn}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0" style={{ color: brand.orange }} />
                <div>
                  <p className="font-bold text-white">{site.name}</p>
                  <a
                    href={site.mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm no-underline hover:underline"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {formatAddressInline()}
                  </a>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Clock className="size-4" style={{ color: brand.orange }} />
                <p className="text-sm font-bold text-white">{es ? "Horario" : "Hours"}</p>
              </div>
              <ul className="space-y-2">
                {schedule.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4 text-sm">
                    <span style={{ color: "rgba(255,255,255,0.85)" }}>{row.days}</span>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{row.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                {es ? status.detailEs : status.detailEn}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  onClick={() => trackEvent("call_click", { line: p.display })}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white no-underline"
                  style={{ background: brand.orange }}
                >
                  <Phone className="size-4" />
                  {p.display}
                </a>
              ))}
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-bold no-underline"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                onClick={() => trackEvent("directions_click", { source: "clean_location" })}
              >
                {es ? "Cómo llegar" : "Directions"}
              </a>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <iframe
              title="Map — Sanchez Auto Services LLC"
              src={mapSrc}
              className="h-full min-h-[300px] w-full border-0 lg:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
