"use client";

import Image from "next/image";
import { useCatalog } from "@/lib/locale";
import { site } from "@/lib/site-content";

/**
 * Network Auto Body 1:1 section:
 * 1) Centered H2 + rule + three numbered columns (01–03)
 * 2) Authorized Repair photo card (left) + dashed vertical feature list (right)
 */
const PILLARS = [
  {
    n: "01",
    titleEn: "Personalized Service",
    titleEs: "Servicio Personalizado",
    bodyEn:
      "If you’re after a more personalized auto body repair service in Paterson, Sanchez Auto is happy to work alongside you to provide car care solutions that fit your exact needs — and you can message us anytime on WhatsApp.",
    bodyEs:
      "Si buscas un servicio de carrocería más personalizado en Paterson, Sanchez Auto trabaja contigo para soluciones que se ajusten a tus necesidades — y puedes escribirnos por WhatsApp cuando quieras.",
  },
  {
    n: "02",
    titleEn: "State-Of-The-Art Equipment",
    titleEs: "Equipo De Última Generación",
    bodyEn:
      "Sanchez Auto Services has the equipment and techniques to ensure that your repairs are done to your satisfaction, supported by clear estimates and documentation for you and your insurer.",
    bodyEs:
      "Sanchez Auto Services cuenta con el equipo y las técnicas para que tus reparaciones queden a tu satisfacción, con estimados claros y documentación para ti y tu seguro.",
  },
  {
    n: "03",
    titleEn: "Insurance-Friendly Process",
    titleEs: "Proceso Amigable Con Seguros",
    bodyEn:
      "We help with insurance claims every day — photos, claim numbers, and written estimates so you and your adjuster stay aligned. Progressive, GEICO, State Farm, NJM, and more are welcome.",
    bodyEs:
      "Ayudamos con reclamos de seguro a diario — fotos, números de reclamo y estimados escritos para alinear contigo y tu ajustador. Progressive, GEICO, State Farm, NJM y más son bienvenidos.",
  },
] as const;

const FEATURES = [
  {
    titleEn: "Multi-Make Experience",
    titleEs: "Experiencia Multi-Marca",
    bodyEn:
      "Our body shop regularly repairs vehicles from major manufacturers, including Honda, BMW, MINI, Subaru, Toyota, Ford, GM, and more. From panel work to paint match, we restore your vehicle to a high standard.",
    bodyEs:
      "Nuestro taller repara con frecuencia vehículos de grandes fabricantes, incluyendo Honda, BMW, MINI, Subaru, Toyota, Ford, GM y más. De paneles a pintura, restauramos tu vehículo a un alto estándar.",
  },
  {
    titleEn: "We Work With Your Insurance",
    titleEs: "Trabajamos Con Tu Seguro",
    bodyEn:
      "You choose the repair facility. We document the job so your insurer can process the claim, help keep safety systems effective, and get your car back looking and driving right.",
    bodyEs:
      "Tú eliges el taller. Documentamos el trabajo para que tu seguro procese el reclamo, ayudamos a mantener los sistemas de seguridad y devolvemos el auto viéndose y rodando bien.",
  },
  {
    titleEn: "Trained Technicians",
    titleEs: "Técnicos Capacitados",
    bodyEn:
      "At Sanchez Auto, technician skill is an ongoing process. Our team stays current on techniques, tools, and equipment used in modern collision and mechanical repair.",
    bodyEs:
      "En Sanchez Auto, la capacitación es continua. Nuestro equipo se mantiene al día en técnicas, herramientas y equipo de colisión y mecánica moderna.",
  },
  {
    titleEn: "Quality Parts",
    titleEs: "Partes De Calidad",
    bodyEn:
      "In order to restore the specifications of your vehicle, we strongly recommend quality parts that meet fit, finish, and safety standards — OEM when required by the repair or your insurer.",
    bodyEs:
      "Para restaurar las especificaciones de tu vehículo, recomendamos partes de calidad que cumplan ajuste, acabado y seguridad — OEM cuando el reparo o tu seguro lo requieran.",
  },
  {
    titleEn: "Clear Communication",
    titleEs: "Comunicación Clara",
    bodyEn:
      "In order to keep you informed and confident in the repair, we update you by WhatsApp and phone throughout the job so you always know where your vehicle stands.",
    bodyEs:
      "Para mantenerte informado y confiado, te actualizamos por WhatsApp y teléfono durante el trabajo para que siempre sepas en qué va tu vehículo.",
  },
] as const;

export function CleanPillars() {
  const { locale } = useCatalog();
  const es = locale === "es";

  return (
    <section className="py-16 sm:py-24" style={{ background: "#F8F8F8" }}>
      {/* ── Part 1: headline + 01 / 02 / 03 ── */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="mx-auto max-w-4xl text-center text-[1.65rem] font-black leading-[1.18] tracking-tight text-black sm:text-4xl lg:text-[2.5rem]">
          {es ? (
            <>
              Nuestros Técnicos Ofrecen Reparación De Colisión
              <br className="hidden sm:block" /> De Alta Calidad Con Un Toque Personalizado
            </>
          ) : (
            <>
              Our Certified Technicians Offer High-Quality
              <br className="hidden sm:block" /> Collision Repair Services With A Personalized Touch
            </>
          )}
        </h2>

        {/* Network-style thin rule under title */}
        <div className="mx-auto mt-8 h-px w-full max-w-3xl bg-[#d8d8d8]" aria-hidden />

        <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {PILLARS.map((p) => (
            <div key={p.n}>
              <h3 className="text-[15px] font-extrabold tracking-tight text-black sm:text-base">
                {p.n}. {es ? p.titleEs : p.titleEn}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.7] text-[#555] sm:text-sm">
                {es ? p.bodyEs : p.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Part 2: Authorized Repair photo + feature list ── */}
      <div
        id="insurance"
        className="mx-auto mt-16 max-w-6xl scroll-mt-28 px-5 sm:mt-20 sm:px-8 lg:mt-24"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left photo card — Network blue-tint building style */}
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/gallery/shop-4.jpg"
              alt={`${site.name} shop exterior / facility`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Blue photographic wash like Network */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(20,48,90,0.72) 0%, rgba(15,40,75,0.55) 45%, rgba(10,30,60,0.68) 100%)",
                mixBlendMode: "multiply",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(30, 70, 130, 0.35)" }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                  {es ? (
                    <>
                      Centro De
                      <br />
                      Reparación
                    </>
                  ) : (
                    <>
                      Authorized Repair
                      <br />
                      Center
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold leading-snug text-white sm:text-xl">
                  {es ? (
                    <>
                      Reparando Autos En
                      <br />
                      Paterson Y North Jersey
                    </>
                  ) : (
                    <>
                      Repairing Cars Throughout
                      <br />
                      Paterson &amp; North Jersey
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right feature list — square bullets + dashed connector */}
          <ul className="relative m-0 list-none p-0">
            {FEATURES.map((f, i) => (
              <li key={f.titleEn} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5">
                {/* Vertical dashed line (Network style) */}
                {i < FEATURES.length - 1 ? (
                  <span
                    className="absolute left-[5px] top-4 bottom-0 w-px border-l border-dashed border-[#c8c8c8]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className="relative z-[1] mt-1.5 size-2.5 shrink-0 bg-black"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-black sm:text-base">
                    {es ? f.titleEs : f.titleEn}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.7] text-[#555] sm:text-sm">
                    {es ? f.bodyEs : f.bodyEn}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
