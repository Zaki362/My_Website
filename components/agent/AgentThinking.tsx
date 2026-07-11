"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { AgentSprite } from "@/components/agent/AgentSprite";

type AgentThinkingProps = {
  phase: "retrieving" | "composing";
  locale: "zh" | "en";
};

export function AgentThinking({ phase, locale }: AgentThinkingProps) {
  const reduceMotion = useReducedMotion();
  const copy =
    locale === "zh"
      ? {
          retrieving: "正在匹配站内资料",
          composing: "正在整理成简短回答"
        }
      : {
          retrieving: "Matching site knowledge",
          composing: "Shaping a concise answer"
        };
  const Icon = phase === "retrieving" ? Search : Sparkles;

  return (
    <div className="flex items-center gap-3 py-1" role="status" aria-live="polite">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        <AgentSprite state="thinking" size="sm" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
          <Icon className="h-3.5 w-3.5 text-violet-500" />
          <span>{copy[phase]}</span>
        </div>
        <div className="mt-2 flex gap-1">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-1 w-5 rounded-full bg-stone-200"
              animate={reduceMotion ? undefined : { backgroundColor: ["#e7e5e4", "#7c6bdd", "#e7e5e4"] }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, delay: item * 0.16 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
