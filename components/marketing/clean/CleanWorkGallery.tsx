"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Camera, MoveHorizontal } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";
import { IG_HANDLE, IG_PROFILE, WORK_PAIRS } from "@/lib/work-gallery";
import { trackEvent } from "@/lib/analytics";

function CompareCard({
  pair,
  es,
}: {
  pair: (typeof WORK_PAIRS)[number];
  es: boolean;
}) {
  const [pct, setPct] = useState(50);
  const title = es ? pair.titleEs : pair.titleEn;
  const beforeL = es ? pair.beforeLabelEs : pair.beforeLabelEn;
  const afterL = es ? pair.afterLabelEs : pair.afterLabelEn;

  return (
    <article
      className="overflow-hidden border border-[#E6EAEF]"
      style={{ background: brand.white, borderRadius: "0.25rem" }}
    >
      <div className="relative aspect-[4/3] select-none overflow-hidden bg-[#0a1628]">
        <Image
          src={pair.after}
          alt={`${title} — ${afterL}`}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${title} — ${beforeL}`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 z-[1] w-0.5 bg-white shadow-lg"
          style={{ left: `${pct}%` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/2 z-[1] flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/95 shadow"
          style={{ left: `${pct}%`, color: brand.navy }}
          aria-hidden
        >
          <MoveHorizontal className="size-4" />
        </div>
        <span className="absolute left-2 top-2 z-[1] rounded bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          {beforeL}
        </span>
        <span className="absolute right-2 top-2 z-[1] rounded bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          {afterL}
        </span>
        <input
          type="range"
          min={5}
          max={95}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          onPointerDown={() => trackEvent("gallery_compare", { pair: pair.id })}
          aria-label={es ? "Comparar antes y después" : "Compare before and after"}
          className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <h3 className="text-sm font-extrabold" style={{ color: brand.navy }}>
          {title}
        </h3>
        {pair.igAfter ? (
          <a
            href={pair.igAfter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold no-underline"
            style={{ color: brand.steel }}
          >
            IG <ExternalLink className="size-3" aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Before/after work gallery — photos from Instagram @francisco4704.
 */
export function CleanWorkGallery() {
  const { locale } = useCatalog();
  const es = locale === "es";

  return (
    <section id="work" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="nw-kicker">{es ? "Trabajos reales" : "Real work"}</p>
            <h2 className="nw-h2">
              {es ? "Antes y después del taller" : "Shop before & after"}
            </h2>
            <p className="nw-lead">
              {es
                ? "Fotos del feed de trabajo del taller. Arrastra para comparar. Crédito: Instagram"
                : "Photos from the shop work feed. Drag to compare. Credit: Instagram"}{" "}
              <a
                href={IG_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold no-underline"
                style={{ color: brand.orangeDeep }}
                onClick={() => trackEvent("instagram_click", { source: "work_gallery" })}
              >
                @{IG_HANDLE}
              </a>
              .
            </p>
          </div>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white no-underline"
            style={{ background: brand.navy, borderRadius: "0.25rem" }}
            onClick={() => trackEvent("instagram_click", { source: "work_gallery_cta" })}
          >
            <Camera className="size-4" aria-hidden />
            {es ? "Más en Instagram" : "More on Instagram"}
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {WORK_PAIRS.map((pair) => (
            <CompareCard key={pair.id} pair={pair} es={es} />
          ))}
        </div>
      </div>
    </section>
  );
}
