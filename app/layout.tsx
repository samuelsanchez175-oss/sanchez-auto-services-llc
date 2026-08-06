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

export const metadata: Metadata = {
  title: `${site.name} | Auto Body & Collision — Paterson, NJ | Insurance Welcome`,
  description: `Insurance claims welcome. Collision, paint & mechanical at ${formatAddressInline()}. Quote on WhatsApp — ${site.phones[0].display}.`,
  keywords: [...siteSeoKeywords, "insurance claim auto body Paterson", "WhatsApp auto body quote NJ"],
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL("https://sanchez-auto-llc.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: `${site.name} | Insurance-friendly body shop — Paterson, NJ`,
    description: `All major insurers welcome. Collision, paint & mechanical. WhatsApp quote: ${site.phones[0].display}. ${formatAddressInline()}.`,
    images: [
      {
        url: "/logo-sanchez-auto-services.png",
        width: 1924,
        height: 1251,
        alt: "Sanchez Auto Services LLC",
      },
    ],
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
