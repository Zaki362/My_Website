"use client";

import { Suspense, createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, dictionary, type Locale } from "@/data/i18n";
import { syncLocalizedPageMetadata } from "@/lib/page-metadata";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof dictionary)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LocalizedPageMetadata({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => syncLocalizedPageMetadata(pathname, locale), [pathname, locale]);

  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem("site-locale");
    if (stored === "en" || stored === "zh") {
      setLocaleState(stored);
      document.documentElement.lang = stored === "zh" ? "zh-CN" : "en";
    }
  }, []);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    window.localStorage.setItem("site-locale", nextLocale);
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
  }

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "zh" : "en"),
      t: dictionary[locale]
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      <Suspense fallback={null}>
        <LocalizedPageMetadata locale={locale} />
      </Suspense>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
