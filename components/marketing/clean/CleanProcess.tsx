"use client";

import { MessageCircle } from "lucide-react";
import { brand } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

/**
 * Process / estimate strip — CTA only.
 * Full “How it works” (icon steps) lives inside the estimate modal.
 */
export function CleanProcess() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      id="process"
      className="nw-section scroll-mt-28"
      style={{ background: brand.white }}
    >
      <div className="nw-wrap">
        <div className="nw-center mx-auto max-w-xl">
          <p className="nw-kicker">{es ? "Estimado en línea" : "Online estimate"}</p>
          <h2 className="nw-h2">{es ? "Cómo funciona" : "How it works"}</h2>
          <p className="nw-lead">
            {es
              ? "Tres pasos simples: formulario, fotos en WhatsApp y envío. Ábrelo con el botón de abajo."
              : "Three simple steps: form, photos in WhatsApp, and send. Open it with the button below."}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              className="nw-btn"
              onClick={() => openQuote(es ? "Estimado general" : "General estimate")}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Pedir estimado" : "Get an estimate"}
            </button>
            <p className="text-center text-xs" style={{ color: brand.steelLight }}>
              {es
                ? "Abre el formulario y los pasos al lado — luego WhatsApp."
                : "Opens the form with steps beside it — then WhatsApp."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
