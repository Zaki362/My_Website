"use client";

import { cn } from "@/components/agent/cn";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-[1.4rem] border px-4 py-3 text-sm leading-7",
          isUser
            ? "border-sky-200/16 bg-sky-300/[0.08] text-slate-50"
            : "border-white/8 bg-white/[0.04] text-slate-200/84"
        )}
      >
        {content}
      </div>
    </div>
  );
}
