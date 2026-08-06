"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Phone, X, ChevronRight } from "lucide-react";
import { mapDirectionsUrl, site } from "@/lib/site-content";
import { useLocaleActions } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

export function Header() {
  const pathname = usePathname();
  const { catalog: c, locale, setLocale } = useLocaleActions();
  const { openQuote } = useQuoteLead();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const main = site.phones[0];
  const root = pathname === "/" ? "" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(6, 21, 37, 0.94)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(126,182,232,0.12)" : "none",
        }}
      >
        <div className="flex h-14 items-center px-4 sm:px-5">
          {/* Logo — full brand mark (navy/orange car + wrenches) */}
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-md bg-white/95 px-1.5 py-1 no-underline shadow-sm sm:px-2 sm:py-1.5"
            aria-label="Sanchez Auto Services LLC — Home"
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-8 w-auto max-w-[140px] object-contain object-left sm:h-10 sm:max-w-[180px]"
              sizes="(max-width: 640px) 140px, 180px"
              priority
            />
          </Link>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">
            {/* Language pill — h-9 to align with adjacent size-9 icon circles */}
            <div
              className="flex h-9 min-h-9 shrink-0 items-stretch overflow-hidden rounded-full text-xs font-bold leading-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className="flex flex-1 items-center justify-center px-3.5 transition-all sm:px-4"
                style={{
                  color: locale === "en" ? "#fff" : "rgba(255,255,255,0.45)",
                  background: locale === "en" ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                EN
              </button>
              <span
                className="flex shrink-0 select-none items-center px-0.5 text-[10px] font-normal"
                style={{ color: "rgba(255,255,255,0.2)" }}
                aria-hidden
              >
                |
              </span>
              <button
                type="button"
                onClick={() => setLocale("es")}
                className="flex flex-1 items-center justify-center px-3.5 transition-all sm:px-4"
                style={{
                  color: locale === "es" ? "#fff" : "rgba(255,255,255,0.45)",
                  background: locale === "es" ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                ES
              </button>
            </div>

            {/* Directions + WhatsApp: tighter pair so map pin hugs chat */}
            <div className="flex items-center gap-1">
              {/* Directions (Google Maps) */}
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.hours.directionsLink}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white no-underline transition-all hover:bg-white/12 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <svg
                  className="size-[15px] shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="sanchezDirectionsMapsPinClip">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#sanchezDirectionsMapsPinClip)">
                    {/* Orthogonal quad split (~Google marker cues), readable at 14px */}
                    <path fill="#4285F4" d="M0 0H12V9H0z" />
                    <path fill="#EA4335" d="M12 0H24V9H12z" />
                    <path fill="#34A853" d="M0 9H12V24H0z" />
                    <path fill="#FBBC04" d="M12 9H24V24H12z" />
                    <circle cx="12" cy="8.75" r="2.35" fill="#fff" />
                  </g>
                  <path
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.65"
                    strokeLinejoin="round"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                </svg>
              </a>

              {/* WhatsApp → structured quote sheet */}
              <button
                type="button"
                onClick={() => openQuote()}
                aria-label={locale === "es" ? "Cotizar por WhatsApp" : "WhatsApp quote"}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 transition-all active:scale-95"
                style={{
                  background: "linear-gradient(145deg, #25d366, #128c7e)",
                }}
              >
                <MessageCircle className="size-[15px] shrink-0 text-white" aria-hidden />
              </button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-full transition-all hover:bg-white/10"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[1.5px] w-5 rounded bg-white" />
                <span className="block h-[1.5px] w-4 rounded bg-white" />
                <span className="block h-[1.5px] w-5 rounded bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen slide-in drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />

          {/* Drawer panel */}
          <nav
            className="fixed inset-y-0 right-0 z-[70] flex w-72 flex-col"
            style={{ background: "#001830", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
            aria-label="Main menu"
          >
            {/* Drawer header */}
            <div className="flex h-14 items-center justify-between gap-3 px-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex shrink-0 rounded bg-white px-1.5 py-0.5">
                  <Image
                    src={site.logo.src}
                    alt=""
                    width={site.logo.width}
                    height={site.logo.height}
                    className="h-7 w-auto max-w-[100px] object-contain"
                    sizes="100px"
                  />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Menu
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex size-8 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="Close menu"
              >
                <X className="size-4 text-white" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-1 flex-col px-4 py-6 gap-1">
              {[
                { href: `${root}#home`, label: locale === "es" ? "Inicio" : "Home" },
                { href: `${root}#insurance`, label: locale === "es" ? "Seguros" : "Insurance" },
                { href: `${root}#services`, label: c.nav.services },
                { href: `${root}#process`, label: locale === "es" ? "Proceso" : "Process" },
                { href: `${root}#gallery`, label: locale === "es" ? "Taller" : "Shop" },
                { href: `${root}#quote`, label: c.nav.quote },
                { href: `${root}#reviews`, label: c.nav.reviews },
                { href: `${root}#faq`, label: c.nav.faq },
                { href: `${root}#hours`, label: c.nav.hours },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-white no-underline transition-all"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {item.label}
                  <ChevronRight className="size-4 opacity-30" />
                </Link>
              ))}
            </div>

            {/* Conversion CTAs at bottom */}
            <div className="space-y-2 p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
                onClick={() => {
                  setMenuOpen(false);
                  openQuote();
                }}
              >
                <MessageCircle className="size-4" aria-hidden />
                {locale === "es" ? "Cotizar por WhatsApp" : "WhatsApp quote"}
              </button>
              <a
                href={main.tel}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white no-underline"
                style={{ background: "linear-gradient(135deg,#FB8C33,#E07020)" }}
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="size-4" aria-hidden />
                {main.display}
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
