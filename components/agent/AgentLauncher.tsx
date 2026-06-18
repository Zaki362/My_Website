"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          title: "Hi！我是国华的 AI 助手 👋",
          cta: "点击和我对话"
        }
      : {
          openLabel: "Open Guohua's AI assistant",
          restoreLabel: "Restore Guohua's AI assistant",
          title: "Hi, I'm Guohua's AI assistant 👋",
          cta: "Start a conversation"
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
          whileHover={reduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "group relative z-10 flex h-[96px] w-full items-center overflow-hidden rounded-[1.75rem] border border-[rgba(130,100,70,0.12)] bg-white/[0.82] px-5 py-4 text-left shadow-[0_20px_60px_rgba(80,60,40,0.10)] backdrop-blur-2xl transition hover:border-[rgba(130,100,70,0.2)] hover:shadow-[0_26px_76px_rgba(80,60,40,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.40]",
            className
          )}
          aria-label={copy.openLabel}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_92%_68%,rgba(139,108,246,0.12),transparent_32%),radial-gradient(circle_at_12%_18%,rgba(255,226,184,0.34),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,247,235,0.78))]" />
          <span className="pointer-events-none absolute -left-2 bottom-3 h-12 w-12 rounded-bl-[1.2rem] border-b-2 border-l-2 border-[#f1c78f]/[0.42]" />
          <span className="pointer-events-none absolute -right-2 top-3 h-12 w-12 rounded-tr-[1.2rem] border-r-2 border-t-2 border-[#f1c78f]/[0.42]" />
          <span className="pointer-events-none absolute left-4 top-4 h-2 w-2 rotate-45 rounded-[1px] bg-[#f3c98d] shadow-[11px_-9px_0_-2px_rgba(243,201,141,0.88)]" />

          <span className="relative z-10 mr-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] border border-white/70 bg-[#fff8ee] shadow-[0_14px_32px_rgba(80,60,40,0.11)]">
            <AgentSprite hovered={hovered} size="sm" />
          </span>

          <span className="relative z-10 block min-w-0 flex-1">
            <span className="block font-display text-[1rem] font-[760] leading-snug text-[#3a281b] drop-shadow-[0_1px_0_rgba(255,255,255,0.58)] md:text-[1.08rem]">
              {copy.title}
            </span>
            <span className="mt-2.5 inline-flex items-center gap-2 font-display text-[0.88rem] font-[650] leading-none text-[#7b6650] transition group-hover:text-[#3d2a1c]">
              {copy.cta}
              <ArrowRight className="h-[1.125rem] w-[1.125rem] transition duration-300 group-hover:translate-x-1" />
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
          className="fixed bottom-5 right-5 z-[65] flex h-16 w-16 items-center justify-center rounded-full border border-stone-900/10 bg-[#fffdfa]/92 shadow-[0_22px_60px_rgba(79,62,39,0.16)] backdrop-blur-2xl md:bottom-6 md:right-6"
          aria-label={copy.restoreLabel}
        >
          <AgentSprite active size="md" />
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
