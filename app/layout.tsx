import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { JsonLd } from "@/components/json-ld";
import { LocaleProvider } from "@/lib/locale";
import { QuoteLeadProvider } from "@/lib/quote-lead-context";
import { formatAddressInline, site, siteSeoKeywords } from "@/lib/site-content";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sanchez-auto-llc.vercel.app";

const titleDefault = `${site.name} | Auto Body & Collision Repair Paterson NJ | Insurance Welcome`;
const descriptionDefault = `Insurance claims welcome at ${site.name}, ${formatAddressInline()}. Collision repair, auto paint & mechanical — free WhatsApp estimates. Call ${site.phones[0].display}. Serving Paterson, Clifton, Passaic, Wayne & Passaic County near Route 80.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: `%s | ${site.name}`,
  },
  description: descriptionDefault,
  keywords: [...siteSeoKeywords],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Auto Repair",
  applicationName: site.name,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      es: "/?lang=es",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US"],
    url: siteUrl,
    siteName: site.name,
    title: titleDefault,
    description: descriptionDefault,
    images: [
      {
        url: "/gallery/shop-1.jpg",
        width: 1600,
        height: 900,
        alt: `${site.name} body shop floor — Paterson NJ collision repair`,
      },
      {
        url: site.logo.src,
        width: site.logo.width,
        height: site.logo.height,
        alt: `${site.name} — auto body shop Paterson NJ logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: descriptionDefault,
    images: ["/gallery/shop-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": "US-NJ",
    "geo.placename": "Paterson",
    "geo.position": "40.8976;-74.1556",
    ICBM: "40.8976, -74.1556",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <LocaleProvider>
          <QuoteLeadProvider>{children}</QuoteLeadProvider>
        </LocaleProvider>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
