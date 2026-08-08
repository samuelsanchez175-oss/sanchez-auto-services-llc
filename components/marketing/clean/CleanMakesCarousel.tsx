"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { localDealerships } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";

/**
 * Optical scale so every Simple Icons mark fills the logo frame similarly.
 */
const LOGO_SCALE: Record<string, number> = {
  Honda: 1.12,
  MINI: 1.55,
  BMW: 1.0,
  Subaru: 1.48,
  Toyota: 1.12,
  Mercedes: 1.05,
  Acura: 1.15,
  Audi: 1.28,
  Jeep: 1.32,
  Lexus: 1.2,
  Nissan: 1.18,
  Hyundai: 1.2,
  Kia: 1.35,
  Ford: 1.25,
  Chevy: 1.22,
  Volkswagen: 1.15,
};

const DRAG_THRESHOLD = 8;
/** Wheel idle before snap-to-card (Mac trackpad fires many small events). */
const WHEEL_IDLE_MS = 140;

type DragState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  startScroll: number;
  lastX: number;
  lastT: number;
  velocity: number;
  moved: boolean;
  axis: "none" | "x" | "y";
};

function perViewForWidth(w: number) {
  if (w < 520) return 1;
  if (w < 768) return 2;
  if (w < 1100) return 3;
  return 4;
}

/**
 * Dealership carousel — Mac trackpad two-finger, mouse drag, touch swipe, arrows.
 */
export function CleanMakesCarousel() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const dealers = localDealerships;
  const n = dealers.length;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(4);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const dragging = useRef(false);
  const drag = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
    axis: "none",
  });
  const suppressClick = useRef(false);

  /** After first horizontal wheel in a gesture, keep routing until idle. */
  const wheelAxisLock = useRef<"none" | "x" | "y">("none");
  const wheelIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < max - 2);
  }, []);

  const syncLayout = useCallback(() => {
    const el = scrollerRef.current;
    const pv = perViewForWidth(window.innerWidth);
    setPerView(pv);
    if (!el) return;
    el.style.setProperty("--per-view", String(pv));
    el.style.setProperty("--card-w", `${el.clientWidth / pv}px`);
    updateArrows();
  }, [updateArrows]);

  useEffect(() => {
    syncLayout();
    const el = scrollerRef.current;
    window.addEventListener("resize", syncLayout);
    el?.addEventListener("scroll", updateArrows, { passive: true });
    const ro =
      typeof ResizeObserver !== "undefined" && el
        ? new ResizeObserver(() => syncLayout())
        : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", syncLayout);
      el?.removeEventListener("scroll", updateArrows);
      ro?.disconnect();
    };
  }, [syncLayout, updateArrows, n]);

  const stepPx = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    return el.clientWidth / perView;
  }, [perView]);

  const setInteracting = useCallback((on: boolean) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.classList.toggle("is-dragging", on);
  }, []);

  const snapToNearest = useCallback(
    (momentumPx = 0) => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = stepPx();
      if (step <= 0) return;
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const target = el.scrollLeft + momentumPx;
      const nearest = Math.round(target / step) * step;
      const clamped = Math.max(0, Math.min(max, nearest));
      el.classList.remove("is-dragging");
      el.scrollTo({ left: clamped, behavior: "smooth" });
    },
    [stepPx],
  );

  const prev = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = stepPx();
    el.scrollTo({ left: Math.max(0, el.scrollLeft - step), behavior: "smooth" });
  }, [stepPx]);

  const next = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = stepPx();
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(max, el.scrollLeft + step), behavior: "smooth" });
  }, [stepPx]);

  /**
   * MacBook two-finger trackpad → wheel events (deltaX / deltaY).
   * Must preventDefault on horizontal so the page doesn’t steal the gesture,
   * and snap must be off during the fling or it feels stuck.
   */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const clearWheelIdle = () => {
      if (wheelIdleTimer.current) {
        clearTimeout(wheelIdleTimer.current);
        wheelIdleTimer.current = null;
      }
    };

    /** After trackpad fling settles → unlock axis + snap to card. */
    const scheduleHorizontalIdle = () => {
      clearWheelIdle();
      wheelIdleTimer.current = setTimeout(() => {
        wheelAxisLock.current = "none";
        el.classList.remove("is-dragging");
        snapToNearest(0);
        wheelIdleTimer.current = null;
      }, WHEEL_IDLE_MS);
    };

    /** Vertical page scroll over carousel — unlock only, no snap fight. */
    const scheduleVerticalIdle = () => {
      clearWheelIdle();
      wheelIdleTimer.current = setTimeout(() => {
        wheelAxisLock.current = "none";
        wheelIdleTimer.current = null;
      }, WHEEL_IDLE_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (dragging.current) return;

      // Normalize line/page modes to ~pixels
      let dx = e.deltaX;
      let dy = e.deltaY;
      if (e.deltaMode === 1) {
        dx *= 16;
        dy *= 16;
      } else if (e.deltaMode === 2) {
        dx *= el.clientWidth;
        dy *= el.clientHeight;
      }

      // Shift + vertical wheel → horizontal (classic desktop)
      if (e.shiftKey && Math.abs(dy) >= Math.abs(dx)) {
        dx = dy;
        dy = 0;
      }

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      // Lock axis for this trackpad gesture burst
      if (wheelAxisLock.current === "none") {
        // Mac two-finger horizontal often includes small deltaY noise
        if (absX > 0.5 && absX >= absY * 0.45) {
          wheelAxisLock.current = "x";
        } else if (absY > 0.5 && absY > absX) {
          wheelAxisLock.current = "y";
        } else if (absX > 0.5) {
          wheelAxisLock.current = "x";
        } else {
          return;
        }
      }

      if (wheelAxisLock.current === "y") {
        scheduleVerticalIdle();
        return;
      }

      // Horizontal two-finger / wheel — own gesture so page doesn’t steal it
      e.preventDefault();
      el.classList.add("is-dragging"); // snap off during fling
      el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + dx));
      updateArrows();
      scheduleHorizontalIdle();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearWheelIdle();
    };
  }, [snapToNearest, updateArrows]);

  // Mouse click-drag (not trackpad two-finger — that is wheel)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      // Only mouse primary — touch uses native overflow; trackpad swipe uses wheel
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a, button")) return;

      dragging.current = true;
      drag.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startScroll: el.scrollLeft,
        lastX: e.clientX,
        lastT: performance.now(),
        velocity: 0,
        moved: false,
        axis: "none",
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current || drag.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (drag.current.axis === "none" && (absX > 6 || absY > 6)) {
        drag.current.axis = absX >= absY ? "x" : "y";
        if (drag.current.axis === "y") {
          dragging.current = false;
          drag.current.pointerId = null;
          setInteracting(false);
          return;
        }
        setInteracting(true);
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }

      if (drag.current.axis !== "x") return;
      e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - drag.current.lastT);
      const frameDx = e.clientX - drag.current.lastX;
      drag.current.velocity = drag.current.velocity * 0.7 + (-frameDx / dt) * 0.3;
      drag.current.lastX = e.clientX;
      drag.current.lastT = now;

      if (absX > DRAG_THRESHOLD) {
        drag.current.moved = true;
        suppressClick.current = true;
      }

      el.scrollLeft = drag.current.startScroll - dx;
    };

    const end = (e: PointerEvent) => {
      if (drag.current.pointerId !== e.pointerId) return;
      const wasHorizontal = drag.current.axis === "x";
      const wasMoved = drag.current.moved;
      const vel = drag.current.velocity;
      const pid = e.pointerId;
      dragging.current = false;
      drag.current.pointerId = null;
      setInteracting(false);
      try {
        if (el.hasPointerCapture?.(pid)) el.releasePointerCapture(pid);
      } catch {
        /* ignore */
      }

      if (wasHorizontal && wasMoved) {
        snapToNearest(vel * 160);
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 80);
      } else {
        suppressClick.current = false;
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick.current = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", end, { passive: true });
    el.addEventListener("pointercancel", end, { passive: true });
    el.addEventListener("lostpointercapture", end as EventListener, { passive: true });
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("lostpointercapture", end as EventListener);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [snapToNearest, setInteracting]);

  // Touch: native overflow-x scroll (touch-action: pan-x). Snap on scroll end.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let touchTimer: ReturnType<typeof setTimeout> | null = null;
    let touching = false;

    const onTouchStart = () => {
      touching = true;
      el.classList.add("is-dragging");
      if (touchTimer) clearTimeout(touchTimer);
    };
    const onTouchEnd = () => {
      touching = false;
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        el.classList.remove("is-dragging");
        snapToNearest(0);
        touchTimer = null;
      }, 80);
    };
    const onScroll = () => {
      if (!touching) return;
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        if (!touching) {
          el.classList.remove("is-dragging");
          snapToNearest(0);
        }
        touchTimer = null;
      }, 100);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("scroll", onScroll);
      if (touchTimer) clearTimeout(touchTimer);
    };
  }, [snapToNearest]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [prev, next],
  );

  return (
    <section
      id="dealerships"
      className="scroll-mt-28 py-14 sm:py-20"
      style={{ background: "#F8F8F8" }}
      aria-labelledby="makes-carousel-heading"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2
          id="makes-carousel-heading"
          className="text-[1.75rem] font-black leading-[1.15] tracking-tight text-black sm:text-4xl lg:text-[2.65rem]"
        >
          {es
            ? "Taller exclusivo para concesionarios de confianza"
            : "Exclusive Body Shop For Top Dealerships"}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#333] sm:text-base">
          {es
            ? "Sanchez Auto Services LLC repara vehículos de concesionarios del norte de Jersey — Honda, MINI, BMW, Subaru y más — con estimados claros y ayuda con seguros."
            : "Sanchez Auto Services LLC has partnered with passionate dealers who are not only experts in their market but who also share our vision of nurturing a purposeful way of doing business."}
        </p>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          className="dealer-carousel__arrow dealer-carousel__arrow--left"
          aria-label={es ? "Anterior" : "Previous dealers"}
        >
          <ChevronLeft className="size-5" strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          className="dealer-carousel__arrow dealer-carousel__arrow--right"
          aria-label={es ? "Siguiente" : "Next dealers"}
        >
          <ChevronRight className="size-5" strokeWidth={2.25} />
        </button>

        <div
          ref={scrollerRef}
          className="dealer-carousel__viewport"
          style={{ ["--per-view" as string]: String(perView) }}
          onKeyDown={onKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label={es ? "Concesionarios" : "Dealerships"}
          tabIndex={0}
        >
          <div className="dealer-carousel__track">
            {dealers.map((d) => (
              <article key={d.name} className="dealer-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.photo}
                  alt=""
                  className="dealer-card__bg"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className="dealer-card__shade" aria-hidden />
                <div className="dealer-card__content">
                  <div
                    className="dealer-card__logo-wrap"
                    style={
                      {
                        ["--logo-scale" as string]: String(LOGO_SCALE[d.brand] ?? 1.15),
                      } as React.CSSProperties
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.logoWhite}
                      alt={d.brand}
                      className="dealer-card__logo"
                      width={240}
                      height={160}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <p className="dealer-card__name">{d.name}</p>
                  <a
                    href={d.tel}
                    className="dealer-card__phone"
                    onClick={() =>
                      trackEvent("call_click", {
                        source: "dealership_carousel",
                        dealer: d.name,
                      })
                    }
                  >
                    {d.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-3xl px-5 text-center text-xs text-[#999] sm:px-8">
        {es
          ? "Desliza con dos dedos, arrastra o usa las flechas · referencia — no afiliación oficial."
          : "Two-finger swipe, drag, or use arrows · public names & phones for reference — not official affiliations."}
      </p>
    </section>
  );
}
