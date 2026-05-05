import { site } from "@/lib/site-content";

/** Local business structured data — set NEXT_PUBLIC_SITE_URL when the domain goes live. */
export function JsonLd() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const sameAs = [
    site.social.facebook,
    site.mapSearchUrl,
  ].filter(Boolean);

  const structured = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    ...(url ? { url } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    telephone: site.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: { "@type": "City", name: "Paterson" },
    description: site.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
    />
  );
}
