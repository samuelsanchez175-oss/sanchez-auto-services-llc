"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-content";
import { brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-quote";

/**
 * Network-style black footer:
 * logo + tagline | subscribe (WhatsApp handoff) | social
 * + bottom utility links
 */
export function CleanFooter() {
  const year = new Date().getFullYear();
  const c = useCatalog();
  const es = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const [email, setEmail] = useState("");

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const msg = es
      ? `Hola Sanchez Auto — quiero actualizaciones / cotización.\nEmail: ${email || "(no dado)"}`
      : `Hi Sanchez Auto — I’d like updates / a quote.\nEmail: ${email || "(not provided)"}`;
    openWhatsAppWithMessage(msg, { source: "footer_subscribe" });
  }

  const colLinks = es
    ? [
        { href: "#history", label: "Nosotros" },
        { href: "#services", label: "Servicios" },
        { href: "#insurance", label: "Seguros" },
        { href: "#process", label: "Estimado" },
        { href: "#hours", label: "Ubicación" },
      ]
    : [
        { href: "#history", label: "About Us" },
        { href: "#services", label: "Services" },
        { href: "#insurance", label: "Insurance" },
        { href: "#process", label: "Estimate" },
        { href: "#hours", label: "Location" },
      ];

  return (
    <footer className="bg-black text-white" data-arrow-theme="dark">
      <div className="mx-auto grid max-w-6xl gap-0 border-b border-white/10 lg:grid-cols-3">
        {/* Brand column */}
        <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10 lg:items-start lg:border-r lg:border-white/10 lg:text-left">
          <Link href="/" className="inline-block">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={220}
              height={143}
              className="mx-auto h-20 w-auto object-contain lg:mx-0 lg:h-24"
            />
          </Link>
        </div>

        {/* Subscribe → WhatsApp */}
        <div className="border-t border-white/10 px-6 py-12 sm:px-10 lg:border-t-0 lg:border-r lg:border-white/10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            {es ? "Contacto" : "Subscribe"}
          </p>
          <form onSubmit={onSubscribe} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="footer-email"
                className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50"
              >
                {es ? "Tu email" : "Your email"}
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={es ? "Tu correo electrónico" : "Enter your Email address"}
                className="w-full border-0 border-b border-white/35 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="w-full border-0 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110"
              style={{ background: brandGradients.whatsappCta }}
            >
              {es ? "Enviar por WhatsApp" : "Subscribe"}
            </button>
            <button
              type="button"
              onClick={() => openQuote(es ? "Cotización web" : "Web quote")}
              className="w-full border-0 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110"
              style={{ background: brandGradients.whatsappCta }}
            >
              {es ? "Pedir estimado" : "Get an estimate"}
            </button>
          </form>
        </div>

        {/* Social */}
        <div className="border-t border-white/10 px-6 py-12 sm:px-10 lg:border-t-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Social
          </p>
          <ul className="mt-6 space-y-3">
            {site.social.instagram ? (
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/75 no-underline transition hover:text-white"
                >
                  Instagram · @francisco4704
                </a>
              </li>
            ) : null}
            {site.social.facebook ? (
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/75 no-underline transition hover:text-white"
                >
                  Facebook
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={site.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/75 no-underline transition hover:text-white"
              >
                Google Business
              </a>
            </li>
            <li>
              <a
                href={site.phones[0].tel}
                className="text-sm text-white/75 no-underline transition hover:text-white"
              >
                {site.phones[0].display}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom utility bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-8">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-white/70">
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
          <p className="text-[11px] text-white/40">
            © {year} {site.name}. Paterson, NJ.
          </p>
        </div>
      </div>
    </footer>
  );
}
