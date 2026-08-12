/**
 * Lightweight event tracking for conversion funnel.
 * Works with Vercel Web Analytics custom events when available;
 * always logs in dev for verification.
 */
export type AnalyticsEvent =
  | "quote_open"
  | "quote_click"
  | "whatsapp_outbound"
  | "call_click"
  | "directions_click"
  | "instagram_click"
  | "explainer_play"
  | "maps_listing_click"
  | "write_review_click";

export function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, string | number | boolean | undefined | null>,
): void {
  const payload = { ...props, t: Date.now() };

  if (typeof window === "undefined") return;

  // Vercel Web Analytics custom events (when @vercel/analytics is installed)
  try {
    const va = (window as unknown as { va?: (...args: unknown[]) => void }).va;
    if (typeof va === "function") {
      va("event", { name, ...payload });
    }
  } catch {
    /* no-op */
  }

  // dataLayer for optional GTM/GA later
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...payload });
  } catch {
    /* no-op */
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.info("[analytics]", name, payload);
  }
}
