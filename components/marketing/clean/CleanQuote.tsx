"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import {
  buildStructuredWhatsAppMessage,
  openWhatsAppWithMessage,
} from "@/lib/whatsapp-quote";

export function CleanQuote() {
  const { locale } = useCatalog();
  const es = locale === "es";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [insurer, setInsurer] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [sent, setSent] = useState(false);

  const preview = useMemo(
    () =>
      buildStructuredWhatsAppMessage({
        name,
        phone,
        year,
        make,
        model,
        service: es ? "Cotización web" : "Web quote",
        issue: issue || (es ? "Consulta general" : "General inquiry"),
        insurer,
        claimNumber,
        locale: es ? "es" : "en",
      }),
    [name, phone, year, make, model, issue, insurer, claimNumber, es],
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    openWhatsAppWithMessage(preview, { source: "clean_quote", service: issue || "general" });
    setSent(true);
  }

  const field =
    "w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition focus:ring-2";
  const fieldStyle = {
    borderColor: "#E6EAEF",
    background: "#fff",
    color: brand.navy,
  } as const;

  return (
    <section id="quote" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <div className="mb-8 text-center">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.orange }}
          >
            {es ? "Cotización" : "Free estimate"}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: brand.navy }}
          >
            {es ? "Mensaje al taller" : "Message the shop"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: brand.steel }}>
            {es
              ? "Armamos un mensaje claro para WhatsApp. Tú tocas Enviar y adjuntas fotos."
              : "We build a clear WhatsApp message. You tap Send and attach photos."}
          </p>
        </div>

        {sent ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: brand.paper, border: "1px solid #E6EAEF" }}
          >
            <MessageCircle className="mx-auto size-10" style={{ color: brand.whatsapp }} />
            <h3 className="mt-4 text-xl font-bold" style={{ color: brand.navy }}>
              {es ? "WhatsApp abierto" : "WhatsApp opened"}
            </h3>
            <p className="mt-2 text-sm" style={{ color: brand.steel }}>
              {es
                ? "Toca Enviar, luego adjunta 3–6 fotos del daño."
                : "Tap Send, then attach 3–6 photos of the damage."}
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-bold underline"
              style={{ color: brand.orange }}
            >
              {es ? "Nueva cotización" : "New quote"}
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl p-6 sm:p-8"
            style={{ background: brand.paper, border: "1px solid #E6EAEF" }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                className={field}
                style={fieldStyle}
                placeholder={es ? "Nombre" : "Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <input
                required
                type="tel"
                className={field}
                style={fieldStyle}
                placeholder={es ? "Teléfono" : "Phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                required
                className={field}
                style={fieldStyle}
                placeholder={es ? "Año" : "Year"}
                maxLength={4}
                inputMode="numeric"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
              />
              <input
                required
                className={field}
                style={fieldStyle}
                placeholder={es ? "Marca" : "Make"}
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <input
                required
                className={field}
                style={fieldStyle}
                placeholder={es ? "Modelo" : "Model"}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <input
              className={field}
              style={fieldStyle}
              placeholder={es ? "¿Qué pasó? (daño o servicio)" : "What happened? (damage or service)"}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={field}
                style={fieldStyle}
                placeholder={es ? "Aseguradora (opcional)" : "Insurer (optional)"}
                value={insurer}
                onChange={(e) => setInsurer(e.target.value)}
              />
              <input
                className={field}
                style={fieldStyle}
                placeholder={es ? "# reclamo (opcional)" : "Claim # (optional)"}
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
              />
            </div>
            <p className="text-xs leading-relaxed" style={{ color: brand.steel }}>
              {es
                ? "📷 Después de Enviar: adjunta fotos (esquinas del auto + daño de cerca)."
                : "📷 After Send: attach photos (car corners + close-ups of damage)."}
            </p>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-[15px] font-bold text-white"
              style={{ background: brandGradients.whatsappCta }}
            >
              <MessageCircle className="size-5" aria-hidden />
              {es ? "Abrir WhatsApp" : "Open WhatsApp"}
            </button>
            <a
              href={site.phones[0].tel}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold no-underline"
              style={{ color: brand.navy, background: brand.mist }}
            >
              <Phone className="size-4" style={{ color: brand.orange }} />
              {site.phones[0].display}
            </a>
          </form>
        )}
      </div>
    </section>
  );
}
