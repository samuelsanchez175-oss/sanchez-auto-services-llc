"use client";

import { Car, MessageCircle, Wrench } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

const STEPS = [
  {
    icon: Car,
    n: "01",
    titleEn: "Tell us the car & problem",
    titleEs: "Dinos el auto y el problema",
    bodyEn: "Year, make, model, and what happened — takes under a minute.",
    bodyEs: "Año, marca, modelo y qué pasó — menos de un minuto.",
  },
  {
    icon: MessageCircle,
    n: "02",
    titleEn: "We open WhatsApp with your details",
    titleEs: "Abrimos WhatsApp con tus datos",
    bodyEn: "A structured message hits our shop phone — ready to quote, not a blank “hi”.",
    bodyEs: "Un mensaje estructurado llega al taller — listo para cotizar, no un “hola” vacío.",
  },
  {
    icon: Wrench,
    n: "03",
    titleEn: "Get a real quote & book in",
    titleEs: "Cotización real y cita",
    bodyEn: "We reply fast, answer insurance questions, and schedule your drop-off.",
    bodyEs: "Respondemos rápido, ayudamos con el seguro y agendamos tu cita.",
  },
] as const;

export function HowItWorksSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 py-12 sm:py-16"
      style={{ background: "#001830" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <p
            className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "#FB8C33" }}
          >
            {isEs ? "Cómo funciona" : "How it works"}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {isEs
              ? "Del reclamo al taller en 3 pasos"
              : "From claim to shop in 3 steps"}
          </h2>
          <p
            className="mx-auto mt-2 max-w-lg text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {isEs
              ? "Seguros bienvenidos. WhatsApp con datos del auto y el daño — listo para el ajustador y el taller."
              : "Insurance claims welcome. WhatsApp with vehicle + damage details — ready for your adjuster and our bay."}
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="relative flex flex-col gap-3 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(37,211,102,0.12)",
                      border: "1px solid rgba(37,211,102,0.25)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: "#25d366" }} aria-hidden />
                  </div>
                  <span
                    className="font-mono text-xs font-bold tracking-widest"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {step.n}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {isEs ? step.titleEs : step.titleEn}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {isEs ? step.bodyEs : step.bodyEn}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => openQuote()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-0 px-7 py-3.5 text-sm font-black text-white transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg,#25d366,#128c7e)",
              boxShadow: "0 6px 24px rgba(37,211,102,0.28)",
            }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Empezar cotización por WhatsApp" : "Start WhatsApp quote"}
          </button>
        </div>
      </div>
    </section>
  );
}
