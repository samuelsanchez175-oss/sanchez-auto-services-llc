"use client";

import { SiteSubpageShell } from "@/components/marketing/site-subpage-shell";
import { ServicesGridDense } from "@/components/marketing/services-grid1515";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";

export default function ServicesStandalonePage() {
  const catalog = useCatalog();

  return (
    <SiteSubpageShell eyebrow={site.name.toUpperCase()} title={catalog.servicesPage.title} intro={catalog.servicesPage.intro}>
      <ServicesGridDense />
    </SiteSubpageShell>
  );
}
