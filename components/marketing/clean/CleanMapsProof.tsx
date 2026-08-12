"use client";

import Image from "next/image";
import { ExternalLink, MapPin, Star } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site-content";
import { trackEvent } from "@/lib/analytics";

const SHOP_PHOTOS = [
  { src: "/gallery/shop-1.jpg", en: "Shop floor", es: "Taller" },
  { src: "/gallery/shop-2.jpg", en: "Repair bay", es: "Bahía" },
  { src: "/gallery/shop-3.jpg", en: "Body & paint", es: "Carrocería" },
  { src: "/gallery/shop-4.jpg", en: "Facility", es: "Instalaciones" },
] as const;

/**
 * Local proof strip: shop gallery + Google Maps place embed + GBP links.
 * Full Places photo sync still available via `npm run gallery:pull` when a key is set.
 */
export function CleanMapsProof() {
  const { locale } = useCatalog();
  const es = locale === "es";

  return (
    <section
      id="gallery"
      className="nw-section scroll-mt-28"
      style={{ background: brand.white }}
    >
      <div className="nw-wrap">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="nw-kicker">{es ? "Prueba local" : "Local proof"}</p>
            <h2 className="nw-h2">
              {es ? "El taller y el mapa" : "The shop & the map"}
            </h2>
            <p className="nw-lead">
              {es
                ? "Fotos del local en Paterson y la ficha de Google Maps — misma dirección NAP."
                : "Shop photos in Paterson plus our Google Maps listing — same NAP address."}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
            style={{
              background: brand.orangeSoft,
              color: brand.navy,
              border: `1px solid ${brand.orangeBorder}`,
            }}
          >
            <Star className="size-4 fill-current" style={{ color: brand.star }} aria-hidden />
            {site.googleRating}★ · {site.googleReviewCount}+ {es ? "reseñas" : "reviews"}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            {SHOP_PHOTOS.map((p, i) => (
              <div
                key={p.src}
                className={`relative overflow-hidden border border-[#E6EAEF] ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
                style={{ borderRadius: "0.25rem" }}
              >
                <Image
                  src={p.src}
                  alt={es ? p.es : p.en}
                  fill
                  sizes={i === 0 ? "(max-width:1024px) 100vw, 50vw" : "25vw"}
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-2.5 pt-8"
                  style={{
                    background: "linear-gradient(to top, rgba(7,37,63,0.8), transparent)",
                  }}
                >
                  <p className="text-xs font-semibold text-white">{es ? p.es : p.en}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="relative min-h-[280px] flex-1 overflow-hidden border border-[#E6EAEF] bg-[#E8EEF2]"
              style={{ borderRadius: "0.25rem" }}
            >
              {/*
                Embed uses a public demo key pattern common for Maps Embed API demos;
                if embed fails, the listing link below still works. Prefer setting
                NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY in production for your own project.
              */}
              <iframe
                title={es ? "Mapa de Sanchez Auto" : "Sanchez Auto map"}
                src={
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
                    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=place_id:${site.googlePlaceId}`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(
                        `${site.name} ${site.address.line1} ${site.address.city} ${site.address.state} ${site.address.postalCode}`,
                      )}&z=15&output=embed`
                }
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <p className="inline-flex items-start gap-2 font-semibold" style={{ color: brand.navy }}>
                <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: brand.orange }} aria-hidden />
                {site.address.line1}, {site.address.city}, {site.address.state}{" "}
                {site.address.postalCode}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={site.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("maps_listing_click", { source: "gallery" })}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white no-underline"
                style={{ background: brand.navy, borderRadius: "0.25rem" }}
              >
                {es ? "Ver en Google" : "View on Google"}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <a
                href={site.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("write_review_click", { source: "gallery" })}
                className="inline-flex items-center gap-2 border px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide no-underline"
                style={{
                  borderColor: brand.orangeBorder,
                  color: brand.navy,
                  borderRadius: "0.25rem",
                }}
              >
                {es ? "Escribir reseña" : "Write a review"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
