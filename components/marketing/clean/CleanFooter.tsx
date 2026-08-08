"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-content";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

/**
 * Compact footer: logo, estimate, socials, links, thin careers + newsletter.
 * No full-page careers/newsletter sections on the homepage.
 */
export function CleanFooter() {
  const year = new Date().getFullYear();
  const c = useCatalog();
  const es = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const [email, setEmail] = useState("");
  const [nlOk, setNlOk] = useState(false);

  const colLinks = es
    ? [
        { href: "#history", label: "Nosotros" },
        { href: "#services", label: "Servicios" },
        { href: "#book", label: "Agendar" },
        { href: "#reviews", label: "Reseñas" },
        { href: "#hours", label: "Ubicación" },
      ]
    : [
        { href: "#history", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#book", label: "Schedule" },
        { href: "#reviews", label: "Reviews" },
        { href: "#hours", label: "Location" },
      ];

  function onNewsletter(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return;
    openWhatsAppWithMessage(
      es
        ? `📬 *NEWSLETTER*\nEmail: ${value}`
        : `📬 *NEWSLETTER*\nEmail: ${value}`,
      { source: "footer_newsletter", service: "newsletter" },
    );
    trackEvent("quote_open", { service: "newsletter" });
    setNlOk(true);
    setEmail("");
  }

  function onCareer() {
    openWhatsAppWithMessage(
      es
        ? "👷 Hola — me interesa trabajar en Sanchez Auto. ¿Hay vacantes?"
        : "👷 Hi — I’m interested in working at Sanchez Auto. Any openings?",
      { source: "footer_careers", service: "careers" },
    );
  }

  return (
    <footer className="bg-black text-white" data-arrow-theme="dark">
      <div className="mx-auto grid max-w-6xl gap-6 border-b border-white/10 px-5 py-8 sm:px-8 lg:grid-cols-3 lg:gap-8">
        <div className="text-center lg:text-left">
          <Link href="/" className="inline-block">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={200}
              height={130}
              className="mx-auto h-16 w-auto object-contain lg:mx-0"
              loading="lazy"
            />
          </Link>
          <p className="mt-3 text-sm text-white/50">
            {es
              ? "Carrocería · pintura · mecánica · Paterson, NJ"
              : "Body · paint · mechanical · Paterson, NJ"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            {es ? "Contacto" : "Contact"}
          </p>
          <button
            type="button"
            onClick={() => openQuote(es ? "Cotización" : "Estimate")}
            className="mt-4 w-full border-0 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: brandGradients.whatsappCta, borderRadius: "0.25rem" }}
          >
            {es ? "Pedir estimado" : "Get an estimate"}
          </button>
          <a
            href={site.phones[0].tel}
            className="mt-2 block text-center text-sm font-semibold text-white/75 no-underline hover:text-white lg:text-left"
          >
            {site.phones[0].display}
          </a>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm lg:justify-start">
            {site.social.instagram ? (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 no-underline hover:text-white"
              >
                Instagram
              </a>
            ) : null}
            {site.social.facebook ? (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 no-underline hover:text-white"
              >
                Facebook
              </a>
            ) : null}
            <a
              href={site.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 no-underline hover:text-white"
            >
              Google
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            {es ? "Más" : "More"}
          </p>
          <button
            type="button"
            onClick={onCareer}
            className="mt-4 block w-full border-0 bg-transparent p-0 text-left text-sm text-white/70 hover:text-white"
          >
            {es ? "¿Buscas empleo? Escríbenos →" : "Looking for work? Message us →"}
          </button>
          {nlOk ? (
            <p className="mt-4 text-sm text-[#25D366]">
              {es ? "¡Gracias por suscribirte!" : "Thanks for subscribing!"}
            </p>
          ) : (
            <form onSubmit={onNewsletter} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={es ? "Email para novedades" : "Email for updates"}
                className="h-10 min-w-0 flex-1 rounded border-0 px-3 text-sm"
                style={{ color: brand.navy }}
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded border-0 px-3 text-[11px] font-bold uppercase text-white"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                {es ? "OK" : "Join"}
              </button>
            </form>
          )}
          <p className="mt-2 text-[10px] text-white/35">
            {es
              ? "El boletín avisa al taller por WhatsApp (sin lista de email aún)."
              : "Updates notify the shop on WhatsApp (no email list tool yet)."}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:px-8">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px] font-semibold text-white/55">
          {colLinks.map((l) => (
            <a key={l.href} href={l.href} className="no-underline hover:text-white">
              {l.label}
            </a>
          ))}
          <Link href="/privacy" className="no-underline hover:text-white">
            {c.nav.privacy}
          </Link>
          <Link href="/terms" className="no-underline hover:text-white">
            {c.nav.terms}
          </Link>
        </nav>
        <p className="text-[11px] text-white/35">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
