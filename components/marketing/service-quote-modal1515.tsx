"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, MessageCircle, ChevronDown } from "lucide-react";
import {
  buildStructuredWhatsAppMessage,
  openWhatsAppWithMessage,
} from "@/lib/whatsapp-quote";
import { useCatalog } from "@/lib/locale";

interface Props {
  service: string | null;
  onClose: () => void;
}

const DAMAGE_TYPES_EN = [
  "Front-end collision",
  "Rear-end collision",
  "Side impact / door damage",
  "Bumper scratch / crack",
  "Paint chip / scratch",
  "Full repaint needed",
  "Dent (no paint damage)",
  "Check engine / warning light",
  "Brake issue",
  "Transmission problem",
  "Oil change / maintenance",
  "A/C not working",
  "Suspension / steering",
  "Electrical issue",
  "Other — I'll describe below",
];

const DAMAGE_TYPES_ES = [
  "Colisión delantera",
  "Colisión trasera",
  "Impacto lateral / puerta",
  "Parachoques rayado / roto",
  "Pintura rayada / desconchada",
  "Repintado completo",
  "Abolladura (sin daño de pintura)",
  "Check engine / luz de advertencia",
  "Frenos",
  "Transmisión",
  "Cambio de aceite / mantenimiento",
  "Aire acondicionado",
  "Suspensión / dirección",
  "Sistema eléctrico",
  "Otro — lo describo abajo",
];

const AVAILABILITY_EN = [
  "As soon as possible",
  "This week",
  "Next week",
  "Flexible / just contact me",
  "Weekend only",
];

const AVAILABILITY_ES = [
  "Lo antes posible",
  "Esta semana",
  "La próxima semana",
  "Flexible / solo contáctenme",
  "Solo fin de semana",
];

export function ServiceQuoteModal({ service, onClose }: Props) {
  const catalog = useCatalog();
  const es = catalog.locale === "es";
  const damageTypes = es ? DAMAGE_TYPES_ES : DAMAGE_TYPES_EN;
  const availabilityOpts = es ? AVAILABILITY_ES : AVAILABILITY_EN;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [damageType, setDamageType] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [insurer, setInsurer] = useState("");
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const preview = useMemo(
    () =>
      buildStructuredWhatsAppMessage({
        name,
        phone,
        year,
        make,
        model,
        service: service ?? (es ? "Cotización general" : "General quote"),
        issue: damageType,
        details: description,
        availability,
        claimNumber,
        insurer,
        locale: es ? "es" : "en",
      }),
    [
      name,
      phone,
      year,
      make,
      model,
      service,
      damageType,
      description,
      availability,
      claimNumber,
      insurer,
      es,
    ],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    openWhatsAppWithMessage(preview, {
      service: service ?? "general",
      source: "quote_modal",
    });
    setSent(true);
  }

  const inputClass =
    "w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition focus:ring-2";
  const inputStyle = {
    background: "#1a1730",
    borderColor: "rgba(255,255,255,0.1)",
    color: "#fff",
  } as React.CSSProperties;
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider";
  const labelStyle = { color: "rgba(255,255,255,0.45)" };

  return (
    <>
      <div
        className="fixed inset-0 z-[80]"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          es
            ? `Cotización: ${service ?? "general"}`
            : `Quote request for ${service ?? "general"}`
        }
        className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[92svh] flex-col overflow-hidden rounded-t-3xl"
        style={{ background: "#07253F" }}
      >
        <div className="flex justify-center pt-3 pb-1" aria-hidden>
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        </div>

        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#FB8C33" }}
            >
              {es ? "Cotización por WhatsApp" : "WhatsApp quote"}
            </p>
            <h2 className="text-base font-black text-white">
              {service ?? (es ? "Solicitar cotización" : "Request a quote")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-label={es ? "Cerrar" : "Close"}
          >
            <X className="size-4 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div
                className="flex size-16 items-center justify-center rounded-full"
                style={{ background: "rgba(37,211,102,0.12)" }}
              >
                <MessageCircle className="size-8" style={{ color: "#25d366" }} aria-hidden />
              </div>
              <h3 className="text-lg font-black text-white">
                {es ? "¡WhatsApp abierto!" : "WhatsApp opened!"}
              </h3>
              <p
                className="max-w-xs text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {es ? (
                  <>
                    Tu mensaje estructurado está listo. Toca{" "}
                    <strong className="text-white">Enviar</strong> en WhatsApp, luego adjunta{" "}
                    <strong className="text-white">3–6 fotos</strong>: las cuatro esquinas del auto,
                    detalle del daño y el tablero si hay luces.
                  </>
                ) : (
                  <>
                    Your structured request is pre-filled. Tap{" "}
                    <strong className="text-white">Send</strong> in WhatsApp, then attach{" "}
                    <strong className="text-white">3–6 photos</strong>: all four corners, close-ups of
                    damage, and the dash if any lights are on.
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-sm underline"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {es ? "Cerrar" : "Close"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {es
                  ? "Completa los datos y abriremos WhatsApp con un mensaje listo para el taller (cliente, auto y problema)."
                  : "Fill this in and we’ll open WhatsApp with a shop-ready message (client, car, and problem)."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="q-name">
                    {es ? "Tu nombre" : "Your name"}
                  </label>
                  <input
                    id="q-name"
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "María G." : "Maria G."}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="q-phone">
                    {es ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}
                  </label>
                  <input
                    id="q-phone"
                    className={inputClass}
                    style={inputStyle}
                    type="tel"
                    placeholder="(973) 555-0101"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  {es ? "Vehículo" : "Vehicle"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "Año" : "Year"}
                    inputMode="numeric"
                    maxLength={4}
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    autoComplete="off"
                  />
                  <input
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "Marca" : "Make"}
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    autoComplete="off"
                  />
                  <input
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "Modelo" : "Model"}
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Insurance — all carriers welcome */}
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(251,140,51,0.08)",
                  border: "1px solid rgba(251,140,51,0.25)",
                }}
              >
                <p
                  className="mb-2 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#FB8C33" }}
                >
                  {es ? "Seguro (opcional)" : "Insurance (optional)"}
                </p>
                <p className="mb-3 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {es
                    ? "Todos los seguros son bienvenidos. No necesitas estar “asignado” a nosotros."
                    : "All insurers welcome. You don’t need to be “assigned” to our shop."}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "Aseguradora" : "Insurer name"}
                    value={insurer}
                    onChange={(e) => setInsurer(e.target.value)}
                    autoComplete="organization"
                  />
                  <input
                    className={inputClass}
                    style={inputStyle}
                    placeholder={es ? "# de reclamo" : "Claim #"}
                    value={claimNumber}
                    onChange={(e) => setClaimNumber(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div
                className="rounded-xl px-3 py-2.5 text-[11px] leading-relaxed"
                style={{
                  background: "rgba(37,211,102,0.08)",
                  border: "1px solid rgba(37,211,102,0.2)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {es
                  ? "📷 Después de Enviar en WhatsApp: adjunta 3–6 fotos (esquinas del auto + daño de cerca + tablero si hay luces)."
                  : "📷 After Send in WhatsApp: attach 3–6 photos (all corners + close-up damage + dash lights if any)."}
              </div>

              <div>
                <label className={labelClass} style={labelStyle} htmlFor="q-damage">
                  {es ? "Tipo de problema / daño" : "Damage / issue type"}
                </label>
                <div className="relative">
                  <select
                    id="q-damage"
                    required
                    value={damageType}
                    onChange={(e) => setDamageType(e.target.value)}
                    className="w-full appearance-none rounded-xl border px-3.5 py-3 pr-10 text-sm outline-none"
                    style={{ ...inputStyle, borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <option value="" disabled>
                      {es ? "Selecciona…" : "Select type…"}
                    </option>
                    {damageTypes.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white opacity-40"
                    aria-hidden
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} style={labelStyle} htmlFor="q-desc">
                  {es ? "Describe el problema" : "Describe the issue"}{" "}
                  <span className="normal-case font-normal opacity-50">
                    ({es ? "opcional" : "optional"})
                  </span>
                </label>
                <textarea
                  id="q-desc"
                  rows={3}
                  placeholder={
                    es
                      ? "Cómo pasó, qué se oye/ve, si hay reclamo de seguro…"
                      : "How it happened, what you hear/see, insurance claim, etc."
                  }
                  className="w-full resize-none rounded-xl border px-3.5 py-3 text-sm outline-none transition"
                  style={inputStyle}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  {es ? "Disponibilidad preferida" : "Preferred availability"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availabilityOpts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvailability(a)}
                      className="rounded-xl px-3 py-2 text-xs font-semibold transition-all"
                      style={{
                        background: availability === a ? "#FB8C33" : "rgba(255,255,255,0.06)",
                        color: availability === a ? "#fff" : "rgba(255,255,255,0.55)",
                        border:
                          availability === a
                            ? "1px solid #FB8C33"
                            : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live message preview — builds trust that shop gets structured data */}
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(37,211,102,0.08)",
                  border: "1px solid rgba(37,211,102,0.2)",
                }}
              >
                <p
                  className="mb-2 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#25d366" }}
                >
                  {es ? "Vista previa del mensaje" : "Message preview"}
                </p>
                <pre
                  className="max-h-36 overflow-y-auto whitespace-pre-wrap font-sans text-[11px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {preview}
                </pre>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-black text-white transition-all active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.30)",
                  marginTop: "8px",
                }}
              >
                <MessageCircle className="size-5" aria-hidden />
                {es ? "Abrir WhatsApp con este mensaje" : "Open WhatsApp with this message"}
              </button>

              <p className="text-center text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                {es
                  ? "Se abre WhatsApp con los datos listos — toca Enviar para enviarlo al taller."
                  : "Opens WhatsApp with your details pre-filled — tap Send to reach the shop."}
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
