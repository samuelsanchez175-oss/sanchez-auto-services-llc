"use client";

import Image from "next/image";
import { Shield, Award, Wrench, Package, RefreshCw } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { trustedInsurers } from "@/lib/site-content";

/**
 * Network “Authorized Repair Center” split —
 * bold headline + feature list with icons / vertical rhythm + large photo.
 */
const FEATURES = [
  {
    icon: Award,
    titleEn: "Makes drivers trust",
    titleEs: "Marcas de confianza",
    bodyEn:
      "We regularly repair Honda, MINI, BMW, Subaru, Toyota and more from local North Jersey dealerships — with careful panel work and paint match.",
    bodyEs:
      "Reparamos con frecuencia Honda, MINI, BMW, Subaru, Toyota y más de concesionarios del norte de Jersey — con paneles cuidadosos y pintura igualada.",
  },
  {
    icon: Shield,
    titleEn: "We work with your insurance",
    titleEs: "Trabajamos con tu seguro",
    bodyEn:
      "You choose the shop. We help document the claim so your insurer can process the repair — no preferred-shop requirement to get a quote.",
    bodyEs:
      "Tú eliges el taller. Documentamos el reclamo para que tu seguro procese la reparación — sin taller “preferido” para cotizar.",
  },
  {
    icon: Wrench,
    titleEn: "Trained technicians",
    titleEs: "Técnicos capacitados",
    bodyEn:
      "Ongoing skill in collision, refinish, and mechanical so the car drives and looks right when you pick it up.",
    bodyEs:
      "Capacitación continua en colisión, pintura y mecánica para que el auto ruede y se vea bien al recogerlo.",
  },
  {
    icon: Package,
    titleEn: "Quality parts approach",
    titleEs: "Enfoque en partes de calidad",
    bodyEn:
      "We recommend parts that restore fit, finish, and safety — OEM when required by the repair or insurer, quality aftermarket when appropriate.",
    bodyEs:
      "Recomendamos partes que restauren ajuste, acabado y seguridad — OEM cuando el reparo o el seguro lo piden, aftermarket de calidad cuando corresponde.",
  },
  {
    icon: RefreshCw,
    titleEn: "Clear communication",
    titleEs: "Comunicación clara",
    bodyEn:
      "WhatsApp and phone updates throughout the job so you’re never guessing where your car stands.",
    bodyEs:
      "Actualizaciones por WhatsApp y teléfono durante el trabajo para que no adivines en qué va tu auto.",
  },
] as const;

export function CleanInsurance() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();

  return (
    <section id="insurance" className="nw-section scroll-mt-28 bg-white">
      <div className="nw-wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="nw-kicker">{es ? "Centro de reparación" : "Authorized-style repair"}</p>
          <h2 className="nw-h2">
            {es ? (
              <>
                Reparando autos en
                <br />
                Paterson y North Jersey
              </>
            ) : (
              <>
                Repairing cars throughout
                <br />
                Paterson &amp; North Jersey
              </>
            )}
          </h2>

          <div className="mt-8">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.titleEn} className="nw-feature">
                  <div className="nw-feature__icon">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h3>{es ? f.titleEs : f.titleEn}</h3>
                    <p>{es ? f.bodyEs : f.bodyEn}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#878D93" }}>
              {es ? "Aseguradoras de ejemplo" : "Example carriers"}
            </p>
            <div className="flex flex-wrap gap-2">
              {trustedInsurers.slice(0, 10).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    openQuote(es ? `Reclamo — ${name}` : `Insurance claim — ${name}`)
                  }
                  className="rounded-sm border bg-white px-3 py-1.5 text-xs font-bold"
                  style={{ borderColor: "#E6EAEF", color: "#07253F" }}
                >
                  {name}
                </button>
              ))}
            </div>
            <button type="button" className="nw-btn mt-8" onClick={() => openQuote(es ? "Reclamo" : "Insurance claim")}>
              {es ? "Cotizar mi reclamo" : "Quote my claim"}
            </button>
          </div>
        </div>

        <div className="nw-photo sticky top-28 min-h-[420px] lg:min-h-[560px]">
          <Image
            src="/gallery/shop-2.jpg"
            alt="Body and mechanical bay at Sanchez Auto Services"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
