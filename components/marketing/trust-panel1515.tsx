"use client";

import { CheckCircle } from "lucide-react";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export function TrustPanelSection() {
  const c = useCatalog();

  return (
    <section
      id="trust"
      className="scroll-mt-20 py-14"
      style={{ background: "#fdf7f5" }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden px-4 sm:grid-cols-3 sm:px-6">
        {/* Left headline */}
        <div className="space-y-2 sm:col-span-1">
          <p
            className="text-[9px] font-bold uppercase tracking-[0.35em]"
            style={{ color: "#FB8C33" }}
          >
            {site.name.replace(" LLC", "").toUpperCase()}
          </p>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#281c30" }}>
            {c.trustStrip.title}
          </h2>
          <p className="text-sm" style={{ color: "#6b6080" }}>
            {c.locale === "es"
              ? "Credibilidad clara antes de ordenar trabajo mayor."
              : "Plain-language reassurance before rubber meets the hoist."}
          </p>
        </div>

        {/* Right trust bullets */}
        <div className="grid gap-3 sm:col-span-2">
          {c.trustStrip.bullets.map((line) => (
            <div
              key={line}
              className="flex items-start gap-3 rounded-xl p-4 text-sm"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e8ded8",
                color: "#392f3d",
                boxShadow: "0 2px 8px rgba(26,21,32,0.04)",
              }}
            >
              <CheckCircle className="mt-0.5 size-4 shrink-0" style={{ color: "#FB8C33" }} aria-hidden />
              <p className="leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
