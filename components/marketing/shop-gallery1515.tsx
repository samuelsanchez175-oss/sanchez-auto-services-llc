"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { MessageCircle } from "lucide-react";

/** Labeled process shots (real shop photos) for insurance / visit confidence */
const SHOTS = [
  {
    src: "/gallery/shop-3.jpg",
    alt: "Sanchez Auto body and paint area",
    labelEn: "1 · Inspect & document",
    labelEs: "1 · Inspección y fotos",
  },
  {
    src: "/gallery/shop-1.jpg",
    alt: "Sanchez Auto shop floor",
    labelEn: "2 · Body & structure",
    labelEs: "2 · Carrocería",
  },
  {
    src: "/gallery/shop-4.jpg",
    alt: "Sanchez Auto facility",
    labelEn: "3 · Paint & finish",
    labelEs: "3 · Pintura y acabado",
  },
  {
    src: "/gallery/shop-2.jpg",
    alt: "Sanchez Auto repair bay",
    labelEn: "4 · Ready for pickup",
    labelEs: "4 · Listo para entrega",
  },
] as const;

export function ShopGallerySection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section
      id="gallery"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: "#001830" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p
              className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
              style={{ color: "#FB8C33" }}
            >
              {isEs ? "El taller" : "The shop"}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {isEs
                ? "Un solo techo: carrocería y mecánica"
                : "One roof for body & mechanical"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {isEs
                ? "En 99 E Railway Ave, Paterson — cerca de la Ruta 80 y el mercado de agricultores."
                : "At 99 E Railway Ave, Paterson — near Route 80 and the historic farmers market corridor."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openQuote()}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border-0 px-5 py-3 text-sm font-bold text-white sm:self-auto"
            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
          >
            <MessageCircle className="size-4" aria-hidden />
            {isEs ? "Cotizar visita" : "Quote a visit"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {SHOTS.map((shot, i) => (
            <div
              key={shot.src}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[280px]" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,24,48,0.75) 0%, transparent 55%)",
                }}
                aria-hidden
              />
              <p className="absolute bottom-3 left-3 right-3 text-left text-xs font-semibold text-white sm:text-sm">
                {isEs ? shot.labelEs : shot.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
