"use client";

import { Star, ExternalLink } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";

export function ReviewsSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const googleReviewsUrl =
    "https://www.google.com/maps/search/?api=1&query=Sanchez+Auto+Services+LLC+101+E+Railway+Ave+Paterson+NJ";

  return (
    <section
      id="reviews"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: brand.paper }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em]"
              style={{ color: brand.orange }}
            >
              {c.nav.reviews}
            </p>
            <h2
              className="text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: brand.navy }}
            >
              {c.testimonials.title}
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-current"
                    style={{ color: brand.star }}
                  />
                ))}
              </div>
              <p className="text-sm font-bold" style={{ color: brand.navy }}>
                4.8 · Google
              </p>
            </div>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold no-underline hover:underline"
            style={{ color: brand.orange }}
          >
            {isEs ? "Ver reseñas en Google" : "Read reviews on Google"}
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {c.testimonials.samples.map((s) => (
            <li
              key={s.name + s.location}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm"
              style={{ border: "1px solid #D8DEE4" }}
            >
              <div className="mb-2 flex items-center gap-0.5" aria-label={`${s.stars} stars`}>
                {Array.from({ length: s.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-current"
                    style={{ color: brand.star }}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed" style={{ color: brand.navy }}>
                “{s.quote}”
              </p>
              <p className="mt-3 text-xs font-bold" style={{ color: brand.steel }}>
                {s.name} · {s.location}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-[11px]" style={{ color: brand.steelLight }}>
          {c.testimonials.googleNote}
        </p>
      </div>
    </section>
  );
}
