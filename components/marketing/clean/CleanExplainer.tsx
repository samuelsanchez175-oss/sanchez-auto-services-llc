"use client";

import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Phone, KeyRound, Wrench, Car } from "lucide-react";
import { site } from "@/lib/site-content";

const STEPS = [
  {
    n: "01",
    icon: Phone,
    en: { title: "Book or call", body: "WhatsApp estimate or call the shop — insurance claims welcome." },
    es: { title: "Agenda o llama", body: "Estimado por WhatsApp o llámanos — seguros bienvenidos." },
  },
  {
    n: "02",
    icon: KeyRound,
    en: { title: "Drop off", body: "Leave the car at 99 E Railway Ave. We confirm the work before we start." },
    es: { title: "Entrega el auto", body: "Déjalo en 99 E Railway Ave. Confirmamos el trabajo antes de empezar." },
  },
  {
    n: "03",
    icon: Wrench,
    en: { title: "We repair & update", body: "Body, paint, or mechanical — we keep you posted while it is in the bay." },
    es: { title: "Reparamos y avisamos", body: "Carrocería, pintura o mecánica — te mantenemos al tanto en el taller." },
  },
  {
    n: "04",
    icon: Car,
    en: { title: "Pick up & drive", body: "Inspect the work, settle the estimate, and get back on the road." },
    es: { title: "Recoge y rueda", body: "Revisa el trabajo, cierra el estimado y vuelve a la calle." },
  },
] as const;

/**
 * Drop-off explainer — video + 4-step path (Vox-ready slot; local slideshow ships now).
 */
export function CleanExplainer() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];

  return (
    <section
      id="how-it-works"
      className="nw-section scroll-mt-28"
      style={{ background: brand.navy }}
    >
      <div className="nw-wrap">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.orange }}
          >
            {es ? "Cómo funciona" : "How it works"}
          </p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
            {es
              ? "Deja el auto en 4 pasos"
              : "Drop off your car in 4 steps"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            {es
              ? "Sin sorpresas: estimado claro, trabajo en Paterson, y comunicación hasta que lo recojas."
              : "No surprises: clear estimate, work done in Paterson, and updates until you pick it up."}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div
            className="overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
            style={{ borderRadius: "0.35rem" }}
          >
            <video
              className="aspect-video w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/gallery/shop-1.jpg"
              onPlay={() => trackEvent("explainer_play", { source: "home" })}
            >
              <source src="/videos/how-dropoff-works.mp4" type="video/mp4" />
              {es
                ? "Tu navegador no reproduce video HTML5."
                : "Your browser does not support HTML5 video."}
            </video>
            <p className="px-4 py-2.5 text-center text-[11px] text-white/50">
              {es
                ? "Vista del taller · 99 E Railway Ave, Paterson NJ"
                : "Shop walkthrough stills · 99 E Railway Ave, Paterson NJ"}
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {STEPS.map((step) => {
              const copy = es ? step.es : step.en;
              const Icon = step.icon;
              return (
                <li
                  key={step.n}
                  className="flex gap-3 border border-white/10 bg-white/[0.04] p-4"
                  style={{ borderRadius: "0.25rem" }}
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center text-xs font-black"
                    style={{
                      background: brand.orangeSoft,
                      color: brand.orange,
                      borderRadius: "0.25rem",
                    }}
                  >
                    {step.n}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-extrabold text-white">
                      <Icon className="size-3.5 shrink-0" style={{ color: brand.orange }} aria-hidden />
                      {copy.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/65">{copy.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="nw-btn nw-btn--wa min-h-[48px] min-w-[200px]"
            onClick={() => {
              trackEvent("quote_click", { source: "explainer" });
              openQuote(es ? "Entrega de auto" : "Car drop-off");
            }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {es ? "Empezar estimado" : "Start an estimate"}
          </button>
          <a
            href={phone.tel}
            className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 border border-white/25 px-5 text-sm font-extrabold uppercase tracking-wide text-white no-underline transition hover:bg-white/10"
            style={{ borderRadius: "0.25rem" }}
            onClick={() => trackEvent("call_click", { source: "explainer" })}
          >
            {es ? "Llamar" : "Call"} {phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
