"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Phone, X, ChevronRight } from "lucide-react";
import { mapDirectionsUrl, site } from "@/lib/site-content";
import { useLocaleActions } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand, brandGradients } from "@/lib/brand";
import { openWhatsAppChat } from "@/lib/whatsapp-quote";
import { NAV_SECTION_IDS, scrollToSection } from "@/lib/nav-sections";
import { trackEvent } from "@/lib/analytics";

type NavLink = { href: string; id: string; label: string };

export function Header() {
  const pathname = usePathname();
  const { catalog: c, locale, setLocale } = useLocaleActions();
  const { openQuote } = useQuoteLead();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const main = site.phones[0];
  const root = pathname === "/" ? "" : "/";
  const es = locale === "es";
  const onHome = pathname === "/";

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

  /** Scroll-spy: highlight top-bar link for the section in view */
  useEffect(() => {
    if (!onHome) return;

    const nodes = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (!nodes.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = "home";
        let best = -1;
        for (const id of NAV_SECTION_IDS) {
          const r = ratios.get(id) ?? 0;
          if (r > best) {
            best = r;
            bestId = id;
          }
        }
        if (best < 0.08) {
          const mid = window.innerHeight * 0.35;
          let nearest = "home";
          let nearestDist = Infinity;
          for (const id of NAV_SECTION_IDS) {
            const el = document.getElementById(id);
            if (!el) continue;
            const top = el.getBoundingClientRect().top;
            const dist = Math.abs(top - mid);
            if (top <= mid + 80 && dist < nearestDist) {
              nearestDist = dist;
              nearest = id;
            }
          }
          bestId = nearest;
        }
        setActiveId(bestId);
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 1],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome]);

  /** Slim top bar — core path only */
  const primaryLinks: NavLink[] = useMemo(
    () =>
      es
        ? [
            { href: `${root}#home`, id: "home", label: "Inicio" },
            { href: `${root}#dealerships`, id: "dealerships", label: "Marcas" },
            { href: `${root}#history`, id: "history", label: "Nosotros" },
            { href: `${root}#services`, id: "services", label: "Servicios" },
            { href: `${root}#work`, id: "work", label: "Taller" },
            { href: `${root}#reviews`, id: "reviews", label: "Reseñas" },
            { href: `${root}#hours`, id: "hours", label: "Ubicación" },
          ]
        : [
            { href: `${root}#home`, id: "home", label: "Home" },
            { href: `${root}#dealerships`, id: "dealerships", label: "Dealers" },
            { href: `${root}#history`, id: "history", label: "About" },
            { href: `${root}#services`, id: "services", label: "Services" },
            { href: `${root}#work`, id: "work", label: "Shop" },
            { href: `${root}#reviews`, id: "reviews", label: "Reviews" },
            { href: `${root}#hours`, id: "hours", label: "Location" },
          ],
    [es, root],
  );

  function onNavClick(e: React.MouseEvent, id: string) {
    if (!onHome) return; // let full navigation go to /#id
    e.preventDefault();
    setMenuOpen(false);
    setActiveId(id);
    scrollToSection(id);
  }

  /** Solid highlight only — no outer glow (avoids clipping in the header). */
  const activeLinkStyle = {
    color: brand.orangeDeep,
    background: brand.orangeSoft,
    boxShadow: "none",
  } as const;

  const idleLinkStyle = {
    color: brand.navy,
    background: "transparent",
    boxShadow: "none",
  } as const;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
        style={{
          background: brand.white,
          borderBottom: "1px solid #E6EAEF",
          boxShadow: scrolled ? "0 4px 24px rgba(7,37,63,0.07)" : "none",
        }}
      >
        {/* Utility row — contact always visible (Network-style) */}
        <div
          className="hidden border-b sm:block"
          style={{ background: brand.navy, borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] font-semibold text-white/90 sm:px-6">
            <p className="truncate">
              {site.address.line1}, {site.address.city}, {site.address.state} {site.address.postalCode}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <a href={main.tel} className="no-underline hover:text-white">
                {main.display}
              </a>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-white"
              >
                {es ? "Direcciones" : "Directions"}
              </a>
              <a
                href={site.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden no-underline hover:text-white md:inline"
              >
                Google
              </a>
              <span className="hidden text-white/50 md:inline">
                {es ? "Lun–Sáb 9–6 · Dom: llame" : "Mon–Sat 9–6 · Sun: call ahead"}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              className="h-9 w-auto max-w-[150px] object-contain object-left sm:h-11 sm:max-w-[190px]"
              sizes="190px"
              priority
            />
          </Link>

          {/* Desktop mega-nav — scrollable if needed */}
          <nav
            className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto lg:flex xl:ml-4 xl:gap-1"
            aria-label="Primary"
          >
            {primaryLinks.map((l) => {
              const active = onHome && activeId === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.id)}
                  className="nav-link-item shrink-0 rounded-md px-2 py-1.5 text-[12px] font-semibold no-underline transition-colors duration-200 hover:bg-black/[0.04] xl:px-2.5 xl:text-[13px]"
                  style={active ? activeLinkStyle : idleLinkStyle}
                  data-active={active ? "true" : undefined}
                  aria-current={active ? "true" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div
              className="hidden h-8 items-stretch overflow-hidden rounded-full text-[11px] font-bold sm:flex"
              style={{ background: brand.mist, border: "1px solid #E6EAEF" }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className="px-2.5 transition-colors"
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
                className="px-2.5 transition-colors"
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
              className="hidden items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold no-underline lg:inline-flex"
              style={{ color: brand.navy, background: brand.mist }}
            >
              <Phone className="size-3.5" style={{ color: brand.orange }} />
              <span className="hidden xl:inline">{main.display}</span>
            </a>

            <button
              type="button"
              onClick={() => openQuote()}
              className="hidden items-center gap-1 rounded-full border-0 px-2.5 py-1.5 text-xs font-bold text-white md:inline-flex"
              style={{ background: brandGradients.whatsappCta }}
            >
              <MessageCircle className="size-3.5" />
              {es ? "Estimado" : "Estimate"}
            </button>
            {site.social.instagram ? (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold no-underline md:inline-flex"
                style={{ color: brand.navy, background: brand.mist }}
                onClick={() => trackEvent("instagram_click", { source: "header" })}
              >
                Instagram
              </a>
            ) : null}

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
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,340px)] flex-col shadow-2xl"
            style={{ background: brand.white }}
            aria-label="Menu"
          >
            <div
              className="flex h-14 items-center justify-between border-b px-4"
              style={{ borderColor: "#E6EAEF" }}
            >
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
            <div className="flex-1 overflow-y-auto p-3">
              <div className="mb-2 flex gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: locale === "en" ? brand.navy : brand.mist,
                    color: locale === "en" ? "#fff" : brand.navy,
                  }}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: locale === "es" ? brand.navy : brand.mist,
                    color: locale === "es" ? "#fff" : brand.navy,
                  }}
                >
                  ES
                </button>
              </div>
              {primaryLinks.map((l) => {
                const active = onHome && activeId === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.id)}
                    className="mb-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-all duration-200"
                    style={
                      active
                        ? {
                            color: brand.orangeDeep,
                            background: brand.orangeSoft,
                            boxShadow: "none",
                          }
                        : { color: brand.navy, background: brand.paper }
                    }
                    data-active={active ? "true" : undefined}
                    aria-current={active ? "true" : undefined}
                  >
                    {l.label}
                    <ChevronRight
                      className="size-4"
                      style={{ opacity: active ? 1 : 0.4, color: active ? brand.orange : undefined }}
                    />
                  </a>
                );
              })}
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
                {es ? "Cotizar (plantilla)" : "Quote (template)"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openWhatsAppChat("menu_plain");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-sm font-bold text-white"
                style={{ background: brandGradients.whatsappCta }}
              >
                <MessageCircle className="size-4" />
                {es ? "Chatear (libre)" : "Chat (no template)"}
              </button>
              <a
                href={main.tel}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold no-underline"
                style={{ background: brand.mist, color: brand.navy }}
              >
                <Phone className="size-4" style={{ color: brand.orange }} />
                {main.display}
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </>
  );
}
