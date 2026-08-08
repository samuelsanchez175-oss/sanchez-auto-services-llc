"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { openWhatsAppChat } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

/**
 * Network-style bottom bands:
 * 1) Light gray “loaner / covered while we work” strip + black CTAs
 * 2) Strong logo-navy blue band — damaged vehicle / options CTA + logo
 */
export function CleanBottomCta() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];

  return (
    <>
      {/* ── Gray strip: covered while car is in shop ── */}
      <section className="py-12 sm:py-14" data-arrow-theme="light" style={{ background: "#E8E8E8" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
          <h2 className="max-w-xl text-xl font-extrabold leading-snug tracking-tight text-black sm:text-2xl lg:text-[1.65rem]">
            {es ? (
              <>
                Te cubrimos mientras tu auto favorito está con nosotros
                para un cambio de look.{" "}
                <span className="underline decoration-2 underline-offset-4">
                  ¡Habla con el taller!
                </span>
              </>
            ) : (
              <>
                We Got You Covered While Your Favorite Car Is With Us For A
                Makeover.{" "}
                <span className="underline decoration-2 underline-offset-4">
                  Get In Touch!
                </span>
              </>
            )}
          </h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
            <a
              href={phone.tel}
              onClick={() => trackEvent("call_click", { source: "bottom_loaner" })}
              className="inline-flex items-center justify-between gap-3 bg-black px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-white no-underline transition hover:bg-[#1a1a1a]"
            >
              <span className="inline-flex items-center gap-2">
                <Phone className="size-3.5" aria-hidden />
                {es ? "Llamar al taller" : "Call the shop"}
              </span>
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => openWhatsAppChat("bottom_loaner")}
              className="inline-flex items-center justify-between gap-3 border-0 px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-110"
              style={{ background: brandGradients.whatsappCta }}
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="size-3.5" aria-hidden />
                {es ? "WhatsApp" : "WhatsApp chat"}
              </span>
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* ── Navy → white left-to-right band + large logo ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
        data-arrow-theme="dark"
        style={{
          /* Blue on the left (copy) fades horizontally into white (logo) */
          background: `linear-gradient(
            90deg,
            ${brand.navy} 0%,
            ${brand.navy} 38%,
            #0c304f 52%,
            #3d5a73 64%,
            #b8c4cf 78%,
            #eef1f4 88%,
            ${brand.white} 100%
          )`,
        }}
      >
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,42%)] lg:gap-10 xl:gap-6">
          <div className="max-w-xl text-white lg:pr-4">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.15rem]">
              {es ? (
                <>¿Prefieres vender tu vehículo dañado?</>
              ) : (
                <>Prefer To Sell Your Damaged Vehicle?</>
              )}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/90 sm:text-base">
              {es
                ? "Si tu seguro decide que el vehículo es reparable pero ya no quieres conservarlo — o si estás evaluando opciones después de una colisión — escríbenos. Te orientamos sobre siguientes pasos y estimados."
                : "If your insurer decides your vehicle is repairable but you no longer want to keep it — or you’re weighing options after a collision — message us. We’ll walk you through next steps and estimates."}
            </p>
            <button
              type="button"
              onClick={() =>
                openQuote(
                  es
                    ? "Opciones — vehículo dañado / venta"
                    : "Options — damaged vehicle / sell",
                )
              }
              className="mt-8 inline-flex items-center gap-2 border-0 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-110"
              style={{ background: brandGradients.whatsappCta }}
            >
              <MessageCircle className="size-3.5" aria-hidden />
              {es ? "Hablar de opciones" : "Talk about options"}
              <ArrowRight className="size-3.5" aria-hidden />
            </button>
          </div>

          {/* Large logo sits on the white end of the L→R fade — no glow */}
          <div className="relative flex min-h-[200px] items-center justify-center sm:min-h-[260px] lg:min-h-[300px] lg:justify-end">
            <Image
              src={site.logo.src}
              alt={site.name}
              width={site.logo.width}
              height={site.logo.height}
              priority={false}
              className="relative z-[1] h-auto w-[min(88vw,280px)] object-contain sm:w-[min(70vw,340px)] lg:w-[min(38vw,400px)] xl:w-[420px]"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
            />
          </div>
        </div>
      </section>
    </>
  );
}
