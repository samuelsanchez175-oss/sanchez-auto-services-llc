"use client";

import { useCatalog } from "@/lib/locale";

export function ProcessSection() {
  const c = useCatalog();

  return (
    <section
      id="process"
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
          Our Process
        </p>

        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1a1520" }}>
          {c.process.title}
        </h2>
        <p className="mb-10 max-w-[520px] text-base leading-relaxed" style={{ color: "#6b6080" }}>
          {c.process.lead}
        </p>

        <ol className="grid gap-4 sm:grid-cols-2">
          {c.process.steps.map((step, idx) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-3 rounded-xl p-5"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e5ddd4",
                boxShadow: "0 2px 8px rgba(26,21,32,0.04)",
              }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #e06030 0%, #c03020 46%, #a01c10 100%)",
                  }}
                >
                  {idx + 1}
                </span>
                <h3 className="font-bold text-base" style={{ color: "#1a1520" }}>{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#6b6080" }}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
