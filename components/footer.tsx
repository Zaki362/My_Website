"use client";

import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#fbfaf7] pb-8">
      <div className="container-shell flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>{t.footer}</span>
        <span>Guohua Zheng · 2026</span>
      </div>
    </footer>
  );
}
