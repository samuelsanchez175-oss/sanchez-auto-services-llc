"use client";

import { useEffect, useMemo, useState } from "react";
import { X, MessageCircle, FileText, Camera, Send, Shield } from "lucide-react";
import {
  buildStructuredWhatsAppMessage,
  openWhatsAppWithMessage,
} from "@/lib/whatsapp-quote";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import {
  INSURER_OPTIONS,
  VEHICLE_MAKES,
  VEHICLE_YEARS,
  modelsForMake,
} from "@/lib/vehicle-catalog";
import { trackEvent } from "@/lib/analytics";

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
  "Other mechanical",
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
  "Otro mecánico",
  "Otro — lo describo abajo",
];

const STEPS = [
  {
    n: 1,
    icon: FileText,
    titleEn: "Fill the form",
    titleEs: "Completa el form",
    bodyEn: "Vehicle, damage, optional insurance.",
    bodyEs: "Vehículo, daño, seguro opcional.",
  },
  {
    n: 2,
    icon: Camera,
    titleEn: "Add photos",
    titleEs: "Sube fotos",
    bodyEn: "3–6 angles in WhatsApp.",
    bodyEs: "3–6 ángulos en WhatsApp.",
  },
  {
    n: 3,
    icon: Send,
    titleEn: "Hit send",
    titleEs: "Envía",
    bodyEn: "We reply with next steps.",
    bodyEs: "Respondemos con los pasos.",
  },
] as const;

/**
 * Compact no-scroll estimate modal — full content visible at once.
 */
export function ServiceQuoteModal({ service, onClose }: Props) {
  const catalog = useCatalog();
  const es = catalog.locale === "es";
  const damageTypes = es ? DAMAGE_TYPES_ES : DAMAGE_TYPES_EN;

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelOther, setModelOther] = useState("");
  const [damageType, setDamageType] = useState("");
  const [description, setDescription] = useState("");
  const [insurerPick, setInsurerPick] = useState("");
  const [insurerOther, setInsurerOther] = useState("");
  const [claimNumber, setClaimNumber] = useState("");
  const [sent, setSent] = useState(false);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(0);

  const models = useMemo(() => modelsForMake(make), [make]);

  const resolvedModel =
    model === "Other" ? modelOther.trim() || (es ? "Otro" : "Other") : model;
  const resolvedInsurer =
    insurerPick === "Other"
      ? insurerOther.trim() || (es ? "Otra" : "Other")
      : insurerPick === "No insurance / cash job"
        ? es
          ? "Sin seguro / efectivo"
          : "No insurance / cash job"
        : insurerPick;

  const message = useMemo(() => {
    const base = buildStructuredWhatsAppMessage({
      year,
      make: make === "Other" ? (es ? "Otra marca" : "Other make") : make,
      model: resolvedModel,
      service: service ?? (es ? "Estimado general" : "General estimate"),
      issue: damageType,
      details: description,
      claimNumber,
      insurer: resolvedInsurer || undefined,
      locale: es ? "es" : "en",
    });
    if (photoCount <= 0) return base;
    const photoLine = es
      ? `\n\n📷 *Fotos listas en el teléfono:* ${photoCount} (adjúntalas en este chat — WhatsApp no permite enviarlas automático desde el sitio).`
      : `\n\n📷 *Photos ready on my phone:* ${photoCount} (attach them in this chat — WhatsApp links cannot auto-send files).`;
    const names =
      photoNames.length > 0
        ? `\n${photoNames
            .slice(0, 6)
            .map((n) => `• ${n}`)
            .join("\n")}`
        : "";
    return base + photoLine + names;
  }, [
    year,
    make,
    resolvedModel,
    service,
    damageType,
    description,
    claimNumber,
    resolvedInsurer,
    es,
    photoCount,
    photoNames,
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    openWhatsAppWithMessage(message, {
      service: service ?? "general",
      source: "quote_modal",
    });
    setSent(true);
  }

  const field =
    "h-9 w-full appearance-none rounded-md border border-[#E2E8EF] bg-white px-2.5 text-[13px] font-medium outline-none transition focus:border-[#FB8C33] focus:ring-2 focus:ring-[#FB8C33]/20";
  const fieldStyle = { color: brand.navy } as React.CSSProperties;
  const label =
    "mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]";
  const labelStyle = { color: brand.steel };

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-[#001830]/65 backdrop-blur-[5px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={es ? "Pedir estimado" : "Get an estimate"}
        className="fixed left-1/2 top-1/2 z-[90] w-[min(calc(100%-1rem),52rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-[0_28px_64px_rgba(0,24,48,0.35)]"
        style={{ background: brand.pureWhite }}
      >
        {sent ? (
          <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
            <span
              className="flex size-12 items-center justify-center rounded-full"
              style={{ background: "rgba(37,211,102,0.15)" }}
            >
              <MessageCircle className="size-6" style={{ color: brand.whatsapp }} />
            </span>
            <h2 className="text-lg font-extrabold" style={{ color: brand.navy }}>
              {es ? "¡WhatsApp abierto!" : "WhatsApp opened!"}
            </h2>
            <p className="text-sm" style={{ color: brand.steel }}>
              {es
                ? "Toca Enviar, luego adjunta 3–6 fotos."
                : "Tap Send, then attach 3–6 photos."}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-full px-5 py-2 text-sm font-bold text-white"
              style={{ background: brand.navy }}
            >
              {es ? "Listo" : "Done"}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
            {/* Left: compact how-it-works */}
            <aside
              className="hidden flex-col px-4 py-4 text-white md:flex"
              style={{
                background: `linear-gradient(165deg, ${brand.navyDeep} 0%, ${brand.navy} 100%)`,
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                {es ? "Estimado" : "Estimate"}
              </p>
              <h2 className="mt-1 text-base font-extrabold leading-tight">
                {es ? "Cómo funciona" : "How it works"}
              </h2>

              <ol className="mt-4 space-y-3">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.n} className="flex gap-2.5">
                      <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold"
                        style={{
                          background: brand.orange,
                          color: brand.navyDeep,
                        }}
                      >
                        {s.n}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Icon className="size-3 text-white/75" aria-hidden />
                          <span className="text-[11px] font-extrabold uppercase tracking-wide">
                            {es ? s.titleEs : s.titleEn}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] leading-snug text-white/55">
                          {es ? s.bodyEs : s.bodyEn}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-auto pt-4 text-[10px] leading-snug text-white/35">
                {es
                  ? "WhatsApp ya muestra tu nombre y número."
                  : "WhatsApp already shows your name & number."}
              </p>
            </aside>

            {/* Right: form — no internal scroll */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 border-b border-[#EEF1F4] px-4 py-2.5">
                <div className="min-w-0">
                  <h3
                    className="truncate text-sm font-extrabold"
                    style={{ color: brand.navy }}
                  >
                    {service ?? (es ? "Estimado general" : "General estimate")}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border-0"
                  style={{ color: brand.navy, background: brand.mist }}
                  aria-label={es ? "Cerrar" : "Close"}
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col px-4 py-3">
                {/* Mobile-only mini steps */}
                <div className="mb-2.5 flex gap-2 md:hidden">
                  {STEPS.map((s) => (
                    <span
                      key={s.n}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{
                        background: brand.navySoft,
                        color: brand.navy,
                      }}
                    >
                      {s.n}. {es ? s.titleEs : s.titleEn}
                    </span>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className={label} style={labelStyle}>
                      {es ? "Vehículo" : "Vehicle"}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <select
                        className={field}
                        style={fieldStyle}
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        aria-label={es ? "Año" : "Year"}
                      >
                        <option value="" disabled>
                          {es ? "Año" : "Year"}
                        </option>
                        {VEHICLE_YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <select
                        className={field}
                        style={fieldStyle}
                        required
                        value={make}
                        onChange={(e) => {
                          setMake(e.target.value);
                          setModel("");
                          setModelOther("");
                        }}
                        aria-label={es ? "Marca" : "Make"}
                      >
                        <option value="" disabled>
                          {es ? "Marca" : "Make"}
                        </option>
                        {VEHICLE_MAKES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select
                        className={field}
                        style={fieldStyle}
                        required
                        value={model}
                        disabled={!make}
                        onChange={(e) => {
                          setModel(e.target.value);
                          if (e.target.value !== "Other") setModelOther("");
                        }}
                        aria-label={es ? "Modelo" : "Model"}
                      >
                        <option value="" disabled>
                          {es ? "Modelo" : "Model"}
                        </option>
                        {models.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    {model === "Other" ? (
                      <input
                        className={`${field} mt-1.5`}
                        style={fieldStyle}
                        required
                        placeholder={es ? "Escribe el modelo" : "Type model name"}
                        value={modelOther}
                        onChange={(e) => setModelOther(e.target.value)}
                      />
                    ) : null}
                  </div>

                  <div>
                    <label className={label} style={labelStyle}>
                      {es ? "Daño / servicio" : "Damage / service"}
                    </label>
                    <select
                      className={field}
                      style={fieldStyle}
                      required
                      value={damageType}
                      onChange={(e) => setDamageType(e.target.value)}
                    >
                      <option value="" disabled>
                        {es ? "Seleccionar…" : "Select…"}
                      </option>
                      {damageTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={label} style={labelStyle}>
                      {es ? "Detalles (opcional)" : "Details (optional)"}
                    </label>
                    <input
                      className={field}
                      style={fieldStyle}
                      placeholder={
                        es ? "Ej. golpe en puerta…" : "e.g. Door hit in parking lot…"
                      }
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={label} style={labelStyle}>
                      <Camera className="mr-1 inline size-3 align-[-1px]" aria-hidden />
                      {es ? "Fotos del daño (recomendado)" : "Damage photos (recommended)"}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      capture="environment"
                      className="block w-full text-[12px] file:mr-3 file:rounded-md file:border-0 file:bg-[#07253F] file:px-3 file:py-2 file:text-[11px] file:font-bold file:uppercase file:text-white"
                      style={{ color: brand.navy }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setPhotoCount(files.length);
                        setPhotoNames(files.map((f) => f.name));
                        if (files.length) {
                          trackEvent("photo_attach", { count: files.length });
                        }
                      }}
                    />
                    <p className="mt-1 text-[11px] leading-snug" style={{ color: brand.steel }}>
                      {photoCount > 0
                        ? es
                          ? `${photoCount} foto(s) seleccionada(s). Al abrir WhatsApp, adjunta las mismas desde el carrete.`
                          : `${photoCount} photo(s) selected. When WhatsApp opens, attach the same files from your camera roll.`
                        : es
                          ? "WhatsApp no permite adjuntar automático desde la web — eliges las fotos aquí y las pegas en el chat."
                          : "WhatsApp cannot auto-attach from the web — pick photos here, then attach them in chat."}
                    </p>
                  </div>

                  <div
                    className="rounded-lg border px-2.5 py-2"
                    style={{
                      borderColor: brand.orangeBorder,
                      background: "rgba(251,140,51,0.06)",
                    }}
                  >
                    <p
                      className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em]"
                      style={{ color: brand.orangeDeep }}
                    >
                      <Shield className="size-3" aria-hidden />
                      {es ? "Seguro (opcional)" : "Insurance (optional)"}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        className={field}
                        style={fieldStyle}
                        value={insurerPick}
                        onChange={(e) => {
                          setInsurerPick(e.target.value);
                          if (e.target.value !== "Other") setInsurerOther("");
                        }}
                        aria-label={es ? "Aseguradora" : "Insurer"}
                      >
                        <option value="">{es ? "Aseguradora…" : "Insurer…"}</option>
                        {INSURER_OPTIONS.map((name) => (
                          <option key={name} value={name}>
                            {name === "No insurance / cash job"
                              ? es
                                ? "Sin seguro / efectivo"
                                : name
                              : name === "Other"
                                ? es
                                  ? "Otra…"
                                  : "Other…"
                                : name}
                          </option>
                        ))}
                      </select>
                      <input
                        className={field}
                        style={fieldStyle}
                        placeholder={es ? "# reclamo" : "Claim #"}
                        value={claimNumber}
                        onChange={(e) => setClaimNumber(e.target.value)}
                      />
                    </div>
                    {insurerPick === "Other" ? (
                      <input
                        className={`${field} mt-1.5`}
                        style={fieldStyle}
                        required
                        placeholder={es ? "Nombre de la aseguradora" : "Insurer name"}
                        value={insurerOther}
                        onChange={(e) => setInsurerOther(e.target.value)}
                      />
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-0 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:brightness-105"
                  style={{
                    background: brandGradients.whatsappCta,
                    boxShadow: "0 8px 20px rgba(37,211,102,0.28)",
                  }}
                >
                  <MessageCircle className="size-4" aria-hidden />
                  {es ? "Abrir WhatsApp" : "Open WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
