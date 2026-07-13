"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AgentDialog } from "@/components/agent/AgentDialog";
import { AgentSprite } from "@/components/agent/AgentSprite";
import { cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

type AgentMode = "card" | "chat" | "minimized";

const PROMPT_ROTATION_MS = 4800;

const agentLauncherCopy = {
  zh: {
    openLabel: "打开国华的 AI 助手",
    restoreLabel: "恢复国华的 AI 助手",
    eyebrow: "PROFILE COPILOT",
    prompts: [
      "想快速认识我？点这里聊聊",
      "问问我的项目是怎么做出来的",
      "从经历到想法，让 AI 带你逛逛"
    ]
  },
  en: {
    openLabel: "Open Guohua's AI assistant",
    restoreLabel: "Restore Guohua's AI assistant",
    eyebrow: "PROFILE COPILOT",
    prompts: [
      "Want the quick tour? Start a chat",
      "Ask how I built my latest projects",
      "Explore my work and ideas with AI"
    ]
  }
} as const;

export function AgentLauncher({ className }: { className?: string }) {
  const [mode, setMode] = useState<AgentMode>("card");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = agentLauncherCopy[locale];
  const engaged = hovered || focused;

  useEffect(() => {
    if (reduceMotion || engaged || mode !== "card") {
      return;
    }

    const timer = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % copy.prompts.length);
    }, PROMPT_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [copy.prompts, engaged, mode, reduceMotion]);

  return (
    <>
      {mode === "card" ? (
        <motion.button
          type="button"
          onClick={() => setMode("chat")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileFocus={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "group relative z-10 flex min-h-[84px] w-full items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35 focus-visible:ring-offset-2 motion-reduce:transform-none",
            className
          )}
          aria-label={copy.openLabel}
        >
          <span className="relative z-10 flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center">
            <AgentSprite hovered={engaged} size="card" />
          </span>

          <span className="relative z-10 flex min-h-[78px] min-w-0 flex-1 items-center rounded-lg border border-violet-200/70 bg-white/90 px-4 py-3 shadow-[0_14px_36px_rgba(80,66,130,0.09)] transition duration-300 group-hover:translate-x-0.5 group-hover:border-violet-300 group-hover:bg-white group-hover:shadow-[0_18px_42px_rgba(80,66,130,0.12)] group-focus-visible:translate-x-0.5 group-focus-visible:border-violet-300 group-focus-visible:bg-white group-focus-visible:shadow-[0_18px_42px_rgba(80,66,130,0.12)] motion-reduce:transform-none motion-reduce:transition-none">
            <span className="absolute -left-[7px] top-7 h-3.5 w-3.5 rotate-45 border-b border-l border-violet-200/70 bg-white transition duration-300 group-hover:border-violet-300 group-focus-visible:border-violet-300 motion-reduce:transition-none" />
            <span className="block min-w-0 flex-1">
              <span className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase text-violet-600/75">
                <motion.span
                  animate={{ rotate: reduceMotion ? 0 : engaged ? [0, -8, 8, 0] : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                </motion.span>
                {copy.eyebrow}
              </span>

              <span className="relative block min-h-[2.5rem] overflow-hidden font-display text-[0.95rem] font-semibold leading-5 text-stone-950 md:text-[1rem]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={promptIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {copy.prompts[promptIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>

            <motion.span
              animate={{
                x: reduceMotion ? 0 : engaged ? 2 : 0,
                y: reduceMotion ? 0 : engaged ? -2 : 0
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-200/70 bg-violet-50 text-violet-600 transition-colors duration-300 group-hover:border-violet-300 group-hover:bg-violet-100 group-focus-visible:border-violet-300 group-focus-visible:bg-violet-100 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.span>
          </span>
        </motion.button>
      ) : null}

      {mode === "minimized" ? (
        <motion.button
          type="button"
          onClick={() => setMode("chat")}
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
          whileFocus={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[65] flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/80 shadow-[0_18px_48px_rgba(80,66,130,0.16)] backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35 focus-visible:ring-offset-2 motion-reduce:transform-none md:bottom-6 md:right-6"
          aria-label={copy.restoreLabel}
        >
          <AgentSprite state="curious" size="md" />
        </motion.button>
      ) : null}

      <AgentDialog
        open={mode === "chat"}
        onMinimize={() => setMode("minimized")}
        onClose={() => setMode("card")}
      />
    </>
  );
}
