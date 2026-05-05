import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

import { JsonLd } from "@/components/json-ld";
import { LocaleProvider } from "@/lib/locale";
import { formatAddressInline, site } from "@/lib/site-content";

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
  title: `${site.name} | Auto Repair & Body Shop — Paterson, NJ`,
  description: `${site.businessType}: collision repair, maintenance, diagnostics, and refinishing. ${formatAddressInline()}`,
  keywords: ["Paterson auto repair", "body shop NJ", "collision repair Paterson", "Sanchez Auto Services"],
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
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
        <LocaleProvider>{children}</LocaleProvider>
        <JsonLd />
      </body>
    </html>
  );
}
