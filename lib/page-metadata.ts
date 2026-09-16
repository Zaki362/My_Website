import { siteMeta } from "@/data/profile";
import { getProjectBySlug, type PortfolioProject, type ProjectLocale } from "@/data/projects";

type PageMetadata = {
  title: string;
  description: string;
};

export const aiNativeMetadata: PageMetadata = {
  title: "国华的 AI 工作室 · AI-native",
  description: "走进郑国华的交互式 3D 工作室，通过电脑、书架与窗景探索 AI 项目、教育、工作、科研与生活。"
};

const homeMetadata: Record<ProjectLocale, PageMetadata> = {
  zh: siteMeta,
  en: {
    title: "Guohua Zheng | AI Builder",
    description:
      "Guohua Zheng is an AI Builder expanding product boundaries with AI and turning model capabilities into usable products and incremental value."
  }
};

export function getProjectPageMetadata(project: PortfolioProject, locale: ProjectLocale): PageMetadata {
  const copy = project.locales[locale];
  return {
    title: locale === "zh" ? `${copy.title}｜郑国华项目` : `${copy.title} | Guohua Zheng's Projects`,
    description: copy.summary
  };
}

export function getLocalizedPageMetadata(pathname: string, locale: ProjectLocale): PageMetadata | null {
  if (pathname === "/") {
    return homeMetadata[locale];
  }
  if (pathname === "/ai-native" || pathname === "/ai-native/") {
    return aiNativeMetadata;
  }

  const match = /^\/projects\/([^/]+)\/?$/.exec(pathname);
  const project = match ? getProjectBySlug(match[1]) : undefined;
  // Unknown routes and 404s own their metadata.
  return project ? getProjectPageMetadata(project, locale) : null;
}

export function syncLocalizedPageMetadata(pathname: string, locale: ProjectLocale) {
  const metadata = getLocalizedPageMetadata(pathname, locale);
  if (!metadata) return;
  const { title, description: localizedDescription } = metadata;

  function applyMetadata() {
    // A previous route's observer can fire before React cleans up its effect.
    if (window.location.pathname !== pathname) return;

    if (document.title !== title) {
      document.title = title;
    }
    const description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description && description.content !== localizedDescription) {
      description.content = localizedDescription;
    }
  }

  applyMetadata();
  // Next can commit streamed metadata after the locale or route effect. Keep
  // this route's title/description localized without adding duplicate tags.
  const observer = new MutationObserver(applyMetadata);
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["content"]
  });

  return () => observer.disconnect();
}
