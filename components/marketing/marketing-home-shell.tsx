"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { CleanHero } from "@/components/marketing/clean/CleanHero";
import { CleanTrust } from "@/components/marketing/clean/CleanTrust";
import { CleanServices } from "@/components/marketing/clean/CleanServices";
import { CleanInsurance } from "@/components/marketing/clean/CleanInsurance";
import { CleanReviews } from "@/components/marketing/clean/CleanReviews";
import { CleanGallery } from "@/components/marketing/clean/CleanGallery";
import { CleanQuote } from "@/components/marketing/clean/CleanQuote";
import { CleanLocation } from "@/components/marketing/clean/CleanLocation";
import { CleanAreasServed } from "@/components/marketing/clean/CleanAreasServed";
import { CleanFooter } from "@/components/marketing/clean/CleanFooter";
import { DesktopWhatsAppFloat } from "@/components/marketing/desktop-whatsapp-float";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import { brand, brandGradients } from "@/lib/brand";

/**
 * Full visual reset — light “collision clinic” homepage.
 * Short funnel; WhatsApp structured quote stays the conversion path.
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
        {/* Photos immediately after first section */}
        <CleanGallery />
        <CleanTrust />
        <CleanServices />
        <CleanInsurance />
        <CleanReviews />
        <CleanQuote />
        <CleanLocation />
        <CleanAreasServed />
      </main>

      {/* Mobile sticky — simple */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60] border-t bg-white lg:hidden"
        style={{
          borderColor: "#E6EAEF",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          boxShadow: "0 -4px 20px rgba(7,37,63,0.06)",
        }}
      >
        <div className="flex gap-2 px-3 py-2.5">
          <button
            type="button"
            onClick={() => openQuote(es ? "Cotización" : "Free estimate")}
            className="flex flex-[1.4] items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-xs font-bold uppercase tracking-wide text-white"
            style={{ background: brandGradients.whatsappCta }}
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </button>
          <a
            href={phone.tel}
            onClick={() => trackEvent("call_click", { source: "sticky" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wide no-underline"
            style={{ background: brand.mist, color: brand.navy }}
          >
            <Phone className="size-4" style={{ color: brand.orange }} />
            {es ? "Llamar" : "Call"}
          </a>
        </div>
      </div>

      <DesktopWhatsAppFloat />
      <CleanFooter />
    </>
  );
}
