"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";

/**
 * Network “Technical expertise meets real world know-how” full-bleed band.
 */
export function CleanExpertiseCta() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section className="nw-band" data-arrow-theme="dark">
      <div className="nw-band__bg">
        <Image
          src="/gallery/shop-3.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="nw-wrap py-16 sm:py-20">
        <div className="max-w-xl text-white">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {es ? (
              <>
                Experiencia técnica
                <br />
                con saber del mundo real.
              </>
            ) : (
              <>
                Technical expertise
                <br />
                meets real-world know-how.
              </>
            )}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            {es
              ? "Usamos entrenamiento y experiencia del taller para que la reparación salga bien — de la seguridad a la pintura perfecta. Los clientes confían en nosotros para devolver el auto a la carretera."
              : "We use training and shop experience so your repair is done right — from safety to the perfect paint job. Customers trust us to get their car back on the road."}
          </p>
          <button
            type="button"
            className="nw-btn mt-8"
            onClick={() => openQuote(es ? "Estimado" : "Get an estimate")}
          >
            {es ? "Pedir estimado" : "Get an estimate"}
          </button>
        </div>
      </div>
    </section>
  );
}
