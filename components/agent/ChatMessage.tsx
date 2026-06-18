"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { cn } from "@/components/agent/cn";
import type { AgentAction, AgentSection, AgentSource } from "@/lib/agent/types";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  locale?: "zh" | "en";
  sections?: AgentSection[];
  sources?: AgentSource[];
  actions?: AgentAction[];
  copiedActionId?: string | null;
  onAction?: (action: AgentAction) => void;
};

const categoryLabels: Record<string, { zh: string; en: string }> = {
  identity: { zh: "定位", en: "Profile" },
  education: { zh: "教育", en: "Education" },
  honor: { zh: "荣誉", en: "Honors" },
  experience: { zh: "工作", en: "Work" },
  research: { zh: "科研", en: "Research" },
  campus: { zh: "校园", en: "Campus" },
  skills: { zh: "技能", en: "Skills" },
  "project-interest": { zh: "方向", en: "Interests" },
  project: { zh: "项目", en: "Projects" },
  contact: { zh: "联系", en: "Contact" },
  beyond: { zh: "生活", en: "Life" }
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
    <div className="space-y-3">
      {sections.map((section, index) => {
        if (section.type === "summary" || section.type === "note") {
          return (
            <p
              key={`${section.type}-${index}`}
              className={cn(
                "leading-7",
                section.type === "summary" ? "font-medium text-stone-800" : "text-stone-500"
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
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-stone-600">
                    <span className="mt-[0.82em] h-px w-3 shrink-0 bg-[#d7a45f]/70" />
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
            <div className="grid gap-2">
              {section.items.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="rounded-2xl border border-blue-500/10 bg-blue-500/[0.055] px-3 py-2.5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-500">
                      {metric.label}
                    </span>
                    <span className="font-display text-base font-[760] text-blue-700">
                      {metric.value}
                    </span>
                  </div>
                  {metric.detail ? (
                    <p className="mt-1 text-xs leading-5 text-blue-700/70">{metric.detail}</p>
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
  sources,
  actions,
  copiedActionId,
  onAction
}: ChatMessageProps) {
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
        {isUser ? (
          content
        ) : (
          <div className="space-y-3.5">
            <AssistantSections sections={sections} content={content} />

            {sources?.length ? (
              <div className="flex flex-wrap gap-1.5 border-t border-stone-900/10 pt-3">
                {sources.slice(0, 4).map((source) => (
                  <span
                    key={source.id}
                    className="rounded-full border border-stone-900/10 bg-stone-900/[0.035] px-2.5 py-1 text-[11px] font-medium text-stone-500"
                    title={source.title}
                  >
                    {categoryLabels[source.category]?.[locale] ?? source.category}
                  </span>
                ))}
              </div>
            ) : null}

            {actions?.length ? (
              <div className="flex flex-wrap gap-2">
                {actions.map((action) => {
                  const copied = copiedActionId === action.id;

                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onAction?.(action)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        action.variant === "primary"
                          ? "border-[#2b2933]/10 bg-[#2b2933] text-[#fffaf2] hover:bg-[#24222b]"
                          : "border-blue-500/10 bg-blue-500/[0.065] text-blue-700 hover:bg-blue-500/[0.1]"
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
