"use client";

import { AlertTriangle, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

const PROBLEMS = [
  {
    problem: "Check engine light won't turn off",
    problemEs: "La luz de \"Check Engine\" no se apaga",
    solution: "We run full OBD diagnostics and fix the root cause — not just reset the code",
    solutionEs: "Diagnóstico completo OBD para corregir la causa real, no solo borrar el código",
  },
  {
    problem: "Someone hit your parked car",
    problemEs: "Alguien chocó tu carro estacionado",
    solution: "Collision & body repair that restores it to pre-accident condition, with photos for insurance",
    solutionEs: "Reparación de carrocería que lo deja como nuevo, con fotos para el seguro",
  },
  {
    problem: "Car shakes or pulls to one side",
    problemEs: "El carro vibra o jala hacia un lado",
    solution: "Suspension, alignment & steering — fixed right so it handles like new",
    solutionEs: "Suspensión, alineación y dirección reparadas correctamente para que maneje como nuevo",
  },
  {
    problem: "Brakes feel soft or make noise",
    problemEs: "Los frenos se sienten blandos o hacen ruido",
    solution: "Same-day brake inspection and replacement with quality parts",
    solutionEs: "Inspección y cambio de frenos el mismo día con partes de calidad",
  },
  {
    problem: "AC blowing warm air in summer",
    problemEs: "El AC sopla aire caliente en verano",
    solution: "A/C recharge and leak diagnosis — back to ice cold, fast",
    solutionEs: "Recarga de A/C y diagnóstico de fugas — frío de nuevo, rápido",
  },
  {
    problem: "Engine losing power or burning oil",
    problemEs: "El motor pierde potencia o quema aceite",
    solution: "Engine diagnostics, rebuilds, and full mechanical repair by hands-on mechanics",
    solutionEs: "Diagnóstico de motor, reconstrucción y reparación mecánica completa por mecánicos expertos",
  },
] as const;

export function ProblemsSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section className="relative overflow-hidden py-14 sm:py-20" style={{ background: "#090910" }}>
      {/* Subtle gradient edge */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224,78,40,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "#FB8C33" }}
          >
            {isEs ? "Problemas que resolvemos" : "Problems We Solve"}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {isEs ? "¿Te suena familiar? Nosotros te ayudamos." : "Sound familiar? We can help."}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
            {isEs
              ? "Cada problema tiene solución. Escríbenos y te respondemos rápido."
              : "Every problem has a fix. Message us and we'll respond fast."}
          </p>
        </div>

        {/* Problem / Solution grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl p-4 sm:p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Problem */}
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: "rgba(255,180,50,0.85)" }}
                  aria-hidden
                />
                <p
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  {isEs ? item.problemEs : item.problem}
                </p>
              </div>

              {/* Divider arrow */}
              <div className="flex items-center gap-2 px-1">
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                <ArrowRight className="size-3 shrink-0" style={{ color: "#FB8C33" }} aria-hidden />
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Solution */}
              <div className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: "#25d366" }}
                  aria-hidden
                />
                <p className="text-sm font-bold leading-snug text-white">
                  {isEs ? item.solutionEs : item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA → structured WhatsApp quote */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => openQuote(isEs ? "Problema con mi carro" : "Problem with my car")}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-2xl border-0 px-7 py-4 text-sm font-black text-white transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg,#25d366,#128c7e)",
              boxShadow: "0 6px 24px rgba(37,211,102,0.30)",
            }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Pedir cotización por WhatsApp" : "Get a free quote on WhatsApp"}
          </button>
        </div>
      </div>
    </section>
  );
}
