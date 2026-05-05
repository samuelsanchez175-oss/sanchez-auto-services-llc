"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCatalog } from "@/lib/locale";

export function FaqSection() {
  const c = useCatalog();

  return (
    <section
      id="faq"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: "#1a1520" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#e04e28" }}
          aria-hidden
        >
          FAQ
        </p>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {c.faq.title}
        </h2>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          {c.faq.lead}
        </p>

        <div
          className="overflow-hidden rounded-xl"
          style={{ border: "1.5px solid rgba(255,255,255,0.07)" }}
        >
          <Accordion className="w-full" multiple={false} defaultValue={[]}>
            {c.faq.items.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={`faq-${idx}`}
                className="border-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <AccordionTrigger
                  className="px-5 py-4 text-left text-sm font-semibold text-white hover:no-underline hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.60)", background: "rgba(0,0,0,0.10)" }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
