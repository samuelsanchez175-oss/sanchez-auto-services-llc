"use client";

import { Shield, Star, Clock, MapPin } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";

export function CleanTrust() {
  const { locale } = useCatalog();
  const es = locale === "es";

  const items = es
    ? [
        { icon: Shield, label: "Seguros bienvenidos", sub: "Todas las compañías" },
        { icon: Star, label: "4.8 en Google", sub: "Reseñas locales" },
        { icon: Clock, label: "Lun–Sáb 9–6", sub: "Domingo: llame" },
        { icon: MapPin, label: "Paterson, NJ", sub: "99 E Railway Ave" },
      ]
    : [
        { icon: Shield, label: "Insurance welcome", sub: "All major carriers" },
        { icon: Star, label: "4.8 on Google", sub: "Local reviews" },
        { icon: Clock, label: "Mon–Sat 9–6", sub: "Sunday: call ahead" },
        { icon: MapPin, label: "Paterson, NJ", sub: "99 E Railway Ave" },
      ];

  return (
    <section
      className="border-y"
      style={{ background: brand.paper, borderColor: "#E6EAEF" }}
      aria-label={es ? "Confianza" : "Trust"}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "#E6EAEF" }}>
        {items.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-start gap-2 px-5 py-6 sm:px-6"
            style={{ background: brand.paper }}
          >
            <Icon className="size-5" style={{ color: brand.orange }} aria-hidden />
            <p className="text-sm font-bold" style={{ color: brand.navy }}>
              {label}
            </p>
            <p className="text-xs" style={{ color: brand.steel }}>
              {sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
