"use client";

import { SiteSubpageShell } from "@/components/marketing/site-subpage-shell";
import { useCatalog } from "@/lib/locale";

export default function TermsPage() {
  const c = useCatalog();

  return (
    <SiteSubpageShell eyebrow={c.nav.terms} title={c.terms.title} intro={c.terms.updated}>
      <div className="max-w-3xl space-y-12">
        {c.terms.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 80)} className="leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </SiteSubpageShell>
  );
}
