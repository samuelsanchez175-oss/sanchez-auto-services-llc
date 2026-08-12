"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { CleanHero } from "@/components/marketing/clean/CleanHero";
import { CleanMakesCarousel } from "@/components/marketing/clean/CleanMakesCarousel";
import { CleanHistory } from "@/components/marketing/clean/CleanHistory";
import { CleanWork } from "@/components/marketing/clean/CleanWork";
import { CleanServices } from "@/components/marketing/clean/CleanServices";
import { CleanExplainer } from "@/components/marketing/clean/CleanExplainer";
import { CleanMapsProof } from "@/components/marketing/clean/CleanMapsProof";
import { CleanWorkGallery } from "@/components/marketing/clean/CleanWorkGallery";
import { CleanInsuranceFaq } from "@/components/marketing/clean/CleanInsuranceFaq";
import { CleanReviews } from "@/components/marketing/clean/CleanReviews";
import { CleanBookAppointment } from "@/components/marketing/clean/CleanBookAppointment";
import { CleanLocation } from "@/components/marketing/clean/CleanLocation";
import { CleanFooter } from "@/components/marketing/clean/CleanFooter";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import { brand, brandGradients } from "@/lib/brand";

/**
 * Lean homepage — one clear conversion path.
 * Hero → Makes → About → How-it-works → Services → Work → Gallery/Maps → Reviews → Book → Location
 */
export function MarketingHomeShell({
  heroSrc: _heroSrc,
  mapsSlot: _mapsSlot,
}: {
  heroSrc: string;
  mapsSlot: React.ReactNode;
}) {
  const c = useCatalog();
  const es = c.locale === "es";
  const { openQuote } = useQuoteLead();
  const phone = site.phones[0];

  return (
    <>
      <Header />

      <main id="main" className="flex-1 pb-20 lg:pb-0" style={{ background: brand.white }}>
        <CleanHero />
        <CleanMakesCarousel />
        <CleanHistory />
        <CleanExplainer />
        <CleanServices />
        <CleanWorkGallery />
        <CleanWork />
        <CleanMapsProof />
        <CleanInsuranceFaq />
        <CleanReviews />
        <CleanBookAppointment />
        <CleanLocation />
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-[60] border-t lg:hidden"
        style={{
          background: brand.white,
          borderColor: "#E6EAEF",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          boxShadow: "0 -4px 20px rgba(7,37,63,0.06)",
        }}
      >
        <div className="flex gap-2 px-3 py-2.5">
          <button
            type="button"
            onClick={() => openQuote(es ? "Cotización" : "Free estimate")}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 border-0 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: brandGradients.whatsappCta, borderRadius: "0.25rem" }}
          >
            <MessageCircle className="size-4" />
            {es ? "Estimado" : "Estimate"}
          </button>
          <a
            href={phone.tel}
            onClick={() => trackEvent("call_click", { source: "sticky" })}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-bold uppercase tracking-wide no-underline"
            style={{ background: brand.navy, color: "#fff", borderRadius: "0.25rem" }}
          >
            <Phone className="size-4" style={{ color: brand.orange }} />
            {es ? "Llamar" : "Call"}
          </a>
        </div>
      </div>

      <CleanFooter />
    </>
  );
}
