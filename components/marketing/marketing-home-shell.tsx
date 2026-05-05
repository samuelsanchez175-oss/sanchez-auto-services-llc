"use client";

import { Phone } from "lucide-react";
import { Header } from "@/components/marketing/header1515";
import { WhatsAppHero } from "@/components/marketing/whatsapp-hero1515";
import { SeoServicesSection } from "@/components/marketing/seo-services1515";
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
  const phones = site.phones;

  return (
    <>
      <Header />

      {/* Header is fixed/transparent, so main starts at top-0 */}
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {/* Section 1: WhatsApp contact hero */}
        <WhatsAppHero />

        {/* Section 2: SEO keywords + all services */}
        <SeoServicesSection />
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
            href={phones[0].tel}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-xs font-semibold uppercase tracking-wide text-white no-underline"
            style={{
              background: "linear-gradient(135deg,#e06030,#c03020)",
            }}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {c.hero.callPrimary}
          </a>
          {phones[1] ? (
            <a
              href={phones[1].tel}
              className="flex flex-[0.85] items-center justify-center rounded-lg border border-white/25 px-2 text-[11px] font-semibold leading-tight tracking-tight text-white/90 no-underline"
              title={`${phones[1].label} — ${phones[1].display}`}
            >
              {phones[1].display}
            </a>
          ) : null}
        </div>
      </div>

      {/* Section 3: Footer */}
      <Footer />
    </>
  );
}
