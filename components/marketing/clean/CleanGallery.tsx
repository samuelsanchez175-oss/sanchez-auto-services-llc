"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";

const PHOTOS = [
  { src: "/gallery/shop-1.jpg", en: "Shop floor", es: "Taller" },
  { src: "/gallery/shop-3.jpg", en: "Body & paint", es: "Carrocería y pintura" },
  { src: "/gallery/shop-2.jpg", en: "Repair bay", es: "Bahía de trabajo" },
  { src: "/gallery/shop-4.jpg", en: "Facility", es: "Instalaciones" },
] as const;

export function CleanGallery() {
  const { locale } = useCatalog();
  const es = locale === "es";

  return (
    <section id="gallery" className="scroll-mt-20 border-t py-10 sm:py-14" style={{ background: brand.paper, borderColor: "#E6EAEF" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-6">
          <p
            className="mb-1 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: brand.orange }}
          >
            {es ? "El taller" : "The shop"}
          </p>
          <h2
            className="text-2xl font-black tracking-tight sm:text-3xl"
            style={{ color: brand.navy }}
          >
            {es ? "Fotos del local" : "Shop photos"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className={`relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[280px]" : "aspect-square"
              }`}
            >
              <Image
                src={p.src}
                alt={es ? p.es : p.en}
                fill
                sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "25vw"}
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-3 pt-10"
                style={{
                  background: "linear-gradient(to top, rgba(7,37,63,0.75), transparent)",
                }}
              >
                <p className="text-xs font-semibold text-white sm:text-sm">
                  {es ? p.es : p.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
