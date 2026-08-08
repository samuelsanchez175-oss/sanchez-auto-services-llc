"use client";

import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { trackEvent } from "@/lib/analytics";
import { openWhatsAppChat } from "@/lib/whatsapp-quote";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/**
 * Network Auto Body hero — full-bleed shop photo + even 4-button CTA grid.
 */
export function CleanHero() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];
  const years = Math.max(1, new Date().getFullYear() - site.foundedYear);

  const ctaClass =
    "inline-flex h-full min-h-[52px] w-full items-center justify-center gap-2 rounded-sm border-0 px-4 py-3.5 text-center text-[0.85rem] font-extrabold uppercase tracking-[0.04em] text-white no-underline transition hover:brightness-110 sm:text-[0.9rem]";

  return (
    <section
      id="home"
      data-arrow-theme="dark"
      className="relative isolate flex min-h-[min(92vh,720px)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gallery/shop-3.jpg"
          alt=""
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

      <div className="nw-wrap w-full pb-16 pt-[8.5rem] sm:pb-20 sm:pt-[9.5rem]">
        <div className="max-w-3xl text-white">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/70">
            {es
              ? `Desde ${site.foundedYear} · Paterson, NJ`
              : `Since ${site.foundedYear} · Paterson, NJ`}
          </p>

          <h1 className="text-[2.35rem] font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.35rem]">
            {es ? (
              <>
                Más de {years} años de reparaciones de colisión en tu taller de confianza
              </>
            ) : (
              <>
                Over {years} years of collision repairs at your trusted auto body shop
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {es
              ? `${site.name} — carrocería, pintura y mecánica. Estimados claros, ayuda con seguros y WhatsApp directo.`
              : `${site.name} — collision, paint, and mechanical. Clear estimates, insurance help, and direct WhatsApp.`}
          </p>

          {/* Even 2×2 grid on sm+; stacked on phone */}
          <div className="mt-9 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className={`${ctaClass}`}
              style={{
                background: brandGradients.whatsappCta,
                boxShadow: "0 10px 28px rgba(37, 211, 102, 0.35)",
              }}
              onClick={() => openQuote(es ? "Estimado general" : "General estimate")}
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden />
              {es ? "Pedir estimado" : "Get an estimate"}
            </button>

            <button
              type="button"
              className={ctaClass}
              style={{
                background: brandGradients.whatsappCta,
                boxShadow: "0 10px 28px rgba(37, 211, 102, 0.35)",
              }}
              onClick={() => openWhatsAppChat("hero_plain")}
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden />
              WhatsApp
            </button>

            {site.social.instagram ? (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass}
                style={{
                  background:
                    "linear-gradient(135deg, #f58529 0%, #dd2a7b 45%, #8134af 75%, #515bd4 100%)",
                  boxShadow: "0 10px 28px rgba(221, 42, 123, 0.35)",
                }}
                onClick={() => trackEvent("instagram_click", { source: "hero" })}
                aria-label="Instagram @francisco4704"
              >
                <InstagramIcon className="size-5 shrink-0" />
                Instagram
              </a>
            ) : (
              <span className="hidden sm:block" aria-hidden />
            )}

            <a
              href={phone.tel}
              className={ctaClass}
              style={{
                background: brand.navy,
                boxShadow: "0 10px 28px rgba(0, 0, 0, 0.28)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={() => trackEvent("call_click", { source: "hero" })}
            >
              <Phone className="size-5 shrink-0" style={{ color: brand.orange }} aria-hidden />
              {es ? "Llamar" : "Call"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
