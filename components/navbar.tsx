"use client";

import Link from "next/link";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

function getHomeSectionId(href: string) {
  if (href.startsWith("#")) {
    return href.slice(1);
  }

  if (href === "/projects") {
    return "projects";
  }

  if (href === "/beyond-work") {
    return "beyond";
  }

  return null;
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/projects") {
    return pathname.startsWith("/projects");
  }

  if (href === "/beyond-work") {
    return pathname.startsWith("/beyond-work");
  }

  return href.startsWith("/") && pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();
  const { locale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["home", "education", "experience", "projects", "research", "beyond", "contact"].filter((id) =>
      Boolean(document.getElementById(id))
    );

    let frame = 0;

    const getSectionElement = (id: string) => {
      const node = document.getElementById(id);
      if (!node) {
        return null;
      }

      return id === "home" ? node : node.closest("section") ?? node;
    };

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.42, 320);
      let nextActive = sectionIds[0] ?? "home";
      const isAtPageEnd =
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 4;

      if (isAtPageEnd) {
        setActiveSection((current) => (current === "contact" ? current : "contact"));
        return;
      }

      for (const id of sectionIds) {
        const element = getSectionElement(id);
        if (!element) {
          continue;
        }

        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) {
          nextActive = id;
        }
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [pathname, t.nav]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function resolveHomeHref(href: string) {
    if (pathname === "/" && href === "/projects") {
      return "#projects";
    }

    if (pathname === "/" && href === "/beyond-work") {
      return "#beyond";
    }

    if (href.startsWith("/")) {
      return href;
    }

    return pathname === "/" ? href : `/${href}`;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 pointer-events-none">
      <div className="container-shell relative flex h-12 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(40,35,30,0.08)] bg-white/[0.75] text-sm font-semibold text-[#241f1b] shadow-[0_12px_40px_rgba(80,60,40,0.08)] backdrop-blur-2xl transition hover:bg-white/[0.9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35]",
            scrolled && "bg-[#fffdfa]/90"
          )}
          aria-label="Go to home"
        >
          GZ
        </Link>

        <nav
          className={cn(
            "pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[rgba(40,35,30,0.08)] bg-white/[0.75] px-2 py-2 shadow-[0_12px_40px_rgba(80,60,40,0.08)] backdrop-blur-2xl transition xl:flex",
            scrolled && "bg-white/[0.88]"
          )}
          aria-label="Primary navigation"
        >
          {t.nav.map((item) => {
            const sectionId = getHomeSectionId(item.href);
            const isActive = pathname === "/" && sectionId ? activeSection === sectionId : isRouteActive(pathname, item.href);

            const className = cn(
              "whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-[#756e66] transition hover:bg-[#f5efe6] hover:text-[#241f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35]",
              isActive && "bg-[#f4eee5] text-[#241f1b] shadow-[inset_0_0_0_1px_rgba(80,60,40,0.04)]"
            );

            return (
              <a key={item.label} href={resolveHomeHref(item.href)} className={className}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="hidden h-12 items-center gap-2 rounded-full border border-[rgba(40,35,30,0.08)] bg-white/[0.75] px-3.5 text-xs font-semibold text-stone-700 shadow-[0_12px_40px_rgba(80,60,40,0.08)] backdrop-blur-xl transition hover:bg-white/[0.9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35] sm:inline-flex"
            aria-label={locale === "en" ? "切换到中文" : "Switch to English"}
          >
            <span className={cn(locale === "en" ? "text-stone-950" : "text-stone-400")}>EN</span>
            <span className="h-3 w-px bg-stone-900/12" />
            <span className={cn(locale === "zh" ? "text-stone-950" : "text-stone-400")}>中文</span>
          </button>
          <a
            href={resolveHomeHref("#experience")}
            className="hidden h-12 items-center gap-2.5 rounded-full border border-stone-900/10 bg-[#2b251f] px-5 text-sm font-semibold text-[#fffaf2] shadow-[0_14px_42px_rgba(62,46,31,0.18)] transition hover:-translate-y-0.5 hover:bg-[#211d19] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.45] md:inline-flex"
          >
            <FileText className="h-4 w-4" />
            {t.common.viewCv}
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(40,35,30,0.08)] bg-white/[0.75] text-[#241f1b] shadow-[0_12px_40px_rgba(80,60,40,0.08)] backdrop-blur-xl xl:hidden"
            aria-label={locale === "zh" ? "打开菜单" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="container-shell pointer-events-auto xl:hidden"
          >
            <div className="ml-auto mt-3 max-w-[18rem] rounded-[1.5rem] border border-stone-900/10 bg-[#fffdfa]/95 p-2 shadow-[0_24px_80px_rgba(79,62,39,0.10)] backdrop-blur-2xl">
              <div className="flex flex-col gap-1">
                {t.nav.map((item) => (
                  (() => {
                    const sectionId = getHomeSectionId(item.href);
                    const isActive = pathname === "/" && sectionId ? activeSection === sectionId : isRouteActive(pathname, item.href);

                    return (
                      <a
                        key={item.label}
                        href={resolveHomeHref(item.href)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-full px-4 py-3 text-sm text-stone-600 transition hover:bg-stone-900/[0.045] hover:text-stone-950",
                          isActive && "bg-[#f4eee5] text-stone-950"
                        )}
                      >
                        {item.label}
                      </a>
                    );
                  })()
                ))}
                <button
                  type="button"
                  onClick={toggleLocale}
                  className="rounded-full px-4 py-3 text-left text-sm text-stone-600 transition hover:bg-stone-900/[0.045] hover:text-stone-950 sm:hidden"
                  aria-label={locale === "en" ? "切换到中文" : "Switch to English"}
                >
                  <span className={cn(locale === "en" ? "font-semibold text-stone-950" : "text-stone-400")}>EN</span>
                  <span className="mx-2 text-stone-300">/</span>
                  <span className={cn(locale === "zh" ? "font-semibold text-stone-950" : "text-stone-400")}>中文</span>
                </button>
                <a
                  href={resolveHomeHref("#experience")}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#2b251f] px-4 py-3 text-sm font-medium text-[#fffaf2]"
                >
                  <FileText className="h-4 w-4" />
                  {t.common.viewCv}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
