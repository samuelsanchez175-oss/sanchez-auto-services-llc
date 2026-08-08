"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "sanchez-newsletter-emails";

/**
 * Newsletter signup — prefers NEXT_PUBLIC_FORM_ENDPOINT (Formspree, etc.).
 * Without it, still works via WhatsApp notify + localStorage, with clear copy.
 */
export function CleanNewsletter() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const hasFormEndpoint = Boolean(process.env.NEXT_PUBLIC_FORM_ENDPOINT);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email: value,
            form: "newsletter",
            source: "website",
          }),
        });
        if (!res.ok) throw new Error("form failed");
      } else {
        // Persist locally for the browser + ping shop
        try {
          const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
          if (!prev.includes(value)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...prev, value]));
          }
        } catch {
          /* ignore */
        }
        openWhatsAppWithMessage(
          es
            ? `📬 *NEWSLETTER*\nNuevo email: ${value}\nFuente: sitio web`
            : `📬 *NEWSLETTER*\nNew email: ${value}\nSource: website`,
          { source: "newsletter", service: "newsletter" },
        );
      }
      trackEvent("quote_open", { service: "newsletter" });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-28 py-14 sm:py-16"
      style={{ background: brand.navy }}
      data-arrow-theme="dark"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Mail className="mx-auto size-8 text-white/80" aria-hidden />
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {es ? "Boletín por email" : "Email newsletter"}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/75">
          {es
            ? "Tips de mantenimiento, ofertas del taller y actualizaciones. Sin spam."
            : "Maintenance tips, shop updates, and offers. No spam."}
        </p>
        {!hasFormEndpoint ? (
          <p className="mx-auto mt-2 max-w-md text-[11px] text-white/45">
            {es
              ? "Sin servidor de email configurado: al enviar, avisamos al taller por WhatsApp."
              : "No email list tool configured yet: submitting notifies the shop on WhatsApp."}
          </p>
        ) : null}

        {status === "ok" ? (
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#25D366]">
            <Check className="size-4" aria-hidden />
            {es ? "¡Gracias! Estás en la lista." : "Thanks! You’re on the list."}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={es ? "tu@email.com" : "you@email.com"}
              className="h-12 min-w-0 flex-1 rounded-md border-0 px-4 text-sm outline-none"
              style={{ color: brand.navy }}
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 shrink-0 rounded-md border-0 px-6 text-xs font-extrabold uppercase tracking-[0.08em] text-white transition hover:brightness-105 disabled:opacity-70"
              style={{ background: brandGradients.whatsappCta }}
            >
              {status === "loading"
                ? es
                  ? "…"
                  : "…"
                : es
                  ? "Suscribirme"
                  : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" ? (
          <p className="mt-3 text-xs text-red-300">
            {es ? "Revisa el email e intenta de nuevo." : "Check the email and try again."}
          </p>
        ) : null}
        <p className="mt-4 text-[11px] text-white/40">
          {es
            ? "Puedes darte de baja escribiéndonos por WhatsApp."
            : "Unsubscribe anytime by messaging us on WhatsApp."}
        </p>
      </div>
    </section>
  );
}
