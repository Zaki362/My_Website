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
          "max-w-[88%] whitespace-pre-wrap rounded-[1.35rem] border px-4 py-3 text-sm leading-7 shadow-[0_12px_30px_rgba(79,62,39,0.05)]",
          isUser
            ? "border-[#2b2933]/10 bg-[#2b2933] text-[#fffaf2]"
            : "border-stone-900/10 bg-[#fffdfa]/86 text-stone-700"
        )}
      >
        {content}
      </div>
    </div>
  );
}
