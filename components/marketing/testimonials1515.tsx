"use client";

import { useCatalog } from "@/lib/locale";
import { site } from "@/lib/site-content";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="size-3.5" viewBox="0 0 20 20" fill="#e04e28" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const c = useCatalog();

  return (
    <section
      id="reviews"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: "#f5f0eb" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section label */}
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#C0392B" }}
          aria-hidden
        >
          Customer Reviews
        </p>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1a1520" }}>
              {c.testimonials.title}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#6b6080" }}>
              {c.testimonials.googleNote}
            </p>
          </div>
          <a
            href={site.mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold no-underline transition-all hover:bg-white"
            style={{ color: "#C0392B", borderColor: "#C0392B" }}
          >
            See all on Google ↗
          </a>
        </div>

        {/* Rating bar */}
        <div
          className="mb-8 flex flex-wrap items-center gap-4 rounded-xl p-4"
          style={{ background: "#ffffff", border: "1.5px solid #e5ddd4" }}
        >
          <div className="flex flex-col items-center gap-1 px-4">
            <span className="text-4xl font-bold" style={{ color: "#1a1520" }}>4.8</span>
            <StarRow count={5} />
            <span className="text-xs" style={{ color: "#6b6080" }}>Google Rating</span>
          </div>
          <div className="hidden w-px self-stretch sm:block" style={{ background: "#e5ddd4" }} aria-hidden />
          <p className="max-w-[480px] text-sm leading-relaxed" style={{ color: "#6b6080" }}>
            Hundreds of satisfied Paterson-area customers trust Sanchez Auto for quality
            collision repair, bodywork, painting, and mechanical service.
          </p>
        </div>

        {/* Review cards */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.testimonials.samples.map((t) => (
            <li
              key={`${t.name}-${t.quote.slice(0, 36)}`}
              className="flex flex-col gap-4 rounded-xl p-5"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e5ddd4",
                boxShadow: "0 2px 8px rgba(26,21,32,0.04)",
              }}
            >
              <StarRow count={t.stars} />
              <p className="flex-1 text-sm leading-relaxed" style={{ color: "#2e2840" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="flex items-center gap-2.5 pt-2"
                style={{ borderTop: "1px solid #f0e8e0" }}
              >
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "#C0392B" }}
                  aria-hidden
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1a1520" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#6b6080" }}>{t.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
