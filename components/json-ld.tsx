import {
  areasServed,
  formatAddressInline,
  site,
  siteSeoKeywords,
} from "@/lib/site-content";

/** Local business + SEO structured data for Google. */
export function JsonLd() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://sanchez-auto-llc.vercel.app";

  const sameAs = [
    site.social.facebook,
    site.social.instagram,
    site.mapSearchUrl,
    site.googleBusinessUrl,
  ].filter(
    Boolean,
  );

  const autoRepair = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${url}/#business`,
    name: site.name,
    alternateName: ["Sanchez Auto", "Sanchez Auto Services"],
    url,
    image: `${url}${site.logo.src}`,
    logo: `${url}${site.logo.src}`,
    description: site.tagline,
    telephone: site.phones.map((p) => p.tel),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Approximate Paterson Railway Ave — refine if GBP has exact coords
      latitude: 40.8976,
      longitude: -74.1556,
    },
    hasMap: site.mapSearchUrl,
    sameAs,
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
    areaServed: areasServed.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "New Jersey",
      },
    })),
    knowsAbout: [...siteSeoKeywords],
    keywords: siteSeoKeywords.join(", "),
    paymentAccepted: "Cash, Credit Card, Debit Card, Insurance",
    currenciesAccepted: "USD",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Auto body and mechanical services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Collision & body repair",
            description:
              "Collision repair, panel replacement, bumper repair, frame/unibody work in Paterson NJ",
            areaServed: "Paterson, NJ",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paint & refinishing",
            description: "Auto paint, color match, clear coat, scratch repair Paterson NJ",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mechanical repair",
            description:
              "Brakes, diagnostics, oil change, suspension, A/C and general auto repair Paterson NJ",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Insurance claim estimates",
            description:
              "Insurance-friendly collision estimates, documentation for adjusters, free estimates via WhatsApp",
          },
        },
      ],
    },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "WhatsApp quote",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://wa.me/${site.whatsappPhone}`,
        actionPlatform: [
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/DesktopWebPlatform",
        ],
      },
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    description: `Insurance claims welcome. Collision, paint & mechanical at ${formatAddressInline()}.`,
    publisher: { "@id": `${url}/#business` },
    inLanguage: ["en-US", "es"],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${site.name} | Auto Body & Collision — Paterson, NJ`,
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#business` },
    description: site.tagline,
    keywords: siteSeoKeywords.join(", "),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [autoRepair, webSite, webPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
