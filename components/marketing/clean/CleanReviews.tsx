"use client";

import { Star, ExternalLink } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";

export function CleanReviews() {
  const c = useCatalog();
  const es = c.locale === "es";
  const googleUrl =
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC+101+E+Railway+Ave+Paterson+NJ";

  return (
    <section id="reviews" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: brand.orange }}
            >
              {c.nav.reviews}
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: brand.navy }}
            >
              {c.testimonials.title}
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" style={{ color: brand.star }} />
                ))}
              </div>
              <span className="text-sm font-bold" style={{ color: brand.navy }}>
                4.8 · Google
              </span>
            </div>
          </div>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold no-underline hover:underline"
            style={{ color: brand.orange }}
          >
            {es ? "Ver en Google" : "Read on Google"}
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {c.testimonials.samples.map((s) => (
            <blockquote
              key={s.name}
              className="flex flex-col rounded-2xl p-6"
              style={{ background: brand.paper, border: "1px solid #E6EAEF" }}
            >
              <div className="mb-3 flex gap-0.5" aria-label={`${s.stars} stars`}>
                {Array.from({ length: s.stars }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" style={{ color: brand.star }} />
                ))}
              </div>
              <p className="flex-1 text-[15px] leading-relaxed" style={{ color: brand.navy }}>
                “{s.quote}”
              </p>
              <footer className="mt-4 text-sm font-bold" style={{ color: brand.steel }}>
                {s.name}
                <span className="font-normal"> · {s.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
