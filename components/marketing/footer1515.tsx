"use client";

import Link from "next/link";
import { Phone, MapPin, ExternalLink } from "lucide-react";

import { formatAddressInline, site, schedule } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export function Footer() {
  const year = new Date().getFullYear();
  const c = useCatalog();

  return (
    <footer style={{ background: "#0d0d0f", color: "#a09cb0" }}>
      {/* Main footer grid */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="text-base font-bold tracking-tight text-white">SANCHEZ AUTO</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#e04e28" }}>
                Services LLC
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-3.5 shrink-0" style={{ color: "#e04e28" }} aria-hidden />
              <a
                href={site.mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:text-white"
                style={{ color: "inherit" }}
              >
                {formatAddressInline()}
              </a>
            </div>
            <div className="space-y-2">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  className="flex items-center gap-2 text-sm font-medium no-underline transition-colors hover:text-white"
                  style={{ color: "#e04e28" }}
                >
                  <Phone className="size-3.5 shrink-0" aria-hidden />
                  {p.display}
                  <span className="hidden font-normal sm:inline" style={{ color: "#5a5470" }}>
                    ({p.label})
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.20em] text-white">Services</p>
            <ul className="space-y-2 text-sm">
              {["Collision Repair", "Paint & Refinishing", "Engine Repair", "General Mechanics",
                "Diagnostics", "Brake Service", "Oil Changes"].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="no-underline transition-colors hover:text-white"
                    style={{ color: "inherit" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.20em] text-white">Hours</p>
            <ul className="space-y-2 text-sm">
              {schedule.map((row) => (
                <li key={row.days} className="flex flex-col gap-0.5">
                  <span className="font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>
                    {row.days}
                  </span>
                  <span className="text-xs" style={{ color: "#5a5470" }}>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.20em] text-white">{c.footer.connected}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 no-underline transition-colors hover:text-white"
                  style={{ color: "inherit" }}
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  {c.footer.facebook}
                </Link>
              </li>
              <li>
                <Link
                  href={site.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline transition-colors hover:text-white"
                  style={{ color: "inherit" }}
                >
                  {c.footer.directions}
                </Link>
              </li>
              <li>
                <Link
                  href="#quote"
                  className="no-underline transition-colors hover:text-white"
                  style={{ color: "inherit" }}
                >
                  {c.nav.quote}
                </Link>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
              <Link href="/privacy" className="no-underline hover:text-white" style={{ color: "#5a5470" }}>
                {c.nav.privacy}
              </Link>
              <Link href="/terms" className="no-underline hover:text-white" style={{ color: "#5a5470" }}>
                {c.nav.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <p className="text-center text-xs" style={{ color: "#4a4460" }}>
            {c.footer.legalNote.replace("{year}", String(year)).replace("{name}", site.name)}
          </p>
        </div>
      </div>
    </footer>
  );
}
