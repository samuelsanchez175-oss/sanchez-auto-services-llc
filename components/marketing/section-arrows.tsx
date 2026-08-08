"use client";

import { useCallback, useEffect, useState } from "react";
import {
  NAV_SECTION_IDS,
  scrollToSection,
  type NavSectionId,
} from "@/lib/nav-sections";
import { useCatalog } from "@/lib/locale";

/** Nav sections that are typically dark (fallback if hit-test fails). */
const DARK_SECTION_IDS = new Set<string>(["home", "work"]);

function isOverDarkBackground(host: HTMLElement): boolean {
  const r = host.getBoundingClientRect();
  const x = Math.min(window.innerWidth - 2, Math.max(2, r.left + r.width / 2));
  const y = Math.min(window.innerHeight - 2, Math.max(2, r.top + r.height / 2));

  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (el === host || host.contains(el)) continue;

    // Explicit theme markers win
    const themed = el.closest("[data-arrow-theme]") as HTMLElement | null;
    if (themed) {
      return themed.getAttribute("data-arrow-theme") === "dark";
    }

    // Known dark section ids
    const section = el.closest("section[id], [id]") as HTMLElement | null;
    if (section?.id && DARK_SECTION_IDS.has(section.id)) return true;

    // Luminance sample of computed background walking up
    let node: HTMLElement | null = el as HTMLElement;
    while (node && node !== document.body) {
      const bg = getComputedStyle(node).backgroundColor;
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (m) {
        const rr = Number(m[1]);
        const gg = Number(m[2]);
        const bb = Number(m[3]);
        const a = bg.startsWith("rgba")
          ? Number(bg.replace(/^rgba\([^,]+,[^,]+,[^,]+,\s*([^)]+)\)$/i, "$1")) || 1
          : 1;
        if (a > 0.55) {
          // Relative luminance
          const L = (0.2126 * rr + 0.7152 * gg + 0.0722 * bb) / 255;
          return L < 0.42;
        }
      }
      node = node.parentElement;
    }
  }
  return false;
}

/**
 * Luzid-style chevrons — larger, black on light, invert on dark sections.
 */
export function SectionArrows() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Background-aware invert (samples behind the arrow stack)
  useEffect(() => {
    const update = () => {
      const host = document.getElementById("hero-nav-arrows");
      if (!host) return;
      try {
        setOnDark(isOverDarkBackground(host));
      } catch {
        /* ignore */
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const id = window.setInterval(update, 400);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(id);
    };
  }, [activeIndex]);

  useEffect(() => {
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
        let bestId: NavSectionId = NAV_SECTION_IDS[0];
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
          let nearest: NavSectionId = NAV_SECTION_IDS[0];
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
        const idx = NAV_SECTION_IDS.indexOf(bestId);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 1],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const goPrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    scrollToSection(NAV_SECTION_IDS[next]);
    setActiveIndex(next);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    const next = Math.min(NAV_SECTION_IDS.length - 1, activeIndex + 1);
    scrollToSection(NAV_SECTION_IDS[next]);
    setActiveIndex(next);
  }, [activeIndex]);

  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= NAV_SECTION_IDS.length - 1;

  return (
    <div
      id="hero-nav-arrows"
      className={`hero-nav-arrows${visible ? " is-visible" : ""}${onDark ? " is-on-dark" : ""}`}
      aria-label={es ? "Navegación de secciones" : "Section navigation"}
    >
      <button
        type="button"
        className="nav-arrow up"
        onClick={goPrev}
        disabled={atStart}
        aria-label={es ? "Sección anterior" : "Previous section"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      <button
        type="button"
        className="nav-arrow down"
        onClick={goNext}
        disabled={atEnd}
        aria-label={es ? "Siguiente sección" : "Next section"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}
