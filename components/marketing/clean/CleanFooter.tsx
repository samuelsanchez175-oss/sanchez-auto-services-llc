"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";

export function CleanFooter() {
  const year = new Date().getFullYear();
  const c = useCatalog();
  const es = c.locale === "es";

  return (
    <footer className="border-t bg-white" style={{ borderColor: "#E6EAEF" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={200}
              height={130}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: brand.steel }}>
            {site.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold" style={{ color: brand.navy }}>
          <a href="#services" className="no-underline hover:opacity-70">
            {c.nav.services}
          </a>
          <a href="#insurance" className="no-underline hover:opacity-70">
            {es ? "Seguros" : "Insurance"}
          </a>
          <a href="#quote" className="no-underline hover:opacity-70">
            {c.nav.quote}
          </a>
          <a href="#hours" className="no-underline hover:opacity-70">
            {c.nav.hours}
          </a>
          <Link href="/privacy" className="no-underline hover:opacity-70" style={{ color: brand.steel }}>
            {c.nav.privacy}
          </Link>
          <Link href="/terms" className="no-underline hover:opacity-70" style={{ color: brand.steel }}>
            {c.nav.terms}
          </Link>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs" style={{ borderColor: "#E6EAEF", color: brand.steelLight }}>
        © {year} {site.name}. {es ? "Paterson, NJ." : "Paterson, NJ."}
      </div>
    </footer>
  );
}
