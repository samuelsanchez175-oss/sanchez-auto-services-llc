"use client";

import { MapPin, Clock } from "lucide-react";
import { formatAddressInline, site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export function HoursMapSection() {
  const c = useCatalog();
  const encoded = encodeURIComponent(formatAddressInline());
  const mapSrc = `https://maps.google.com/maps?q=${encoded}&z=16&output=embed`;

  return (
    <section
      id="hours"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: "#1a1520" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section label */}
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#e04e28" }}
          aria-hidden
        >
          Hours &amp; Location
        </p>

        <h2 className="mb-10 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {c.hours.title}
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: Address + Hours + phones */}
          <div className="space-y-5">
            {/* Address */}
            <div
              className="flex items-start gap-3 rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(224,78,40,0.15)" }}
              >
                <MapPin className="size-5" style={{ color: "#e04e28" }} aria-hidden />
              </div>
              <div>
                <p className="font-bold text-white mb-1">{site.name}</p>
                <a
                  href={site.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm no-underline transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {formatAddressInline()}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1.5px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Clock className="size-4" style={{ color: "#e04e28" }} aria-hidden />
                <p className="text-sm font-bold tracking-wide text-white">Business Hours</p>
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
              <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {c.hours.sundayNote}
              </p>
            </div>

            {/* Phone CTAs */}
            <div className="flex flex-wrap gap-3">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  className="inline-flex flex-col rounded-xl px-5 py-3.5 no-underline transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(165deg, #e06030 0%, #c03020 46%, #a01c10 100%)",
                    boxShadow: "0 4px 20px rgba(192,48,32,0.35)",
                  }}
                >
                  <span className="font-bold text-base text-white">{p.display}</span>
                  <span className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {p.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div className="space-y-3">
            <h3 className="sr-only">{c.hours.mapHeading}</h3>
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: "1.5px solid rgba(255,255,255,0.08)" }}
            >
              <div className="aspect-[4/3]">
                <iframe
                  title="Google map — Sanchez Auto Services LLC vicinity"
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
                href={site.mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:underline"
                style={{ color: "rgba(255,255,255,0.45)" }}
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
