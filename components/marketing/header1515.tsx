"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Phone, X, ChevronRight } from "lucide-react";
import { mapDirectionsUrl, site } from "@/lib/site-content";
import { useLocaleActions } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand, brandGradients } from "@/lib/brand";

export function Header() {
  const pathname = usePathname();
  const { catalog: c, locale, setLocale } = useLocaleActions();
  const { openQuote } = useQuoteLead();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const main = site.phones[0];
  const root = pathname === "/" ? "" : "/";
  const es = locale === "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: `${root}#services`, label: c.nav.services },
    { href: `${root}#insurance`, label: es ? "Insurance" : "Insurance" },
    { href: `${root}#reviews`, label: c.nav.reviews },
    { href: `${root}#quote`, label: c.nav.quote },
    { href: `${root}#hours`, label: es ? "Hours" : "Hours" },
  ];

  if (es) {
    links[1].label = "Seguros";
    links[4].label = "Horario";
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300"
        style={{
          borderBottom: "1px solid #E6EAEF",
          boxShadow: scrolled ? "0 4px 24px rgba(7,37,63,0.07)" : "none",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-10 w-auto max-w-[168px] object-contain object-left sm:h-11 sm:max-w-[200px]"
              sizes="200px"
              priority
            />
          </Link>

          <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold no-underline transition-opacity hover:opacity-70"
                style={{ color: brand.navy }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div
              className="hidden h-9 items-stretch overflow-hidden rounded-full text-xs font-bold sm:flex"
              style={{ background: brand.mist, border: "1px solid #E6EAEF" }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className="px-3.5 transition-colors"
                style={{
                  color: locale === "en" ? "#fff" : brand.steel,
                  background: locale === "en" ? brand.navy : "transparent",
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("es")}
                className="px-3.5 transition-colors"
                style={{
                  color: locale === "es" ? "#fff" : brand.steel,
                  background: locale === "es" ? brand.navy : "transparent",
                }}
              >
                ES
              </button>
            </div>

            <a
              href={main.tel}
              className="hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold no-underline sm:inline-flex"
              style={{ color: brand.navy, background: brand.mist }}
            >
              <Phone className="size-3.5" style={{ color: brand.orange }} />
              {main.display}
            </a>

            <button
              type="button"
              onClick={() => openQuote()}
              className="hidden items-center gap-1.5 rounded-full border-0 px-3.5 py-2 text-sm font-bold text-white sm:inline-flex"
              style={{ background: brandGradients.whatsappCta }}
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-full lg:hidden"
              style={{ background: brand.mist }}
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-[1.5px] w-5 rounded" style={{ background: brand.navy }} />
                <span className="block h-[1.5px] w-3.5 rounded" style={{ background: brand.navy }} />
                <span className="block h-[1.5px] w-5 rounded" style={{ background: brand.navy }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,320px)] flex-col bg-white shadow-2xl"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between border-b px-4" style={{ borderColor: "#E6EAEF" }}>
              <Image
                src={site.logo.src}
                alt=""
                width={140}
                height={90}
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex size-9 items-center justify-center rounded-full"
                style={{ background: brand.mist }}
                aria-label="Close"
              >
                <X className="size-4" style={{ color: brand.navy }} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold no-underline"
                  style={{ color: brand.navy, background: brand.paper }}
                >
                  {l.label}
                  <ChevronRight className="size-4 opacity-40" />
                </a>
              ))}
            </div>
            <div className="space-y-2 border-t p-4" style={{ borderColor: "#E6EAEF" }}>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openQuote();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-sm font-bold text-white"
                style={{ background: brandGradients.whatsappCta }}
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </button>
              <a
                href={main.tel}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold no-underline"
                style={{ background: brand.mist, color: brand.navy }}
              >
                <Phone className="size-4" style={{ color: brand.orange }} />
                {main.display}
              </a>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-semibold no-underline"
                style={{ color: brand.steel }}
              >
                {c.hours.directionsLink}
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </>
  );
}
