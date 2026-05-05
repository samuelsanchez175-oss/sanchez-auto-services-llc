"use client";

import { Users, Car, ShieldCheck, DollarSign, Clock, Star } from "lucide-react";
import { useCatalog } from "@/lib/locale";

const icons: React.ElementType[] = [Users, Car, ShieldCheck, DollarSign, Clock, Star];

export function WhyUsSection() {
  const c = useCatalog();

  return (
    <section
      id="why-us"
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
          Why Choose Us
        </p>

        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {c.whyUs.title}
        </h2>
        <p
          className="mb-12 max-w-[520px] text-base leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {c.whyUs.lead}
        </p>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.whyUs.cards.map((card, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <li
                key={card.title}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex size-10 items-center justify-center rounded-lg shrink-0"
                  style={{ background: "rgba(224,78,40,0.15)" }}
                >
                  <Icon className="size-5" style={{ color: "#e04e28" }} aria-hidden />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">{card.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {card.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
