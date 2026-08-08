"use client";

import { Star, ExternalLink } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site-content";

export function ReviewsSection() {
  const c = useCatalog();
  const isEs = c.locale === "es";
  const googleBusiness = site.googleBusinessUrl;
  const googleReviewsUrl = site.googleReviewsUrl ?? googleBusiness;
  const writeReviewUrl = site.googleWriteReviewUrl ?? googleBusiness;

  return (
    <section
      id="reviews"
      className="scroll-mt-16 py-14 sm:py-18"
      style={{ background: brand.paper }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
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
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-current"
                    style={{ color: brand.star }}
                  />
                ))}
              </div>
              <p className="text-sm font-bold" style={{ color: brand.navy }}>
                {site.googleRating} · Google
                {site.googleReviewCount ? (
                  <span className="font-semibold" style={{ color: brand.steel }}>
                    {" "}
                    · {site.googleReviewCount}+
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap text-sm font-bold no-underline hover:underline sm:w-auto"
              style={{ color: brand.orange }}
            >
              {isEs ? "Ver reseñas en Google" : "Read reviews on Google"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap text-sm font-bold no-underline hover:underline sm:w-auto"
              style={{ color: brand.navy }}
            >
              {isEs ? "Escribir reseña" : "Write a review"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.testimonials.samples.map((s) => (
            <li
              key={s.name + s.location + s.quote.slice(0, 20)}
              className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm"
              style={{ border: "1px solid #D8DEE4" }}
            >
              <div className="mb-2 flex shrink-0 items-center gap-0.5" aria-label={`${s.stars} stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 shrink-0"
                    style={{
                      color: brand.star,
                      fill: i < s.stars ? brand.star : "transparent",
                    }}
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
          {c.testimonials.googleNote}{" "}
          <a
            href={googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold no-underline hover:underline"
            style={{ color: brand.orange }}
          >
            Google Business
            <ExternalLink className="ml-1 inline size-3 align-[-1px]" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
