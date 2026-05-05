"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, X, ChevronRight } from "lucide-react";
import { mapDirectionsUrl, site } from "@/lib/site-content";
import { useLocaleActions } from "@/lib/locale";

export function Header() {
  const pathname = usePathname();
  const { catalog: c, locale, setLocale } = useLocaleActions();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const main = site.phones[0];
  const mainWhatsAppDigits = main.tel.replace(/\D/g, "");
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
            ? "rgba(15, 12, 20, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="flex h-14 items-center px-4 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center py-1.5 no-underline"
            aria-label="Home"
          >
            <Image
              src="/logo-sanchez-auto-services.png"
              alt="Sanchez Auto Services LLC"
              width={451}
              height={174}
              className="h-7 w-auto max-w-[115px] object-contain object-left sm:h-9 sm:max-w-[152px]"
              sizes="(max-width: 640px) 115px, 152px"
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

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${mainWhatsAppDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${main.display}`}
                className="flex size-9 shrink-0 items-center justify-center rounded-full no-underline transition-all active:scale-95"
                style={{
                  background: "linear-gradient(145deg, #25d366, #128c7e)",
                }}
              >
                <svg
                  className="size-[15px] shrink-0 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
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
            style={{ background: "#0f0c14", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
            aria-label="Main menu"
          >
            {/* Drawer header */}
            <div className="flex h-14 items-center justify-between px-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                Menu
              </span>
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
                { href: `${root}#services`, label: c.nav.services },
                { href: `${root}#quote`, label: c.nav.quote },
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

            {/* Call CTA at bottom */}
            <div className="p-4 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white no-underline"
                  style={{ background: "linear-gradient(135deg,#e04e28,#c03020)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Phone className="size-4" aria-hidden />
                  {p.display}
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
