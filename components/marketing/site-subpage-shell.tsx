"use client";

import Link from "next/link";

import { Footer } from "@/components/marketing/footer1515";
import { Header } from "@/components/marketing/header1515";
import { useCatalog } from "@/lib/locale";

export function SiteSubpageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const catalog = useCatalog();

  return (
    <>
      <Header />
      <main className="flex-1 pb-28 lg:pb-12">
        <section className="border-b bg-gradient-to-b from-white to-muted/35 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.38em]" style={{ color: "#FB8C33" }}>
                {eyebrow}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="flex-1 min-w-[220px] space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#291d30]">{title}</h1>
                {intro ? <p className="text-muted-foreground">{intro}</p> : null}
              </div>
              <Link
                href="/"
                className="self-start rounded-full border px-5 py-2 text-sm font-semibold text-[#391f2d] underline-offset-4 transition hover:bg-white"
              >
                {catalog.servicesPage.backHome}
              </Link>
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
