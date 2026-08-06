"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ServiceQuoteModal } from "@/components/marketing/service-quote-modal1515";
import { trackEvent } from "@/lib/analytics";

type QuoteLeadContextValue = {
  /** Open structured WhatsApp quote sheet, optionally pre-labeling the service/issue. */
  openQuote: (serviceLabel?: string) => void;
};

const QuoteLeadContext = createContext<QuoteLeadContextValue | null>(null);

export function QuoteLeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string | null>(null);

  const openQuote = useCallback((serviceLabel?: string) => {
    const label = serviceLabel?.trim() || null;
    setService(label);
    setOpen(true);
    trackEvent("quote_open", { service: label ?? "general" });
  }, []);

  const value = useMemo(() => ({ openQuote }), [openQuote]);

  return (
    <QuoteLeadContext.Provider value={value}>
      {children}
      {open ? (
        <ServiceQuoteModal
          service={service}
          onClose={() => {
            setOpen(false);
            setService(null);
          }}
        />
      ) : null}
    </QuoteLeadContext.Provider>
  );
}

export function useQuoteLead(): QuoteLeadContextValue {
  const ctx = useContext(QuoteLeadContext);
  if (!ctx) {
    throw new Error("useQuoteLead must be used within QuoteLeadProvider");
  }
  return ctx;
}
