"use client";

import Image from "next/image";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

/**
 * Network “One Of The Best Auto Body Shops for Collision Repair” —
 * large headline + body left, large shop photo right.
 */
export function CleanHistory() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const years = Math.max(1, new Date().getFullYear() - site.foundedYear);

  return (
    <section id="history" className="nw-section scroll-mt-28" style={{ background: "#F8F8F8" }}>
      <div className="nw-wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="nw-kicker">{es ? "Nuestra historia" : "Our story"}</p>
          <h2 className="nw-h2">
            {es ? (
              <>
                Uno de los mejores talleres de carrocería
                <br />
                para reparación de colisiones
              </>
            ) : (
              <>
                One of the best auto body shops
                <br />
                for collision repair
              </>
            )}
          </h2>
          <p className="nw-lead" style={{ maxWidth: "100%" }}>
            {es
              ? `Reparar vehículos dañados en choques es “reparación de colisión”: paneles, piezas mecánicas y eléctricas. En ${site.name} usamos equipo moderno y técnicos experimentados para devolver seguridad, estructura y apariencia. Desde ${site.foundedYear} en ${site.address.line1}, Paterson — ${years}+ años sirviendo al condado de Passaic.`
              : `Repairing vehicles damaged in crashes is “collision repair” — body panels plus mechanical and electrical parts. At ${site.name} we use modern equipment and experienced technicians to restore safety, structure, and appearance. Since ${site.foundedYear} at ${site.address.line1}, Paterson — ${years}+ years serving Passaic County.`}
          </p>
          <button
            type="button"
            className="nw-btn mt-8"
            onClick={() => openQuote(es ? "Estimado de colisión" : "Collision estimate")}
          >
            {es ? "Pedir estimado" : "Get an estimate"}
          </button>
        </div>

        <div className="nw-photo nw-photo--wide min-h-[280px] sm:min-h-[360px]">
          <Image
            src="/gallery/shop-1.jpg"
            alt="Sanchez Auto Services collision and body shop floor in Paterson"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
