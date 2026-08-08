"use client";

import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site-content";
import { brand } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { openWhatsAppChat } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

/**
 * Simple estimate section — one WhatsApp tap, optional call. No long form.
 */
export function CleanQuote() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];

  return (
    <section id="quote" className="nw-section scroll-mt-28" style={{ background: brand.white }}>
      <div className="nw-wrap">
        <div
          className="mx-auto max-w-2xl border px-6 py-10 text-center sm:px-10 sm:py-12"
          style={{
            background: brand.paper,
            borderColor: "#E6EAEF",
            borderRadius: "0.25rem",
          }}
        >
          <p className="nw-kicker">{es ? "Estimado" : "Estimate"}</p>
          <h2 className="nw-h2">{es ? "Pide un estimado por WhatsApp" : "Get an estimate on WhatsApp"}</h2>
          <p className="nw-lead mx-auto mt-3 max-w-md">
            {es
              ? "Abre el formulario corto (auto + daño) y envía por WhatsApp al taller."
              : "Open the short form (vehicle + damage), then send it on WhatsApp to the shop."}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="nw-btn"
              onClick={() => openQuote(es ? "Estimado general" : "General estimate")}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Pedir estimado" : "Get an estimate"}
            </button>
            <button
              type="button"
              className="nw-btn nw-btn--navy"
              onClick={() => openWhatsAppChat("quote_section_chat")}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Chatear" : "Chat"}
            </button>
            <a
              href={phone.tel}
              className="nw-btn nw-btn--orange no-underline"
              onClick={() => trackEvent("call_click", { source: "quote_section" })}
            >
              <Phone className="size-5" aria-hidden />
              {es ? "Llamar" : "Call"}
            </a>
          </div>

          <p className="mt-5 text-xs" style={{ color: brand.steelLight }}>
            {es
              ? "Seguros bienvenidos · fotos por WhatsApp ayudan a un estimado más rápido."
              : "Insurance welcome · photos on WhatsApp help us estimate faster."}
          </p>
        </div>
      </div>
    </section>
  );
}
