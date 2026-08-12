"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { SiteSubpageShell } from "@/components/marketing/site-subpage-shell";
import { useCatalog } from "@/lib/locale";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { brand } from "@/lib/brand";
import type { ServiceLanding } from "@/lib/service-landings";
import { SERVICE_LANDINGS } from "@/lib/service-landings";
import { trackEvent } from "@/lib/analytics";

export function ServiceLandingView({ landing }: { landing: ServiceLanding }) {
  const { locale } = useCatalog();
  const es = locale === "es";
  const { openQuote } = useQuoteLead();
  const title = es ? landing.titleEs : landing.titleEn;
  const h1 = es ? landing.h1Es : landing.h1En;
  const intro = es ? landing.introEs : landing.introEn;
  const bullets = es ? landing.bulletsEs : landing.bulletsEn;
  const cta = es ? landing.ctaEs : landing.ctaEn;

  return (
    <SiteSubpageShell eyebrow="SANCHEZ AUTO SERVICES LLC" title={h1} intro={intro}>
      <div className="space-y-8">
        <ul className="grid gap-3 sm:grid-cols-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 border border-[#E6EAEF] p-4 text-sm font-semibold"
              style={{ color: brand.navy, borderRadius: "0.25rem", background: brand.white }}
            >
              <Check className="mt-0.5 size-4 shrink-0" style={{ color: brand.orange }} aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nw-btn nw-btn--wa"
          onClick={() => {
            trackEvent("quote_click", { source: "service_landing", service: landing.slug });
            openQuote(title);
          }}
        >
          {cta}
        </button>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: brand.steel }}>
            {es ? "Otros servicios" : "Other services"}
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_LANDINGS.filter((s) => s.slug !== landing.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border px-3 py-2 text-xs font-extrabold uppercase tracking-wide no-underline"
                style={{
                  borderColor: "#E6EAEF",
                  color: brand.navy,
                  borderRadius: "0.25rem",
                }}
              >
                {es ? s.titleEs : s.titleEn}
              </Link>
            ))}
            <Link
              href="/services"
              className="border px-3 py-2 text-xs font-extrabold uppercase tracking-wide no-underline"
              style={{
                borderColor: brand.orangeBorder,
                color: brand.orangeDeep,
                borderRadius: "0.25rem",
              }}
            >
              {es ? "Todos" : "All services"}
            </Link>
          </div>
        </div>
      </div>
    </SiteSubpageShell>
  );
}
