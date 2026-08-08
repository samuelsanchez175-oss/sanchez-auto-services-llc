"use client";

import Image from "next/image";
import {
  MessageCircle,
  Phone,
  MapPin,
  Star,
  Check,
  Camera,
  FileText,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCatalog } from "@/lib/locale";
import { site } from "@/lib/site-content";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand, brandGradients } from "@/lib/brand";

export const HERO_SLIDESHOW_HOLD_MS = 7000;
export const HERO_SLIDESHOW_TRANSITION_MS = 900;
export const HERO_SLIDESHOW_BLUR_PX = 8;

/** Prefer real shop gallery + cleaner slides for a calmer, insurance-trust feel */
const HERO_SLIDE_PATHS = [
  "/gallery/shop-1.jpg",
  "/gallery/shop-3.jpg",
  "/gallery/shop-2.jpg",
  "/hero-slideshow/slide-03.png",
  "/gallery/shop-4.jpg",
  "/hero-slideshow/slide-05.png",
] as const;

function HeroSlideshowBackground() {
  const [state, setState] = useState<{
    top: 0 | 1;
    idx0: number;
    idx1: number;
  }>({ top: 0, idx0: 0, idx1: 1 });

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let transTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleCycle = () => {
      holdTimer = setTimeout(() => {
        setState((s) => {
          const hidden = (1 - s.top) as 0 | 1;
          const curIdx = s.top === 0 ? s.idx0 : s.idx1;
          const nextIdx = (curIdx + 1) % HERO_SLIDE_PATHS.length;
          return {
            top: hidden,
            idx0: hidden === 0 ? nextIdx : s.idx0,
            idx1: hidden === 1 ? nextIdx : s.idx1,
          };
        });
        transTimer = setTimeout(scheduleCycle, HERO_SLIDESHOW_TRANSITION_MS);
      }, HERO_SLIDESHOW_HOLD_MS);
    };

    scheduleCycle();
    return () => {
      if (holdTimer !== undefined) clearTimeout(holdTimer);
      if (transTimer !== undefined) clearTimeout(transTimer);
    };
  }, []);

  const { top, idx0, idx1 } = state;
  const layers: { slot: 0 | 1; slideIndex: number }[] = [
    { slot: 0, slideIndex: idx0 },
    { slot: 1, slideIndex: idx1 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {layers.map(({ slot, slideIndex }) => {
        const isTop = top === slot;
        return (
          <div
            key={slot}
            className="absolute inset-0"
            style={{
              zIndex: isTop ? 2 : 1,
              opacity: isTop ? 1 : 0,
              filter: isTop ? "blur(0px)" : `blur(${HERO_SLIDESHOW_BLUR_PX}px)`,
              transition: `opacity ${HERO_SLIDESHOW_TRANSITION_MS}ms ease-in-out, filter ${HERO_SLIDESHOW_TRANSITION_MS}ms ease-in-out`,
            }}
          >
            <Image
              src={HERO_SLIDE_PATHS[slideIndex]}
              alt=""
              fill
              sizes="100vw"
              priority={slot === 0 && slideIndex === 0}
              className="object-cover object-center"
            />
          </div>
        );
      })}
    </div>
  );
}

export function WhatsAppHero() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  const checklist = isEs
    ? [
        { icon: FileText, text: "Número de reclamo (si lo tienes)" },
        { icon: Camera, text: "Fotos del daño" },
        { icon: Shield, text: "Año, marca y modelo del auto" },
      ]
    : [
        { icon: FileText, text: "Claim number (if you have one)" },
        { icon: Camera, text: "Photos of the damage" },
        { icon: Shield, text: "Year, make & model" },
      ];

  return (
    <section
      id="home"
      className="relative flex min-h-[min(100svh,900px)] flex-col overflow-hidden"
      style={{ background: brand.navyDeep }}
    >
      <div className="absolute inset-0 z-0">
        <HeroSlideshowBackground />
        <div
          className="absolute inset-0 z-[1] hidden sm:block"
          style={{ background: brandGradients.heroOverlay }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] sm:hidden"
          style={{ background: brandGradients.heroOverlayMobile }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Insurance-first badge row */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{
                  background: brand.orangeSoft,
                  color: brand.orange,
                  border: `1px solid ${brand.orangeBorder}`,
                }}
              >
                <Shield className="size-3.5" aria-hidden />
                {isEs ? "Seguros bienvenidos" : "Insurance claims welcome"}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <MapPin className="size-3" style={{ color: brand.orange }} aria-hidden />
                Paterson, NJ
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Star
                  className="size-3 fill-current"
                  style={{ color: brand.star }}
                  aria-hidden
                />
                4.8 Google
              </span>
            </div>

            <h1 className="max-w-xl text-[2.35rem] font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]">
              {isEs ? (
                <>
                  Accidente o daño?
                  <br />
                  <span style={{ color: brand.orange }}>Trabajamos con tu seguro</span>
                  <span className="text-white"> — cotiza por WhatsApp.</span>
                </>
              ) : (
                <>
                  Accident or damage?
                  <br />
                  <span style={{ color: brand.orange }}>We work with your insurance</span>
                  <span className="text-white"> — quote on WhatsApp.</span>
                </>
              )}
            </h1>

            <p
              className="mt-4 max-w-lg text-base leading-relaxed sm:text-[1.05rem]"
              style={{ color: "rgba(232,238,245,0.78)" }}
            >
              {isEs
                ? "Colisiones, pintura y mecánica en Sanchez Auto Services LLC. Coordinamos con ajustadores, documentamos el daño y te mantenemos informado — sin confusión en el proceso del reclamo."
                : "Collision, paint, and mechanical at Sanchez Auto Services LLC. We coordinate with adjusters, document damage, and keep you informed — less stress on the claim."}
            </p>

            <ul className="mt-6 space-y-2.5">
              {checklist.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: brand.orangeSoft,
                        border: `1px solid ${brand.orangeBorder}`,
                      }}
                    >
                      <Icon className="size-3.5" style={{ color: brand.orange }} aria-hidden />
                    </span>
                    {item.text}
                    <Check
                      className="ml-auto size-4 sm:ml-2"
                      style={{ color: brand.whatsapp }}
                      aria-hidden
                    />
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <button
                type="button"
                onClick={() =>
                  openQuote(
                    isEs
                      ? "Reclamo de seguro / colisión"
                      : "Insurance claim / collision",
                  )
                }
                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-0 px-6 py-4 text-base font-black text-white transition-all active:scale-[0.98] sm:flex-none sm:min-w-[280px]"
                style={{
                  background: brandGradients.whatsappCta,
                  boxShadow: "0 10px 36px rgba(37,211,102,0.38)",
                }}
              >
                <MessageCircle className="size-5 shrink-0" aria-hidden />
                {isEs ? "Cotizar reclamo por WhatsApp" : "Quote my claim on WhatsApp"}
              </button>
              <a
                href={site.phones[0]?.tel}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white no-underline transition-all active:scale-[0.98] sm:flex-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Phone className="size-4 shrink-0" style={{ color: brand.orange }} aria-hidden />
                {site.phones[0]?.display}
              </a>
            </div>

            <p
              className="mt-3 text-[11px] font-medium leading-relaxed"
              style={{ color: "rgba(232,238,245,0.42)" }}
            >
              {isEs
                ? "Mensaje estructurado al taller · seguro · auto · daño. Tú solo tocas Enviar."
                : "Structured message to the shop · insurance · vehicle · damage. You just tap Send."}
            </p>
          </div>

          {/* Insurance trust card + photo */}
          <div className="hidden lg:col-span-5 lg:block">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.5)",
              }}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/gallery/shop-3.jpg"
                  alt="Sanchez Auto body and repair facility in Paterson"
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,21,37,0.95) 0%, rgba(6,21,37,0.25) 50%, transparent 72%)",
                  }}
                  aria-hidden
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: brand.paper,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
                  }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: brand.orangeSoft }}
                    >
                      <Shield className="size-5" style={{ color: brand.orange }} aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: brand.navy }}>
                        {isEs ? "Proceso de seguro simple" : "Simple insurance process"}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug" style={{ color: brand.steel }}>
                        {isEs
                          ? "Estimado documentado · Fotos del daño · Coordinación con el ajustador"
                          : "Documented estimate · Damage photos · Adjuster coordination"}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-2 rounded-lg bg-white p-2 ring-1 ring-black/5">
                    <Image
                      src={site.logo.src}
                      alt=""
                      width={100}
                      height={65}
                      className="h-8 w-auto object-contain"
                    />
                    <p className="text-[11px] font-semibold" style={{ color: brand.steel }}>
                      99 E Railway Ave
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openQuote(
                        isEs
                          ? "Reclamo de seguro / colisión"
                          : "Insurance claim / collision",
                      )
                    }
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 py-3 text-sm font-black text-white"
                    style={{ background: brandGradients.whatsappCta }}
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    {isEs ? "Enviar mi reclamo" : "Send my claim details"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile insurance strip */}
        <div
          className="mt-8 grid grid-cols-3 gap-2 rounded-2xl p-3 lg:hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {(isEs
            ? [
                { k: "Seguro", v: "Bienvenido" },
                { k: "Fotos", v: "Por WhatsApp" },
                { k: "Taller", v: "Paterson" },
              ]
            : [
                { k: "Insurance", v: "Welcome" },
                { k: "Photos", v: "Via WhatsApp" },
                { k: "Shop", v: "Paterson" },
              ]
          ).map((cell) => (
            <div key={cell.k} className="text-center">
              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {cell.k}
              </p>
              <p className="mt-0.5 text-xs font-bold text-white">{cell.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
