"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/profile";
import { AgentLauncher } from "@/components/agent/AgentLauncher";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const homeLinks = navigation.filter((item) => item.href.startsWith("#"));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={`container-shell rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-slate-950/68 shadow-panel backdrop-blur-xl"
            : "border-white/6 bg-slate-950/38 backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="shrink-0">
            <AgentLauncher />
          </div>

          <nav className="hidden flex-1 items-center justify-end gap-6 md:flex">
            {navigation.map((item) => {
              const isActive =
                item.href === "/projects"
                  ? pathname === "/projects"
                  : pathname === "/" && item.href.startsWith("#");

              return (
                <Link
                  key={item.label}
                  href={pathname === "/projects" && item.href.startsWith("#") ? `/${item.href}` : item.href}
                  className={`text-sm tracking-[0.04em] transition ${
                    isActive ? "text-white" : "text-slate-300/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            aria-label="打开菜单"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="container-shell md:hidden"
          >
            <div className="mt-3 rounded-3xl border border-white/10 bg-slate-950/92 p-5 shadow-panel backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {homeLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={pathname === "/projects" ? `/${item.href}` : item.href}
                    className="rounded-2xl px-3 py-3 text-sm text-slate-200/82 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  className="rounded-2xl px-3 py-3 text-sm text-slate-200/82 transition hover:bg-white/5 hover:text-white"
                >
                  Projects
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
