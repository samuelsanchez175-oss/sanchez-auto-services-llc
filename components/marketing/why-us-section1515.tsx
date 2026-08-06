"use client";

import { Users, Car, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

const icons: React.ElementType[] = [Users, Car, ShieldCheck, Clock];

/** Keep the section tight — first four why-us cards only. */
export function WhyUsSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const cards = c.whyUs.cards.slice(0, 4);

  return (
    <section
      id="why-us"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: "#07253F" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p
              className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
              style={{ color: "#FB8C33" }}
              aria-hidden
            >
              {isEs ? "Por qué nosotros" : "Why choose us"}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {c.whyUs.title}
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {c.whyUs.lead}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openQuote()}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border-0 px-5 py-3 text-sm font-bold text-white sm:self-auto"
            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Hablar por WhatsApp" : "Talk on WhatsApp"}
          </button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = icons[i] ?? Users;
            return (
              <li
                key={card.title}
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(224,78,40,0.15)" }}
                >
                  <Icon className="size-5" style={{ color: "#FB8C33" }} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold text-white">{card.title}</p>
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
