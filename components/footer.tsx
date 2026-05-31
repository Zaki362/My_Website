"use client";

import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="container-shell pb-10">
      <div className="border-t border-stone-900/10 pt-6 text-sm text-stone-500">
        {t.footer}
      </div>
    </footer>
  );
}
