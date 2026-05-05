"use client";

import { MessageCircle, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

const WA_NUMBER = "19736094586";
const WA_GREETING = "Hi! I'd like to get a quote or ask about your services. Can you help me?";

function waUrl(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppHero() {
  const c = useCatalog();

  function scrollToServices() {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ── Hero background image (real shop photo) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/shop-1.jpg"
          alt="Sanchez Auto Services shop floor"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Multi-layer dark gradient overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,8,16,0.30) 0%, rgba(10,8,16,0.45) 30%, rgba(10,8,16,0.50) 65%, rgba(10,8,16,0.88) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-end px-5 pb-10 pt-20 text-center sm:justify-center sm:pt-20">

        {/* Badge */}
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="size-1.5 rounded-full bg-green-400 inline-block" aria-hidden />
          {c.locale === "es" ? "Paterson, NJ · Negocio Familiar" : "Paterson, NJ · Family-Owned"}
        </div>

        {/* Headline */}
        <h1
          className="mb-4 text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl"
          style={{ color: "#ffffff" }}
        >
          {c.locale === "es" ? (
            <>Respuestas Rápidas.<br /><span style={{ color: "#25d366" }}>Cotizaciones Reales.</span></>
          ) : (
            <>Fast Answers.<br /><span style={{ color: "#25d366" }}>Real Quotes.</span></>
          )}
        </h1>

        <p
          className="mb-8 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base"
          style={{ color: "rgba(255,255,255,0.60)" }}
        >
          {c.locale === "es"
            ? "Reparación de colisiones, pintura, mecánica y más. Envíanos un mensaje por WhatsApp — respondemos rápido."
            : "Collision repair, painting, engine work, oil changes & more. Message us on WhatsApp — we reply fast."}
        </p>

        {/* WhatsApp CTA */}
        <a
          href={waUrl(WA_GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex w-full max-w-xs items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-black text-white no-underline transition-all active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
            boxShadow: "0 6px 28px rgba(37,211,102,0.40)",
            letterSpacing: "0.01em",
          }}
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          {c.locale === "es" ? "Chatear por WhatsApp" : "Chat with Us on WhatsApp"}
        </a>

        {/* Phone buttons */}
        <div className="mb-8 flex w-full max-w-xs gap-2">
          {site.phones.map((p) => (
            <a
              key={p.tel}
              href={p.tel}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-3 text-xs font-bold text-white no-underline transition-all"
              style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(6px)" }}
            >
              <Phone className="size-3.5" aria-hidden />
              {p.display}
            </a>
          ))}
        </div>

        {/* ── See All Services button ── */}
        <button
          type="button"
          onClick={scrollToServices}
          className="flex flex-col items-center gap-1.5 transition-all active:scale-95"
          style={{ color: "rgba(255,255,255,0.40)" }}
          aria-label="Scroll to services"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">
            {c.locale === "es" ? "Ver todos los servicios" : "See all services"}
          </span>
          <ChevronDown className="size-5 animate-bounce" aria-hidden />
        </button>
      </div>
    </section>
  );
}
