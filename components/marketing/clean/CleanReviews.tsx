"use client";

import { Star, ExternalLink } from "lucide-react";
import { useCatalog } from "@/lib/locale";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site-content";

/** Off-site destinations open in a new tab with safe rel. */
const EXTERNAL = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export function CleanReviews() {
  const c = useCatalog();
  const es = c.locale === "es";
  const samples = c.testimonials.samples;
  const rating = site.googleRating;
  const count = site.googleReviewCount;
  const googleBusiness = site.googleBusinessUrl;
  const googleReviews = site.googleReviewsUrl ?? googleBusiness;
  const writeReview = site.googleWriteReviewUrl ?? googleBusiness;

  return (
    <section id="reviews" className="nw-section scroll-mt-28" style={{ background: brand.white }}>
      <div className="nw-wrap">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="nw-kicker">{c.nav.reviews}</p>
            <h2 className="nw-h2">{c.testimonials.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex shrink-0 gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" style={{ color: brand.star }} />
                ))}
              </div>
              <span className="text-sm font-bold" style={{ color: brand.navy }}>
                {rating} · Google
                {count ? (
                  <span className="font-semibold" style={{ color: brand.steel }}>
                    {" "}
                    · {count}+ {es ? "reseñas" : "reviews"}
                  </span>
                ) : null}
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: brand.steel }}>
              {c.testimonials.googleNote}
            </p>
          </div>

          {/* External CTAs — full-width on mobile, fixed height, no wrap overflow */}
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
            <a
              href={googleReviews}
              {...EXTERNAL}
              className="nw-btn nw-btn--navy inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-xs font-extrabold uppercase tracking-[0.06em] no-underline sm:w-auto"
            >
              {es ? "Ver en Google" : "Read on Google"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
            <a
              href={writeReview}
              {...EXTERNAL}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 text-xs font-extrabold uppercase tracking-[0.06em] no-underline transition hover:brightness-105 sm:w-auto"
              style={{
                borderColor: brand.orangeBorder,
                color: brand.orangeDeep,
                background: brand.orangeSoft,
                borderRadius: "0.25rem",
              }}
            >
              {es ? "Escribir reseña" : "Write a review"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s) => (
            <blockquote
              key={`${s.name}-${s.location}-${s.quote.slice(0, 24)}`}
              className="flex h-full flex-col border p-5 sm:p-6"
              style={{
                borderColor: "#E6EAEF",
                borderRadius: "0.25rem",
                background: brand.paper,
              }}
            >
              <div className="mb-3 flex shrink-0 gap-0.5" aria-label={`${s.stars} stars`}>
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

        <div
          className="mt-10 flex flex-col items-stretch gap-3 border-t pt-8 sm:items-center"
          style={{ borderColor: "#E6EAEF" }}
        >
          <p className="text-center text-sm" style={{ color: brand.steel }}>
            {es
              ? "¿Fuiste cliente? Tu reseña en Google ayuda a más vecinos a encontrarnos."
              : "Been a customer? A Google review helps more neighbors find us."}
          </p>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-center">
            <a
              href={googleBusiness}
              {...EXTERNAL}
              className="nw-btn nw-btn--navy inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-xs font-extrabold uppercase tracking-[0.06em] no-underline sm:w-auto"
            >
              {es ? "Perfil de Google Business" : "Google Business profile"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
            <a
              href={writeReview}
              {...EXTERNAL}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 text-xs font-extrabold uppercase tracking-[0.06em] no-underline transition hover:brightness-105 sm:w-auto"
              style={{
                borderColor: brand.orangeBorder,
                color: brand.orangeDeep,
                background: brand.orangeSoft,
                borderRadius: "0.25rem",
              }}
            >
              {es ? "Dejar reseña" : "Leave a review"}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
