"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

/**
 * Network locations-style image grid —
 * large 3:2 facility photos with bottom gradient captions.
 */
const WORK = [
  {
    src: "/gallery/shop-3.jpg",
    titleEn: "Body & paint bay",
    titleEs: "Bahía de carrocería y pintura",
    blurbEn: "Collision panels, refinish prep, and color work.",
    blurbEs: "Paneles de colisión, prep y color.",
  },
  {
    src: "/gallery/shop-1.jpg",
    titleEn: "Shop floor",
    titleEs: "Piso del taller",
    blurbEn: "Where estimates become documented repairs.",
    blurbEs: "Donde los estimados se vuelven reparaciones.",
  },
  {
    src: "/gallery/shop-2.jpg",
    titleEn: "Mechanical bay",
    titleEs: "Bahía mecánica",
    blurbEn: "Brakes, diagnostics, post-collision mechanical.",
    blurbEs: "Frenos, diagnóstico y mecánica post-colisión.",
  },
  {
    src: "/gallery/shop-4.jpg",
    titleEn: "99 E Railway Ave",
    titleEs: "99 E Railway Ave",
    blurbEn: "Paterson — easy access from Route 80.",
    blurbEs: "Paterson — acceso fácil desde la Ruta 80.",
  },
] as const;

export function CleanWork() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="work" data-arrow-theme="dark" className="nw-section scroll-mt-28 bg-[#0c1218]">
      <div className="nw-wrap">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="nw-kicker">{es ? "Trabajos / taller" : "Our work / shop"}</p>
            <h2 className="nw-h2">
              {es ? "El taller en acción" : "The shop in action"}
            </h2>
            <p className="nw-lead">
              {es
                ? "Fotos reales del taller en 99 E Railway Ave — carrocería, pintura y mecánica. (Antes/después de trabajos se suman aquí.)"
                : "Real photos from our shop at 99 E Railway Ave — body, paint, and mechanical bays. (Job before/after shots belong here next.)"}
            </p>
          </div>
          <button
            type="button"
            className="nw-btn shrink-0"
            onClick={() => openQuote(es ? "Cotización de trabajo" : "Work estimate")}
          >
            {es ? "Pedir estimado" : "Get an estimate"}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {WORK.map((w, i) => (
            <article
              key={w.src}
              className={`nw-photo group ${i === 0 ? "sm:col-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "21/9" : "3/2" }}
            >
              <Image
                src={w.src}
                alt={es ? w.titleEs : w.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes={i === 0 ? "100vw" : "50vw"}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="nw-photo-overlay" />
              <div className="nw-photo-caption">
                <h3>{es ? w.titleEs : w.titleEn}</h3>
                <p>{es ? w.blurbEs : w.blurbEn}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
