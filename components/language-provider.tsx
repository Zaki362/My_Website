"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, dictionary, type Locale } from "@/data/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (typeof dictionary)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const pageMeta = {
  en: {
    title: "Guohua Zheng | AI Product Builder",
    description:
      "Personal website of Guohua Zheng, focused on AI product work, research training, Vibe Coding projects and collaboration."
  },
  zh: {
    title: "郑国华｜北京大学经济学硕士 / AI 产品经理",
    description:
      "郑国华的个人网站，聚焦教育背景、工作经历、科研竞赛、Vibe Coding 项目展示。"
  }
} as const;

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
    document.title = pageMeta[locale].title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = pageMeta[locale].description;
    }
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

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
