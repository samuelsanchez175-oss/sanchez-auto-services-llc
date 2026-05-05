import type { Catalog, Locale } from "@/lib/catalog/types";
import { enCatalog } from "@/lib/catalog/en";
import { esCatalog } from "@/lib/catalog/es";

export * from "@/lib/catalog/types";
export const catalogs: Record<Locale, Catalog> = {
  en: enCatalog,
  es: esCatalog,
};

export function catalogFor(locale: Locale): Catalog {
  return catalogs[locale] ?? enCatalog;
}
