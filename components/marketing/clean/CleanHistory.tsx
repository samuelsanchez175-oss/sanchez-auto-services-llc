"use client";

import Image from "next/image";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

/**
 * Short about — one paragraph + shop photo.
 */
export function CleanHistory() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const years = Math.max(1, new Date().getFullYear() - site.foundedYear);

  return (
    <section id="history" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="nw-kicker">{es ? "Nosotros" : "About"}</p>
          <h2 className="nw-h2">
            {es ? (
              <>Taller de colisión en Paterson desde {site.foundedYear}</>
            ) : (
              <>Collision body shop in Paterson since {site.foundedYear}</>
            )}
          </h2>
          <p className="nw-lead" style={{ maxWidth: "100%" }}>
            {es
              ? `${site.name} — ${years}+ años en ${site.address.line1}. Carrocería, pintura y mecánica con estimados claros. Seguros bienvenidos.`
              : `${site.name} — ${years}+ years at ${site.address.line1}. Body, paint, and mechanical with clear estimates. Insurance claims welcome.`}
          </p>
          <button
            type="button"
            className="nw-btn mt-8"
            onClick={() => openQuote(es ? "Estimado de colisión" : "Collision estimate")}
          >
            {es ? "Pedir estimado" : "Get an estimate"}
          </button>
        </div>

        <div className="nw-photo nw-photo--wide min-h-[240px] sm:min-h-[320px]">
          <Image
            src="/gallery/shop-1.jpg"
            alt={`${site.name} shop floor, Paterson NJ`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
