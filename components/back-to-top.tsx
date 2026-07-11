"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const { locale } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          transition={{ duration: 0.28 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          className="fixed bottom-24 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-900/10 bg-white/90 text-stone-900 shadow-panel backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white md:bottom-28 md:right-8 md:h-12 md:w-12"
          aria-label={locale === "zh" ? "返回顶部" : "Back to top"}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
