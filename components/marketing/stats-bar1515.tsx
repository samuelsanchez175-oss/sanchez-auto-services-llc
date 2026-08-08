"use client";

import { FileCheck, MapPin, MessageCircle, Shield } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";

const STATS = [
  {
    icon: Shield,
    valueEn: "Insurance",
    valueEs: "Seguros",
    labelEn: "Claims welcome",
    labelEs: "Reclamos bienvenidos",
  },
  {
    icon: FileCheck,
    valueEn: "Estimates",
    valueEs: "Estimados",
    labelEn: "Documented for adjusters",
    labelEs: "Documentados para ajustadores",
  },
  {
    icon: MapPin,
    valueEn: "Paterson",
    valueEs: "Paterson",
    labelEn: "99 E Railway Ave",
    labelEs: "99 E Railway Ave",
  },
  {
    icon: MessageCircle,
    valueEn: "WhatsApp",
    valueEs: "WhatsApp",
    labelEn: "Fast claim quotes",
    labelEs: "Cotización de reclamo",
  },
] as const;

export function StatsBarSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      aria-label={isEs ? "Confianza e seguros" : "Trust & insurance"}
      className="relative z-10 border-y"
      style={{
        background: `linear-gradient(180deg, ${brand.navy} 0%, ${brand.navyDeep} 100%)`,
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.labelEn}
              className="flex flex-col items-center gap-1.5 px-3 py-6 text-center sm:py-7"
            >
              <Icon className="mb-1 size-4" style={{ color: "#FB8C33" }} aria-hidden />
              <p className="text-lg font-black tracking-tight text-white sm:text-xl">
                {isEs ? s.valueEs : s.valueEn}
              </p>
              <p
                className="text-[11px] font-medium leading-snug"
                style={{ color: "rgba(232,238,245,0.5)" }}
              >
                {isEs ? s.labelEs : s.labelEn}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-center border-t px-4 py-3 sm:hidden"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <button
          type="button"
          onClick={() =>
            openQuote(isEs ? "Reclamo de seguro" : "Insurance claim")
          }
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: brand.whatsapp }}
        >
          {isEs ? "Cotizar reclamo →" : "Quote my claim →"}
        </button>
      </div>
    </section>
  );
}
