"use client";

import { MessageCircle } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { WhatsAppHero } from "@/components/marketing/whatsapp-hero1515";
import { SeoServicesSection } from "@/components/marketing/seo-services1515";
import { ProblemsSection } from "@/components/marketing/problems-section1515";
import { WhyUsSection } from "@/components/marketing/why-us-section1515";
import { TrustPanelSection } from "@/components/marketing/trust-panel1515";
import { Footer } from "@/components/marketing/footer1515";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export function MarketingHomeShell({
  heroSrc: _heroSrc,
  mapsSlot: _mapsSlot,
}: {
  heroSrc: string;
  mapsSlot: React.ReactNode;
}) {
  const c = useCatalog();
  const mainPhone = site.phones[0];

  return (
    <>
      <Header />

      {/* Header is fixed/transparent, so main starts at top-0 */}
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {/* Section 1: WhatsApp contact hero */}
        <WhatsAppHero />

        {/* Section 2: SEO keywords + all services */}
        <SeoServicesSection />

        {/* Section 3: Cause & effect — problems we solve */}
        <ProblemsSection />

        {/* Section 4: Why choose us */}
        <WhyUsSection />

        {/* Section 5: Trust & credentials */}
        <TrustPanelSection />
      </main>

      {/* Mobile-first persistent CTAs */}
      <div
        className="fixed inset-x-0 bottom-0 z-[60] border-t lg:hidden"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background: "rgba(15,13,22,0.97)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-stretch gap-2 px-3 py-2">
          <a
            href={`https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent("Hi, I'd like to get a quote")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg py-3 text-xs font-semibold uppercase tracking-wide text-white no-underline"
            style={{ background: "linear-gradient(135deg,#25d366,#128c7e)" }}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {c.hero.callPrimary}
          </a>
          <a
            href={`https://wa.me/${site.whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.footer.stickyWhatsAppAria}
            className="flex min-w-0 flex-[0.85] items-center justify-center gap-1.5 rounded-lg border-l border-white/10 py-2 px-1.5 text-center text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-white no-underline sm:text-xs"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <MessageCircle
              className="size-4 shrink-0 sm:size-[1.05rem]"
              style={{ color: "#25d366" }}
              aria-hidden
            />
            <span className="line-clamp-2">{c.footer.stickyWhatsApp}</span>
          </a>
        </div>
      </div>

      {/* Section 3: Footer */}
      <Footer />
    </>
  );
}
