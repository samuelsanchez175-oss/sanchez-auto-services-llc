import { site } from "@/lib/site-content";
import { trackEvent } from "@/lib/analytics";

/** Shop WhatsApp Business number (digits only for wa.me). */
export const WA_NUMBER = site.whatsappPhone;

export type QuoteLeadData = {
  name: string;
  phone: string;
  email?: string;
  year: string;
  make: string;
  model: string;
  service: string;
  issue: string;
  details?: string;
  availability?: string;
  /** Insurance claim number if provided */
  claimNumber?: string;
  /** Insurer name if provided */
  insurer?: string;
  photoCount?: number;
  locale?: "en" | "es";
};

export function formatVehicle(year: string, make: string, model: string): string {
  return [year, make, model].map((s) => s.trim()).filter(Boolean).join(" ") || "—";
}

/**
 * Structured first message the shop receives on WhatsApp.
 * Sections stay stable so staff can scan insurance + vehicle + damage quickly.
 */
export function buildStructuredWhatsAppMessage(data: QuoteLeadData): string {
  const es = data.locale === "es";
  const vehicle = formatVehicle(data.year, data.make, data.model);
  const lines: string[] = [
    es
      ? "🔧 *SOLICITUD DE COTIZACIÓN — Sanchez Auto Services*"
      : "🔧 *QUOTE REQUEST — Sanchez Auto Services*",
    es ? "📍 101 E Railway Ave, Paterson, NJ" : "📍 101 E Railway Ave, Paterson, NJ",
    "",
    es ? "—— CLIENTE ——" : "—— CLIENT ——",
    `${es ? "👤 Nombre" : "👤 Name"}: ${data.name.trim() || "—"}`,
    `${es ? "📞 Teléfono" : "📞 Phone"}: ${data.phone.trim() || "—"}`,
  ];

  if (data.email?.trim()) {
    lines.push(`📧 Email: ${data.email.trim()}`);
  }

  lines.push(
    "",
    es ? "—— SEGURO ——" : "—— INSURANCE ——",
    `${es ? "🏢 Aseguradora" : "🏢 Insurer"}: ${data.insurer?.trim() || (es ? "— (todos bienvenidos)" : "— (all welcome)")}`,
    `${es ? "📋 # Reclamo" : "📋 Claim #"}: ${data.claimNumber?.trim() || "—"}`,
    "",
    es ? "—— VEHÍCULO ——" : "—— VEHICLE ——",
    `${es ? "📅 Año" : "📅 Year"}: ${data.year.trim() || "—"}`,
    `${es ? "🏷 Marca" : "🏷 Make"}: ${data.make.trim() || "—"}`,
    `${es ? "🚙 Modelo" : "🚙 Model"}: ${data.model.trim() || "—"}`,
    `${es ? "🚗 Resumen" : "🚗 Summary"}: ${vehicle}`,
    "",
    es ? "—— PROBLEMA ——" : "—— PROBLEM ——",
    `${es ? "🔩 Servicio" : "🔩 Service"}: ${data.service.trim() || "—"}`,
    `${es ? "💥 Problema" : "💥 Issue"}: ${data.issue.trim() || "—"}`,
  );

  if (data.details?.trim()) {
    lines.push(
      es ? `📝 Detalles:\n${data.details.trim()}` : `📝 Details:\n${data.details.trim()}`,
    );
  }

  if (data.availability?.trim()) {
    lines.push(
      `${es ? "📅 Disponibilidad" : "📅 Availability"}: ${data.availability.trim()}`,
    );
  }

  lines.push(
    "",
    es ? "—— FOTOS ——" : "—— PHOTOS ——",
    es
      ? "📷 El cliente adjuntará fotos en este chat (ideal: 3–6 ángulos + daño de cerca)."
      : "📷 Customer will attach photos in this chat (ideal: 3–6 angles + close-up of damage).",
  );

  if (data.photoCount && data.photoCount > 0) {
    lines.push(
      es
        ? `📎 Indicó ${data.photoCount} foto(s) listas para adjuntar`
        : `📎 Indicated ${data.photoCount} photo(s) ready to attach`,
    );
  }

  lines.push(
    "",
    es
      ? "_Enviado desde sanchez-auto-llc.vercel.app_"
      : "_Sent via sanchez-auto-llc.vercel.app_",
  );

  return lines.filter((l) => l !== null && l !== undefined).join("\n").trim();
}

/** Open WhatsApp with a pre-filled structured message (user still taps Send). */
export function openWhatsAppWithMessage(
  text: string,
  meta?: { service?: string; source?: string },
): void {
  trackEvent("whatsapp_outbound", {
    service: meta?.service ?? "",
    source: meta?.source ?? "form",
  });
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function waMeUrl(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
