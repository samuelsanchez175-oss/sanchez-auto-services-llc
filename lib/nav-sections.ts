/**
 * Homepage sections that appear in the top bar — scroll order.
 * IDs must match section `id` attributes in clean/* components.
 */
export const NAV_SECTION_IDS = [
  "home",
  "dealerships",
  "history",
  "insurance",
  "work",
  "services",
  "process",
  "reviews",
  "faq",
  "quote",
  "hours",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Keep URL hash in sync without a hard jump
  if (typeof history !== "undefined") {
    history.replaceState(null, "", `#${id}`);
  }
}
