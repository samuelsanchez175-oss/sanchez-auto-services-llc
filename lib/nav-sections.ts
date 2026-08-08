/**
 * Slim top-bar sections only (Book / Careers / Newsletter live in footer).
 */
export const NAV_SECTION_IDS = [
  "home",
  "dealerships",
  "history",
  "services",
  "work",
  "reviews",
  "hours",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof history !== "undefined") {
    history.replaceState(null, "", `#${id}`);
  }
}
