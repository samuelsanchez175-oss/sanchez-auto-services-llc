"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, createTimeline, stagger } from "animejs";
import { MessageCircle, Phone, Star, MapPin, Navigation } from "lucide-react";
import { formatAddressInline, mapDirectionsUrl, site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog, useLocaleActions } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { trackEvent } from "@/lib/analytics";
import { getShopOpenStatus } from "@/lib/shop-hours";

/**
 * Calm hero — one proof line, open status, Estimate + Call only.
 * Anime.js entrance on title + primary CTAs (respects reduced motion).
 */
export function CleanHero() {
  const { locale } = useCatalog();
  const { setLocale } = useLocaleActions();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];
  const years = Math.max(1, new Date().getFullYear() - site.foundedYear);
  const [status, setStatus] = useState(() => getShopOpenStatus());
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getShopOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const copy = heroCopyRef.current;
    const ctas = ctaRowRef.current;
    if (!copy || !ctas) return;

    const kids = copy.querySelectorAll<HTMLElement>("[data-hero-enter]");
    kids.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
    });
    Array.from(ctas.children).forEach((el) => {
      const h = el as HTMLElement;
      h.style.opacity = "0";
      h.style.transform = "translateY(22px) scale(0.97)";
    });

    const tl = createTimeline({ defaults: { ease: "out(3)" } });
    tl.add(kids, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 650,
      delay: stagger(90),
    }).add(
      ctas.children,
      {
        opacity: [0, 1],
        translateY: [22, 0],
        scale: [0.97, 1],
        duration: 520,
        delay: stagger(110),
      },
      "-=280",
    );

    // Soft pulse on primary estimate CTA once after entrance
    const primary = ctas.querySelector<HTMLElement>("[data-hero-cta-primary]");
    let pulse: ReturnType<typeof animate> | undefined;
    if (primary) {
      pulse = animate(primary, {
        scale: [1, 1.03, 1],
        duration: 900,
        delay: 1100,
        ease: "inOut(2)",
      });
    }

    return () => {
      tl.pause();
      pulse?.pause();
    };
  }, [locale]);

  const cta =
    "inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-sm border-0 px-5 py-3.5 text-center text-[0.85rem] font-extrabold uppercase tracking-[0.04em] text-white no-underline transition hover:brightness-110 sm:text-[0.9rem]";

  return (
    <section
      id="home"
      data-arrow-theme="dark"
      className="relative isolate flex min-h-[min(85vh,640px)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gallery/shop-3.jpg"
          alt={`${site.name} body shop, Paterson NJ`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,12,28,0.88) 0%, rgba(7,37,63,0.72) 42%, rgba(7,37,63,0.35) 72%, rgba(7,37,63,0.2) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="nw-wrap w-full pb-14 pt-[8.25rem] sm:pb-18 sm:pt-[9rem]">
        <div ref={heroCopyRef} className="max-w-2xl text-white">
          <div className="mb-4 flex flex-wrap items-center gap-2" data-hero-enter>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold"
              style={{
                background: status.isOpen
                  ? "rgba(37,211,102,0.2)"
                  : "rgba(255,255,255,0.12)",
                color: status.isOpen ? "#6EE7A8" : "rgba(255,255,255,0.85)",
                border: `1px solid ${status.isOpen ? "rgba(37,211,102,0.45)" : "rgba(255,255,255,0.2)"}`,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: status.isOpen ? "#25D366" : "#9CA3AF" }}
              />
              {es ? status.labelEs : status.labelEn}
            </span>
          </div>

          <h1
            data-hero-enter
            className="text-[2.2rem] font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-[3rem]"
          >
            {es ? (
              <>
                Más de {years} años de reparaciones de colisión en Paterson
              </>
            ) : (
              <>
                Over {years} years of collision repair in Paterson
              </>
            )}
          </h1>

          <p
            data-hero-enter
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 sm:text-base"
          >
            {es
              ? "Carrocería, pintura y mecánica. Estimados claros por WhatsApp. Seguros bienvenidos."
              : "Body, paint, and mechanical. Clear estimates on WhatsApp. Insurance welcome."}
          </p>

          <p
            data-hero-enter
            className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold text-white/75"
          >
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-current" style={{ color: brand.star }} aria-hidden />
              {site.googleRating}★ Google
            </span>
            <span className="text-white/30">·</span>
            <span>{es ? `Desde ${site.foundedYear}` : `Since ${site.foundedYear}`}</span>
            <span className="text-white/30">·</span>
            <span>{es ? "Seguros OK" : "Insurance OK"}</span>
          </p>

          {!status.isOpen ? (
            <p
              data-hero-enter
              className="mt-4 max-w-lg rounded-sm border border-white/20 bg-white/10 px-3 py-2 text-[12px] leading-snug text-white/90"
            >
              {es
                ? "Estamos cerrados ahora — envía un estimado por WhatsApp y agendamos la entrega para el próximo horario."
                : "We're closed right now — send a WhatsApp estimate and we'll schedule drop-off for the next open slot."}
            </p>
          ) : null}

          <div ref={ctaRowRef} className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-hero-cta-primary
              className={cta}
              style={{
                background: brandGradients.whatsappCta,
                boxShadow: "0 10px 28px rgba(37, 211, 102, 0.35)",
              }}
              onClick={() => {
                if (!status.isOpen) trackEvent("after_hours_cta", { source: "hero" });
                openQuote(
                  status.isOpen
                    ? es
                      ? "Estimado general"
                      : "General estimate"
                    : es
                      ? "Estimado — fuera de horario / entrega mañana"
                      : "Estimate — after hours / tomorrow drop-off",
                );
              }}
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden />
              {status.isOpen
                ? es
                  ? "Pedir estimado"
                  : "Get an estimate"
                : es
                  ? "Texto para entrega mañana"
                  : "Text for tomorrow drop-off"}
            </button>
            <a
              href={phone.tel}
              className={cta}
              style={{
                background: brand.navy,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={() => trackEvent("call_click", { source: "hero" })}
            >
              <Phone className="size-5 shrink-0" style={{ color: brand.orange }} aria-hidden />
              {es ? "Llamar" : "Call"}
            </a>
          </div>

          <div data-hero-enter className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-white/55">
              {es ? "Idioma" : "Language"}
            </span>
            <button
              type="button"
              onClick={() => {
                setLocale("en");
                trackEvent("locale_toggle", { to: "en", source: "hero" });
              }}
              className="rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide"
              style={{
                borderColor: !es ? brand.orange : "rgba(255,255,255,0.25)",
                background: !es ? brand.orange : "transparent",
                color: !es ? brand.navyDeep : "rgba(255,255,255,0.9)",
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => {
                setLocale("es");
                trackEvent("locale_toggle", { to: "es", source: "hero" });
              }}
              className="rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide"
              style={{
                borderColor: es ? brand.orange : "rgba(255,255,255,0.25)",
                background: es ? brand.orange : "transparent",
                color: es ? brand.navyDeep : "rgba(255,255,255,0.9)",
              }}
            >
              Español
            </button>
          </div>

          {/* Address + directions early — no need to scroll to Location */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <p className="inline-flex items-start gap-2 text-sm text-white/85">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/70" aria-hidden />
              <span>
                {formatAddressInline()}
                <span className="mt-0.5 block text-xs text-white/55">
                  {es ? "Paterson · cerca de la Ruta 80" : "Paterson · near Route 80"}
                </span>
              </span>
            </p>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { source: "hero" })}
              className="inline-flex w-fit items-center gap-2 rounded-sm border border-white/35 bg-white/10 px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.06em] text-white no-underline transition hover:bg-white/15"
            >
              <Navigation className="size-3.5" aria-hidden />
              {es ? "Cómo llegar" : "Get directions"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
