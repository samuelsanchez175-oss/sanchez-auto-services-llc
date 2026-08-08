"use client";

import { useCatalog } from "@/lib/locale";

/** Network-style centered FAQ accordion. */
export function CleanFaq() {
  const c = useCatalog();
  const es = c.locale === "es";

  return (
    <section id="faq" className="nw-section scroll-mt-28" style={{ background: "#F0F0F0" }}>
      <div className="nw-wrap mx-auto max-w-3xl">
        <div className="nw-center mb-10">
          <p className="nw-kicker">FAQ</p>
          <h2 className="nw-h2">{c.faq.title}</h2>
          <p className="nw-lead">{c.faq.lead}</p>
        </div>

        <div className="space-y-0 border-t border-[#E6EAEF]">
          {c.faq.items.map((item) => (
            <details
              key={item.question}
              className="group border-b border-[#E6EAEF] bg-transparent"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-bold marker:content-none"
                style={{ color: "#07253F" }}
              >
                {item.question}
                <span
                  className="flex size-8 shrink-0 items-center justify-center text-lg font-normal transition group-open:rotate-45"
                  style={{ color: "#FB8C33" }}
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed" style={{ color: "#5c6570" }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: "#878D93" }}>
          {es
            ? "¿Otra pregunta? Escríbenos por WhatsApp o llama."
            : "Another question? WhatsApp us or call."}
        </p>
      </div>
    </section>
  );
}
