"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import {
  areasServed,
  formatAddressInline,
  mapDirectionsUrl,
  site,
  schedule,
} from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { getShopOpenStatus } from "@/lib/shop-hours";
import { trackEvent } from "@/lib/analytics";

/**
 * Network locations presentation — large photo card + hours + embed map.
 */
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
    <section id="hours" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap">
        <div className="nw-center mx-auto mb-12 max-w-2xl">
          <p className="nw-kicker">{es ? "Ubicación" : "Location"}</p>
          <h2 className="nw-h2">
            {es
              ? "Contacta nuestro taller en Paterson"
              : "Contact our Paterson location for assistance"}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Network-style location photo card */}
          <a
            href={site.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nw-photo group relative block min-h-[320px] no-underline sm:min-h-[400px]"
            onClick={() => trackEvent("directions_click", { source: "location_card" })}
          >
            <Image
              src="/gallery/shop-4.jpg"
              alt={`${site.name} at ${formatAddressInline()}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="nw-photo-overlay" />
            <div className="nw-photo-caption">
              <h3>{site.name}</h3>
              <p className="flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                {formatAddressInline()}
              </p>
            </div>
          </a>

          <div className="flex flex-col gap-4">
            <div
              className="flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-bold"
              style={{
                background: status.isOpen ? "rgba(37,211,102,0.12)" : "#F2F4F6",
                color: status.isOpen ? "#128C7E" : "#878D93",
              }}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: status.isOpen ? "#25D366" : "#878D93" }}
              />
              {es ? status.labelEs : status.labelEn}
            </div>

            <div className="border border-[#E6EAEF] p-5" style={{ borderRadius: "0.25rem" }}>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold" style={{ color: "#07253F" }}>
                <Clock className="size-4" style={{ color: "#FB8C33" }} aria-hidden />
                {es ? "Horario" : "Hours"}
              </div>
              <ul className="space-y-2">
                {schedule.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-4 text-sm"
                    style={{ color: "#5c6570" }}
                  >
                    <span className="font-semibold" style={{ color: "#07253F" }}>
                      {row.days}
                    </span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  className="nw-btn nw-btn--navy min-h-[48px] w-full whitespace-nowrap no-underline sm:w-auto"
                  onClick={() => trackEvent("call_click", { source: "location" })}
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {p.display}
                </a>
              ))}
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nw-btn nw-btn--orange min-h-[48px] w-full whitespace-nowrap no-underline sm:w-auto"
                onClick={() => trackEvent("directions_click", { source: "location" })}
              >
                <Navigation className="size-4 shrink-0" aria-hidden />
                {es ? "Cómo llegar" : "Get directions"}
              </a>
              <a
                href={site.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 text-sm font-bold no-underline transition hover:bg-black/[0.03] sm:w-auto"
                style={{
                  borderColor: "#D8DEE4",
                  color: "#07253F",
                  borderRadius: "0.25rem",
                  background: "#fff",
                }}
                onClick={() => trackEvent("directions_click", { source: "location_gbp" })}
              >
                Google Business
              </a>
            </div>

            <div
              className="min-h-[200px] flex-1 overflow-hidden border border-[#E6EAEF]"
              style={{ borderRadius: "0.25rem" }}
            >
              <iframe
                title={es ? "Mapa — Sanchez Auto" : "Map — Sanchez Auto"}
                src={mapSrc}
                className="h-full min-h-[200px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Areas served — folded in from standalone section */}
        <div className="mt-10 border-t pt-8" style={{ borderColor: "#E6EAEF" }}>
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#FB8C33" }}>
            {es ? "Área de servicio" : "Service area"}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "#5c6570" }}>
            {es
              ? "Atendemos Paterson y ciudades cercanas en el condado de Passaic — cotizaciones por WhatsApp y seguros bienvenidos."
              : "Serving Paterson and nearby Passaic County towns — WhatsApp estimates and insurance claims welcome."}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={es ? "Ciudades" : "Cities served"}>
            {areasServed.map((city) => (
              <li key={city}>
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: "#fff",
                    color: "#07253F",
                    border: "1px solid #E6EAEF",
                  }}
                >
                  {city}
                  {city === "Paterson" ? ", NJ" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
