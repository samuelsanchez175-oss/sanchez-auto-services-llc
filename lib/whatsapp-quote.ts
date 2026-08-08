import { site } from "@/lib/site-content";
import { trackEvent } from "@/lib/analytics";

/** Shop WhatsApp Business number (digits only for wa.me / api.whatsapp.com). */
export const WA_NUMBER = site.whatsappPhone;

export type QuoteLeadData = {
  /** Optional — WhatsApp already shows the sender's name & number to the shop */
  name?: string;
  phone?: string;
  email?: string;
  year?: string;
  make?: string;
  model?: string;
  service?: string;
  issue?: string;
  details?: string;
  availability?: string;
  claimNumber?: string;
  insurer?: string;
  photoCount?: number;
  locale?: "en" | "es";
};

export function formatVehicle(year?: string, make?: string, model?: string): string {
  return [year, make, model].map((s) => (s ?? "").trim()).filter(Boolean).join(" ") || "";
}

/**
 * Structured first message for the shop (Santiago).
 * No name/phone — WhatsApp already registers the customer.
 * Only includes fields the user actually filled in the estimate form.
 */
export function buildStructuredWhatsAppMessage(data: QuoteLeadData): string {
  const es = data.locale === "es";
  const vehicle = formatVehicle(data.year, data.make, data.model);
  const service = data.service?.trim() || (es ? "Estimado general" : "General estimate");
  const issue = data.issue?.trim() || "";
  const details = data.details?.trim() || "";
  const insurer = data.insurer?.trim() || "";
  const claim = data.claimNumber?.trim() || "";

  if (es) {
    const lines = [
      "🔧 *SOLICITUD DE COTIZACIÓN — Sanchez Auto Services*",
      "📍 99 E Railway Ave, Paterson, NJ",
      "",
      "—— SERVICIO ——",
      `• Tema: ${service}`,
    ];
    if (issue) lines.push(`• Tipo de daño: ${issue}`);
    if (details) lines.push(`• Detalles: ${details}`);
    lines.push("", "—— VEHÍCULO ——");
    if (vehicle) {
      lines.push(`• ${vehicle}`);
      if (data.year?.trim()) lines.push(`• Año: ${data.year.trim()}`);
      if (data.make?.trim()) lines.push(`• Marca: ${data.make.trim()}`);
      if (data.model?.trim()) lines.push(`• Modelo: ${data.model.trim()}`);
    } else {
      lines.push("• (sin vehículo indicado)");
    }
    if (insurer || claim) {
      lines.push("", "—— SEGURO ——");
      if (insurer) lines.push(`• Aseguradora: ${insurer}`);
      if (claim) lines.push(`• # Reclamo: ${claim}`);
    }
    lines.push(
      "",
      "—— FOTOS ——",
      "📷 Adjuntaré 3–6 fotos (esquinas del auto + daño de cerca).",
      "",
      "¡Gracias! Mensaje listo para el taller.",
    );
    return lines.join("\n");
  }

  const lines = [
    "🔧 *QUOTE REQUEST — Sanchez Auto Services*",
    "📍 99 E Railway Ave, Paterson, NJ",
    "",
    "—— SERVICE ——",
    `• Topic: ${service}`,
  ];
  if (issue) lines.push(`• Damage type: ${issue}`);
  if (details) lines.push(`• Details: ${details}`);
  lines.push("", "—— VEHICLE ——");
  if (vehicle) {
    lines.push(`• ${vehicle}`);
    if (data.year?.trim()) lines.push(`• Year: ${data.year.trim()}`);
    if (data.make?.trim()) lines.push(`• Make: ${data.make.trim()}`);
    if (data.model?.trim()) lines.push(`• Model: ${data.model.trim()}`);
  } else {
    lines.push("• (vehicle not provided)");
  }
  if (insurer || claim) {
    lines.push("", "—— INSURANCE ——");
    if (insurer) lines.push(`• Insurer: ${insurer}`);
    if (claim) lines.push(`• Claim #: ${claim}`);
  }
  lines.push(
    "",
    "—— PHOTOS ——",
    "📷 I'll attach 3–6 photos (car corners + close-ups of damage).",
    "",
    "Thanks! Message ready for the shop.",
  );
  return lines.join("\n");
}

/** Reliable WhatsApp open — api.whatsapp.com works better than wa.me on many browsers. */
function openWhatsAppUrl(url: string): void {
  if (typeof window === "undefined") return;
  // Prefer a real navigation when popup is blocked (common on mobile Safari)
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened || opened.closed) {
    window.location.assign(url);
  }
}

/** Open WhatsApp with a pre-filled message (user still taps Send). */
export function openWhatsAppWithMessage(
  text: string,
  meta?: { service?: string; source?: string },
): void {
  trackEvent("whatsapp_outbound", {
    service: meta?.service ?? "",
    source: meta?.source ?? "form",
    mode: "template",
  });
  const url = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;
  openWhatsAppUrl(url);
}

/**
 * Shop-ready estimate block for one-tap Estimate buttons.
 * Optional service label from the button the user clicked.
 */
export function buildSimpleEstimateMessage(
  serviceLabel?: string | null,
  locale: "en" | "es" = "en",
): string {
  return buildStructuredWhatsAppMessage({
    service: serviceLabel?.trim() || undefined,
    locale,
  });
}

/** One-tap estimate: open WhatsApp with a structured starter message. */
export function openSimpleEstimate(
  serviceLabel?: string | null,
  opts?: { locale?: "en" | "es"; source?: string },
): void {
  const locale = opts?.locale ?? "en";
  openWhatsAppWithMessage(buildSimpleEstimateMessage(serviceLabel, locale), {
    service: serviceLabel ?? "estimate",
    source: opts?.source ?? "estimate_button",
  });
}

/** Plain chat — no prefilled template text. */
export function waChatUrl(): string {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}`;
}

/** Open blank WhatsApp chat with the shop (user types freely). */
export function openWhatsAppChat(source = "chat_button"): void {
  trackEvent("whatsapp_outbound", {
    source,
    mode: "plain",
  });
  openWhatsAppUrl(waChatUrl());
}

export function waMeUrl(text: string): string {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;
}
