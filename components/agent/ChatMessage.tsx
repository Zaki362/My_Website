"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { cn } from "@/components/agent/cn";
import type { AgentAction, AgentSection } from "@/lib/agent/types";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  locale?: "zh" | "en";
  sections?: AgentSection[];
  actions?: AgentAction[];
  mode?: "profile" | "general";
  copiedActionId?: string | null;
  onAction?: (action: AgentAction) => void;
};

function getActionIcon(action: AgentAction, copied: boolean) {
  if (copied) {
    return <Check className="h-3.5 w-3.5" />;
  }

  if (action.kind === "copy") {
    return <Copy className="h-3.5 w-3.5" />;
  }

  if (action.kind === "resume") {
    return <FileText className="h-3.5 w-3.5" />;
  }

  if (action.kind === "mailto") {
    return <Mail className="h-3.5 w-3.5" />;
  }

  return <ArrowUpRight className="h-3.5 w-3.5" />;
}

function AssistantSections({ sections, content }: { sections?: AgentSection[]; content: string }) {
  if (!sections?.length) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div className="space-y-3.5">
      {sections.map((section, index) => {
        if (section.type === "summary" || section.type === "note") {
          return (
            <p
              key={`${section.type}-${index}`}
              className={cn(
                "leading-6",
                section.type === "summary" ? "font-medium text-stone-900" : "text-stone-500"
              )}
            >
              {section.content}
            </p>
          );
        }

        if (section.type === "bullets") {
          return (
            <div key={`${section.type}-${index}`} className="space-y-2">
              {section.title ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {section.title}
                </p>
              ) : null}
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-stone-600">
                    <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <div key={`${section.type}-${index}`} className="space-y-2">
            {section.title ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                {section.title}
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-stone-900/8 py-3">
              {section.items.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="min-w-0"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-stone-400">
                      {metric.label}
                    </span>
                    <span className="mt-1 block font-display text-lg font-[720] text-violet-700">
                      {metric.value}
                    </span>
                  </div>
                  {metric.detail ? (
                    <p className="mt-1 text-[11px] leading-4 text-stone-500">{metric.detail}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ChatMessage({
  role,
  content,
  locale = "zh",
  sections,
  actions,
  mode,
  copiedActionId,
  onAction
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "whitespace-pre-wrap text-sm",
          isUser
            ? "max-w-[84%] rounded-lg border border-violet-200/80 bg-[#f0edfb] px-4 py-2.5 leading-6 text-stone-800 shadow-[0_8px_20px_rgba(83,68,135,0.06)]"
            : "w-full border-l border-violet-300 pl-3.5 pr-1 text-stone-700"
        )}
      >
        {isUser ? (
          content
        ) : (
          <div className="space-y-3.5">
            {mode ? (
              <p className="text-[10px] font-semibold uppercase text-stone-400">
                {mode === "profile" ? "Profile read" : "Quick thought"}
              </p>
            ) : null}
            <AssistantSections sections={sections} content={content} />

            {actions?.length ? (
              <div className="flex flex-wrap gap-2 pt-0.5">
                {actions.map((action) => {
                  const copied = copiedActionId === action.id;

                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onAction?.(action)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition",
                        action.variant === "primary"
                          ? "border-violet-600 bg-violet-600 text-white shadow-sm hover:bg-violet-700"
                          : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                      )}
                    >
                      {copied ? (locale === "zh" ? "已复制" : "Copied") : action.label}
                      {getActionIcon(action, copied)}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
