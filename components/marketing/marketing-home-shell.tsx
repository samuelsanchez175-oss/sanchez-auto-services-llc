"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { WhatsAppHero } from "@/components/marketing/whatsapp-hero1515";
import { StatsBarSection } from "@/components/marketing/stats-bar1515";
import { HowItWorksSection } from "@/components/marketing/how-it-works1515";
import { InsuranceChecklistSection } from "@/components/marketing/insurance-checklist1515";
import { SeoServicesSection } from "@/components/marketing/seo-services1515";
import { ProcessSection } from "@/components/marketing/process-section1515";
import { ProblemsSection } from "@/components/marketing/problems-section1515";
import { ShopGallerySection } from "@/components/marketing/shop-gallery1515";
import { QuoteSection } from "@/components/marketing/quote-form1515";
import { WhyUsSection } from "@/components/marketing/why-us-section1515";
import { ReviewsSection } from "@/components/marketing/reviews1515";
import { AboutLocalSection } from "@/components/marketing/about-local1515";
import { FaqSection } from "@/components/marketing/faq-section1515";
import { HoursMapSection } from "@/components/marketing/hours-map1515";
import { Footer } from "@/components/marketing/footer1515";
import { DesktopWhatsAppFloat } from "@/components/marketing/desktop-whatsapp-float";
import { useQuoteLead } from "@/lib/quote-lead-context";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import { trackEvent } from "@/lib/analytics";
import { brand } from "@/lib/brand";

export function MarketingHomeShell({
  heroSrc: _heroSrc,
  mapsSlot: _mapsSlot,
}: {
  heroSrc: string;
  mapsSlot: React.ReactNode;
}) {
  const c = useCatalog();
  const mainPhone = site.phones[0];
  const { openQuote } = useQuoteLead();
  const isEs = c.locale === "es";

  return (
    <>
      <Header />

      <main id="main" className="flex-1 pb-20 lg:pb-0">
        <WhatsAppHero />
        <StatsBarSection />
        <HowItWorksSection />
        <InsuranceChecklistSection />
        <SeoServicesSection />
        <ProcessSection />
        <ProblemsSection />
        <ShopGallerySection />
        <QuoteSection />
        <WhyUsSection />
        <ReviewsSection />
        <AboutLocalSection />
        <FaqSection />
        <HoursMapSection />
      </main>

      {/* Mobile sticky */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60] border-t lg:hidden"
        style={{
          borderColor: "rgba(251,140,51,0.2)",
          background: "rgba(0,24,48,0.97)",
          backdropFilter: "blur(12px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-stretch gap-2 px-3 py-2.5">
          <button
            type="button"
            onClick={() => openQuote(isEs ? "Cotización general" : "General quote")}
            className="flex min-w-0 flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-xl border-0 py-3.5 text-xs font-bold uppercase tracking-wide text-white"
            style={{
              background: "linear-gradient(135deg,#25d366,#128c7e)",
              boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
            }}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {isEs ? "WhatsApp" : "WhatsApp quote"}
          </button>
          <a
            href={mainPhone?.tel}
            aria-label={mainPhone?.display}
            onClick={() => trackEvent("call_click", { source: "sticky" })}
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wide text-white no-underline"
            style={{ background: `linear-gradient(135deg,${brand.navyMid},${brand.navy})` }}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {isEs ? "Llamar" : "Call"}
          </a>
        </div>
      </div>

      <DesktopWhatsAppFloat />
      <Footer />
    </>
  );
}
