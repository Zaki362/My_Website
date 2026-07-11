"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AgentDialog } from "@/components/agent/AgentDialog";
import { AgentSprite } from "@/components/agent/AgentSprite";
import { cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

type AgentMode = "card" | "chat" | "minimized";

export function AgentLauncher({ className }: { className?: string }) {
  const [mode, setMode] = useState<AgentMode>("card");
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy =
    locale === "zh"
      ? {
          openLabel: "打开国华的 AI 助手",
          restoreLabel: "恢复国华的 AI 助手",
          eyebrow: "PROFILE COPILOT",
          title: "让 AI 帮你快速了解我"
        }
      : {
          openLabel: "Open Guohua's AI assistant",
          restoreLabel: "Restore Guohua's AI assistant",
          eyebrow: "PROFILE COPILOT",
          title: "Get to know me through AI"
        };

  return (
    <>
      {mode === "card" ? (
        <motion.button
          type="button"
          onClick={() => setMode("chat")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "group relative z-10 flex min-h-[84px] w-full items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35",
            className
          )}
          aria-label={copy.openLabel}
        >
          <span className="relative z-10 flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center">
            <AgentSprite hovered={hovered} size="card" />
          </span>

          <span className="relative z-10 flex min-h-[74px] min-w-0 flex-1 items-center rounded-lg border border-violet-200/70 bg-white/90 px-4 py-3 shadow-[0_14px_36px_rgba(80,66,130,0.09)] transition group-hover:border-violet-300 group-hover:bg-white group-hover:shadow-[0_18px_42px_rgba(80,66,130,0.12)]">
            <span className="absolute -left-[7px] top-7 h-3.5 w-3.5 rotate-45 border-b border-l border-violet-200/70 bg-white transition group-hover:border-violet-300" />
            <span className="block min-w-0">
            <span className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase text-violet-600/75">
              <Sparkles className="h-3 w-3" />
              {copy.eyebrow}
            </span>
            <span className="block font-display text-[0.98rem] font-semibold leading-snug text-stone-950 md:text-[1.02rem]">
              {copy.title}
            </span>
            </span>
          </span>
        </motion.button>
      ) : null}

      {mode === "minimized" ? (
        <motion.button
          type="button"
          onClick={() => setMode("chat")}
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[65] flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/80 shadow-[0_18px_48px_rgba(80,66,130,0.16)] backdrop-blur-md md:bottom-6 md:right-6"
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
