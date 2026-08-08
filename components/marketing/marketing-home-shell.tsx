"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { CleanHero } from "@/components/marketing/clean/CleanHero";
import { CleanMakesCarousel } from "@/components/marketing/clean/CleanMakesCarousel";
import { CleanHistory } from "@/components/marketing/clean/CleanHistory";
import { CleanPillars } from "@/components/marketing/clean/CleanPillars";
import { CleanWork } from "@/components/marketing/clean/CleanWork";
import { CleanServices } from "@/components/marketing/clean/CleanServices";
import { CleanExpertiseCta } from "@/components/marketing/clean/CleanExpertiseCta";
import { CleanProcess } from "@/components/marketing/clean/CleanProcess";
import { CleanReviews } from "@/components/marketing/clean/CleanReviews";
import { CleanFaq } from "@/components/marketing/clean/CleanFaq";
import { CleanQuote } from "@/components/marketing/clean/CleanQuote";
import { CleanLocation } from "@/components/marketing/clean/CleanLocation";
import { CleanAreasServed } from "@/components/marketing/clean/CleanAreasServed";
import { CleanBottomCta } from "@/components/marketing/clean/CleanBottomCta";
import { CleanFooter } from "@/components/marketing/clean/CleanFooter";
import { DesktopWhatsAppFloat } from "@/components/marketing/desktop-whatsapp-float";
import { SectionArrows } from "@/components/marketing/section-arrows";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import { brand, brandGradients } from "@/lib/brand";
import { openWhatsAppChat } from "@/lib/whatsapp-quote";

/**
 * Homepage section order mirrors Network Auto Body:
 * Hero → Dealerships → About/image → Pillars → Authorized features →
 * Work photos → Services → Expertise band → Estimate process →
 * Reviews → FAQ → Quote → Location → Areas
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
        {/* Network: certified technicians 01–03 + authorized repair split */}
        <CleanPillars />
        <CleanWork />
        <CleanServices />
        <CleanExpertiseCta />
        <CleanProcess />
        <CleanReviews />
        <CleanFaq />
        <CleanQuote />
        <CleanLocation />
        <CleanAreasServed />
        {/* Network-style bottom: gray covered strip → strong logo blue → black footer */}
        <CleanBottomCta />
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
            {es ? "Cotizar" : "Quote"}
          </button>
          <button
            type="button"
            onClick={() => openWhatsAppChat("sticky_plain")}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 border-0 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: brandGradients.whatsappCta, borderRadius: "0.25rem" }}
          >
            <MessageCircle className="size-4" />
            Chat
          </button>
          <a
            href={phone.tel}
            onClick={() => trackEvent("call_click", { source: "sticky" })}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-bold uppercase tracking-wide no-underline"
            style={{ background: "#F2F4F6", color: brand.navy, borderRadius: "0.25rem" }}
          >
            <Phone className="size-4" style={{ color: brand.orange }} />
            {es ? "Llamar" : "Call"}
          </a>
        </div>
      </div>

      <SectionArrows />
      <DesktopWhatsAppFloat />
      <CleanFooter />
    </>
  );
}
