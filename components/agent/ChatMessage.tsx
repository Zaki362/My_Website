"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { cn } from "@/components/agent/cn";
import type { AgentAction, AgentSection, AgentSource } from "@/lib/agent/types";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  locale?: "zh" | "en";
  sections?: AgentSection[];
  actions?: AgentAction[];
  mode?: "profile" | "general";
  fallback?: boolean;
  error?: boolean;
  sources?: AgentSource[];
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
                    <span className="min-w-0">{item}</span>
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
  fallback,
  error,
  sources,
  copiedActionId,
  onAction
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "min-w-0 whitespace-pre-wrap text-sm [overflow-wrap:anywhere]",
          isUser
            ? "max-w-[84%] rounded-lg border border-violet-200/80 bg-[#f0edfb] px-4 py-2.5 leading-6 text-stone-800 shadow-[0_8px_20px_rgba(83,68,135,0.06)]"
            : "w-full border-l border-violet-300 pl-3.5 pr-1 text-stone-700",
          error && "border-amber-300"
        )}
      >
        {isUser ? (
          content
        ) : (
          <div className="space-y-3.5">
            {mode || error || fallback ? (
              <p className={cn("text-[10px] font-medium", error || fallback ? "text-amber-700" : "text-stone-500")}>
                {error ? (locale === "zh" ? "回复未完成" : "Reply incomplete")
                  : fallback ? (locale === "zh" ? "网站资料回答 · AI 暂不可用" : "Website information · AI unavailable")
                  : mode === "profile" ? (locale === "zh" ? "基于公开资料" : "From public information")
                  : (locale === "zh" ? "助手回复" : "Assistant reply")}
              </p>
            ) : null}
            <AssistantSections sections={sections} content={content} />

            {sources?.length ? (
              <details className="text-[11px] leading-5 text-stone-500">
                <summary className="w-fit cursor-pointer rounded text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500">{locale === "zh" ? `参考资料 · ${sources.length}` : `Sources · ${sources.length}`}</summary>
                <ul className="mt-1.5 list-inside list-disc space-y-1">{sources.map((source) => <li key={source.id}>{source.title}</li>)}</ul>
              </details>
            ) : null}

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
