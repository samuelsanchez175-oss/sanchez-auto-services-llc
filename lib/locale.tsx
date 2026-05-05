"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { catalogFor, catalogs, type Locale, type Catalog } from "@/lib/catalog";

const STORAGE_KEY = "sas_locale_v1";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  catalog: Catalog;
};

const LocaleContext = createContext<LocaleCtx | undefined>(undefined);

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "es" ? "es" : raw === "en" ? "en" : null;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const boot = initialLocale ?? "en";

  const [locale, setLocaleState] = useState<Locale>(boot);

  useEffect(() => {
    const persisted = readStoredLocale();
    if (!persisted) return undefined;

    const handle = window.setTimeout(() => {
      setLocaleState(persisted);
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  useEffect(() => {
    document.documentElement.lang = catalogs[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale,
      catalog: catalogFor(locale),
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleActions() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("LocaleProvider missing");

  const toggle = useCallback(() => {
    ctx.setLocale(ctx.locale === "en" ? "es" : "en");
  }, [ctx]);

  return { locale: ctx.locale, setLocale: ctx.setLocale, toggle, catalog: ctx.catalog };
}

export function useCatalog() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("LocaleProvider missing");
  return ctx.catalog;
}
