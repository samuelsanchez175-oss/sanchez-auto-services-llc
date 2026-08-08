"use client";

import { MessageCircle } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brandGradients } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

/** Fixed WhatsApp conversion control for desktop (mobile uses sticky bar). */
export function DesktopWhatsAppFloat() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("quote_open", { source: "desktop_float" });
        openQuote(isEs ? "Cotización general" : "General quote");
      }}
      className="fixed bottom-6 right-6 z-[55] hidden cursor-pointer items-center gap-2 rounded-full border-0 px-5 py-3.5 text-sm font-bold text-white shadow-xl transition-transform hover:scale-[1.03] active:scale-[0.98] lg:inline-flex"
      style={{
        background: brandGradients.whatsappCta,
        boxShadow: "0 10px 32px rgba(37,211,102,0.4)",
      }}
      aria-label={isEs ? "Pedir estimado" : "Get an estimate"}
    >
      <MessageCircle className="size-5" aria-hidden />
      {isEs ? "Pedir estimado" : "Get an estimate"}
    </button>
  );
}
