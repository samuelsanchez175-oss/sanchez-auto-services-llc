"use client";

import { Camera, ClipboardCheck, Hammer, KeyRound } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { MessageCircle } from "lucide-react";

const ICONS = [ClipboardCheck, Camera, Hammer, KeyRound] as const;

export function ProcessSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const steps = c.process.steps;

  return (
    <section
      id="process"
      className="scroll-mt-16 py-14 sm:py-20"
      style={{ background: "#F4F7FB" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p
            className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "#07253F" }}
          >
            {isEs ? "Tu experiencia" : "Your visit"}
          </p>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl" style={{ color: "#07253F" }}>
            {c.process.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: "#6b6080" }}>
            {c.process.lead}
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = ICONS[i] ?? ClipboardCheck;
            return (
              <li
                key={step.title}
                className="relative flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm"
                style={{ border: "1px solid #D5DEE8" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ background: "rgba(26,95,158,0.1)" }}
                  >
                    <Icon className="size-5" style={{ color: "#07253F" }} aria-hidden />
                  </div>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: "rgba(26,21,32,0.2)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-bold" style={{ color: "#07253F" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6080" }}>
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div
          className="mt-8 flex flex-col items-start gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          style={{
            background: "linear-gradient(135deg, #07253F 0%, #0F2C45 100%)",
            boxShadow: "0 12px 40px rgba(11,31,58,0.22)",
            border: "1px solid rgba(126,182,232,0.2)",
          }}
        >
          <div>
            <p
              className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "#FB8C33" }}
            >
              {isEs ? "Seguros" : "Insurance friendly"}
            </p>
            <p className="text-sm font-bold text-white sm:text-base">
              {isEs
                ? "¿Accidente o reclamo de seguro?"
                : "Accident or insurance claim?"}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(232,238,245,0.6)" }}>
              {isEs
                ? "Todos los seguros son bienvenidos. Envía fotos, número de reclamo y datos del auto por WhatsApp — documentamos el daño y ayudamos con el ajustador."
                : "All major insurers welcome. Send photos, claim number, and vehicle info on WhatsApp — we document damage and help with your adjuster."}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              openQuote(isEs ? "Reclamo de seguro / colisión" : "Insurance claim / collision")
            }
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border-0 px-5 py-3.5 text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Cotizar reclamo" : "Quote my claim"}
          </button>
        </div>
      </div>
    </section>
  );
}
