"use client";

import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { ServicesGridDense } from "@/components/marketing/services-grid1515";

export function ServicesSection() {
  const c = useCatalog();

  return (
    <section
      id="services"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: "#f5f0eb" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section label — Harmony Stack style */}
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#FB8C33" }}
          aria-hidden
        >
          Services
        </p>

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#07253F" }}>
              {c.services.title === "Services" ? "Everything Your Car Needs" : c.services.title}
            </h2>
            <p className="mt-2 max-w-[520px] text-base leading-relaxed" style={{ color: "#6b6080" }}>
              {c.services.leadTemplate.replace("{name}", site.name)}
            </p>
          </div>
          <a
            href="/services"
            className="shrink-0 text-sm font-semibold no-underline transition-opacity hover:opacity-80"
            style={{ color: "#FB8C33" }}
          >
            {c.nav.pagesServices} →
          </a>
        </div>

        <ServicesGridDense />

        {/* Bottom CTA strip */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl px-6 py-5 sm:flex-row"
          style={{
            background: "linear-gradient(165deg, #e06030 0%, #E07020 46%, #a01c10 100%)",
            boxShadow: "0 4px 24px rgba(192,48,32,0.28)",
          }}
        >
          <div>
            <p className="font-bold text-lg text-white">Not sure what you need?</p>
            <p className="mt-0.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              Call us and describe the problem — we&apos;ll figure it out together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {site.phones.map((p) => (
              <a
                key={p.tel}
                href={p.tel}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.30)",
                }}
              >
                {p.display}
                <span className="text-xs opacity-60">({p.label})</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
