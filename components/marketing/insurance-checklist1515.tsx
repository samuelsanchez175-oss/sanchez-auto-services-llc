"use client";

import {
  Camera,
  FileText,
  Building2,
  Car,
  Shield,
  MessageCircle,
  Check,
} from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand, brandGradients } from "@/lib/brand";

const ITEMS_EN = [
  {
    icon: FileText,
    title: "Claim number",
    body: "If the insurer already opened a claim, include the number so we can match paperwork.",
  },
  {
    icon: Building2,
    title: "Insurance company",
    body: "All major insurers welcome — you don’t need a “preferred shop” referral to message us.",
  },
  {
    icon: Camera,
    title: "3–6 clear photos",
    body: "All four corners of the car, close-ups of damage, and any dashboard warning lights.",
  },
  {
    icon: Car,
    title: "Year · make · model",
    body: "So we can start a real estimate, not a generic “bring it in.”",
  },
] as const;

const ITEMS_ES = [
  {
    icon: FileText,
    title: "Número de reclamo",
    body: "Si la aseguradora ya abrió un reclamo, inclúyelo para alinear el papeleo.",
  },
  {
    icon: Building2,
    title: "Compañía de seguro",
    body: "Todos los seguros principales son bienvenidos — no necesitas un taller “preferido”.",
  },
  {
    icon: Camera,
    title: "3–6 fotos claras",
    body: "Las cuatro esquinas del auto, detalle del daño y luces de tablero si aplica.",
  },
  {
    icon: Car,
    title: "Año · marca · modelo",
    body: "Así armamos un estimado real, no un “tráelo y vemos”.",
  },
] as const;

export function InsuranceChecklistSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const items = isEs ? ITEMS_ES : ITEMS_EN;

  return (
    <section
      id="insurance"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: brand.mist }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-2 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.28em]"
              style={{ color: brand.orange }}
            >
              <Shield className="size-3.5" aria-hidden />
              {isEs ? "Seguros bienvenidos" : "Insurance claims welcome"}
            </p>
            <h2
              className="text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: brand.navy }}
            >
              {isEs
                ? "Qué enviar para un reclamo rápido"
                : "What to send for a faster claim quote"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: brand.steel }}>
              {isEs
                ? "Trabajamos con todas las aseguradoras principales. No tienes que estar “asignado” a nosotros para pedir cotización y ayuda con el ajustador."
                : "We work with all major insurers. You don’t have to be “assigned” to us to get a quote and help with your adjuster."}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              openQuote(isEs ? "Reclamo de seguro / colisión" : "Insurance claim / collision")
            }
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border-0 px-5 py-3.5 text-sm font-black text-white sm:self-auto"
            style={{ background: brandGradients.whatsappCta }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Cotizar mi reclamo" : "Quote my claim"}
          </button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm"
                style={{ border: "1px solid #D8DEE4" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ background: brand.orangeSoft }}
                  >
                    <Icon className="size-5" style={{ color: brand.orange }} aria-hidden />
                  </div>
                  <Check className="size-4" style={{ color: brand.whatsapp }} aria-hidden />
                </div>
                <h3 className="text-sm font-bold" style={{ color: brand.navy }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: brand.steel }}>
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs font-medium" style={{ color: brand.steel }}>
          {isEs
            ? "Después de tocar Enviar en WhatsApp, adjunta las fotos en el mismo chat."
            : "After you tap Send in WhatsApp, attach the photos in the same chat."}
        </p>
      </div>
    </section>
  );
}
