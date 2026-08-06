"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";

import { formatAddressInline, site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export function Hero({ heroSrc }: { heroSrc: string }) {
  const main = site.phones[0];
  const c = useCatalog();



  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: "78vh",
        background: "#001830",
      }}
    >
      <Image
        src={heroSrc}
        alt="Sanchez Auto Services — showroom & repair representation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.38 }}
        unoptimized
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,15,0.55) 0%, rgba(13,13,15,0.35) 40%, rgba(13,13,15,0.92) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(13,13,15,0.7) 0%, rgba(13,13,15,0.0) 60%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div
          className="mb-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em]"
          style={{ color: "#e8a090" }}
        >
          <span className="inline-block size-2 rounded-full" style={{ background: "#FB8C33" }} aria-hidden />
          {c.hero.kickerLine}
        </div>

        <h1
          className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[64px] lg:leading-[1.04]"
          style={{ maxWidth: "720px" }}
        >
          {c.hero.headlineLead}
          <br />
          <span style={{ color: "#FB8C33" }}>{c.hero.headlineAccentLine1}</span>
          <br />
          {c.hero.headlineTail}
        </h1>

        <p
          className="mb-9 text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px" }}
        >
          {c.hero.subheadline}
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <a
            href={main.tel}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-base font-bold text-white no-underline transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(165deg, #e06030 0%, #E07020 46%, #a01c10 100%)",
              boxShadow: "0 4px 20px rgba(192,48,32,0.45)",
            }}
          >
            <Phone className="size-4" aria-hidden />
            {c.hero.callPrimary} {main.display}
          </a>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/20 bg-white/10 px-6 py-3.5 text-base font-semibold text-white no-underline transition-all hover:bg-white/15"
          >
            {c.hero.viewServices}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" style={{ color: "#FB8C33" }} aria-hidden />
            <a
              href={site.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              style={{ color: "inherit" }}
            >
              {formatAddressInline()}
            </a>
          </div>
          <div className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="size-3.5" viewBox="0 0 20 20" fill="#FB8C33" aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              {c.hero.starsLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
