"use client";

import { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

const FAQ = [
  {
    qEn: "What should I do after an accident?",
    qEs: "¿Qué hago después de un accidente?",
    aEn: "Stay safe, document the scene, file a police report if needed, call your insurer, then WhatsApp us photos of the damage + year/make/model. We help with the body-shop side of the claim.",
    aEs: "Mantente seguro, documenta la escena, reporte policial si aplica, llama a tu seguro, y envíanos por WhatsApp fotos del daño + año/marca/modelo. Ayudamos con la parte del taller del reclamo.",
  },
  {
    qEn: "Do you work with Progressive, GEICO, State Farm, NJM?",
    qEs: "¿Trabajan con Progressive, GEICO, State Farm, NJM?",
    aEn: "Yes — insurance claims are welcome. We also handle cash jobs if you prefer not to file. Bring your claim number when you have it.",
    aEs: "Sí — seguros bienvenidos. También trabajos de contado si no quieres abrir reclamo. Trae el número de reclamo si lo tienes.",
  },
  {
    qEn: "Will my deductible be the only thing I pay?",
    qEs: "¿Solo pago el deducible?",
    aEn: "Often yes for covered collision work, but supplements can appear if hidden damage is found. We explain options before major work and keep you (and the adjuster) in the loop.",
    aEs: "A menudo sí en colisión cubierta, pero pueden salir suplementos si hay daño oculto. Explicamos opciones antes de trabajo mayor y te mantenemos al tanto.",
  },
  {
    qEn: "Can I get a free estimate without dropping off?",
    qEs: "¿Puedo tener estimado gratis sin dejar el auto?",
    aEn: "Yes. Send clear photos on WhatsApp (3–6 angles). We give a shop-ready starting estimate; final may change after in-person inspection.",
    aEs: "Sí. Envía fotos claras por WhatsApp (3–6 ángulos). Damos un estimado inicial; el final puede cambiar tras inspección en el taller.",
  },
  {
    qEn: "How long will my car be in the shop?",
    qEs: "¿Cuánto tiempo estará el auto en el taller?",
    aEn: "Depends on parts, paint, and insurance approvals. Mechanical jobs can be same-day; full collision often needs several days to a couple of weeks. We update you as the schedule firms up.",
    aEs: "Depende de repuestos, pintura y aprobaciones del seguro. Mecánica puede ser el mismo día; colisión completa a menudo varios días o más. Te actualizamos al firmar el calendario.",
  },
] as const;

export function CleanInsuranceFaq() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="nw-section scroll-mt-28" style={{ background: brand.white }}>
      <div className="nw-wrap">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="nw-kicker">
            <Shield className="mr-1.5 inline size-3.5 align-[-2px]" style={{ color: brand.orange }} />
            {es ? "Seguros y reclamos" : "Insurance & claims"}
          </p>
          <h2 className="nw-h2">
            {es ? "Preguntas frecuentes" : "Common questions"}
          </h2>
          <p className="nw-lead">
            {es
              ? "Después del accidente, el deducible y el estimado — en palabras simples."
              : "After the wreck, deductibles, and estimates — in plain language."}
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-2">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.qEn}
                className="border border-[#E6EAEF]"
                style={{ borderRadius: "0.25rem", background: brand.paper }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 border-0 bg-transparent px-4 py-3.5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-extrabold" style={{ color: brand.navy }}>
                    {es ? item.qEs : item.qEn}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: brand.orange }}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-[#E6EAEF] px-4 py-3 text-sm leading-relaxed" style={{ color: brand.steel }}>
                    {es ? item.aEs : item.aEn}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            className="nw-btn nw-btn--wa"
            onClick={() => {
              trackEvent("quote_click", { source: "insurance_faq" });
              openQuote(es ? "Reclamo de seguro" : "Insurance claim");
            }}
          >
            {es ? "Empezar estimado de reclamo" : "Start a claim estimate"}
          </button>
        </div>
      </div>
    </section>
  );
}
