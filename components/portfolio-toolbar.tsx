"use client";

import Link from "next/link";
import { ArrowLeft, Languages } from "lucide-react";
import { useLanguage } from "./language-provider";
import translations from "./portfolio-translations.json";

const interactionCopy: Record<string, string> = {
  "已复制": "Copied",
  "已复制到剪贴板": "Copied to clipboard",
  "复制未成功，请手动选择上方命令": "Copy failed. Select the commands above to copy them manually."
};

export function usePortfolioCopy() {
  const { locale } = useLanguage();
  const copy: Record<string, string> = translations;
  return { locale, t: (text: string) => locale === "zh" ? text : `${copy[text] ?? interactionCopy[text] ?? text} ` };
}

export function PortfolioToolbar() {
  const { locale, toggleLocale } = useLanguage();
  return (
    <nav className="project-navigation" aria-label={locale === "zh" ? "项目导航" : "Project navigation"}>
      <div className="project-navigation-inner">
      <Link href="/#projects"><ArrowLeft size={16} aria-hidden="true" />{locale === "zh" ? "返回项目列表" : "Back to projects"}</Link>
      <button type="button" onClick={toggleLocale} aria-label={locale === "zh" ? "切换为英文" : "Switch to Chinese"}>
        <Languages size={16} aria-hidden="true" />
        {locale === "zh" ? "English" : "中文"}
      </button>
      </div>
    </nav>
  );
}
