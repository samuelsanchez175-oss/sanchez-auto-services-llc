"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, X, ChevronRight } from "lucide-react";
import { site } from "@/lib/site-content";
import { useLocaleActions } from "@/lib/locale";

export function Header() {
  const pathname = usePathname();
  const { catalog: c, locale, setLocale } = useLocaleActions();
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
            ? "rgba(15, 12, 20, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="flex h-14 items-center px-4 sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none no-underline" aria-label="Home">
            <span className="text-[13px] font-black tracking-[0.08em] text-white">
              SANCHEZ AUTO
            </span>
            <span
              className="text-[8px] font-bold uppercase tracking-[0.28em]"
              style={{ color: "#e04e28" }}
            >
              Services LLC
            </span>
          </Link>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">
            {/* Language pill */}
            <div
              className="flex items-center rounded-full text-[10px] font-bold overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className="px-2.5 py-1 transition-all"
                style={{
                  color: locale === "en" ? "#fff" : "rgba(255,255,255,0.45)",
                  background: locale === "en" ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                EN
              </button>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              <button
                type="button"
                onClick={() => setLocale("es")}
                className="px-2.5 py-1 transition-all"
                style={{
                  color: locale === "es" ? "#fff" : "rgba(255,255,255,0.45)",
                  background: locale === "es" ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                ES
              </button>
            </div>

            {/* Call button */}
            <a
              href={main.tel}
              aria-label={`Call ${main.display}`}
              className="flex size-9 items-center justify-center rounded-full no-underline transition-all active:scale-95"
              style={{ background: "#e04e28" }}
            >
              <Phone className="size-[15px] text-white" aria-hidden />
            </a>

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
