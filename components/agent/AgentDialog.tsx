"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, RotateCcw, Send, X } from "lucide-react";
import { agentProfiles } from "@/data/knowledge-base/profile";
import { ChatMessage } from "@/components/agent/ChatMessage";
import { SuggestedQuestions } from "@/components/agent/SuggestedQuestions";
import { AgentSprite } from "@/components/agent/AgentSprite";
import { AgentThinking } from "@/components/agent/AgentThinking";
import { useLanguage } from "@/components/language-provider";
import type { AgentAction, AgentResponse } from "@/lib/agent/types";

type Message = {
  role: "user" | "assistant";
  content: string;
} & Partial<Pick<AgentResponse, "mode" | "sections" | "sources" | "actions" | "followups" | "refused" | "fallback" | "casual">>;

type AgentDialogProps = {
  open: boolean;
  onClose: () => void;
  onMinimize: () => void;
};

const MAX_INPUT_LENGTH = 500;
const RESUME_REQUEST_EVENT = "resume-request:open";

const agentDialogCopy = {
  zh: {
    unavailable: "助手暂时不可用。",
    noAnswer:
      "这个我掌握的信息不多，只能先简单说到这里。",
    genericError: "助手暂时卡了一下。",
    windowLabel: "国华的 AI 助手聊天窗口",
    minimizeLabel: "最小化 AI 助手",
    closeLabel: "关闭 AI 助手",
    loading: "正在想一下...",
    helper: "公开资料 RAG · 简短回答",
    placeholder: "问经历、项目，也可以随便聊聊",
    sendLabel: "发送",
    clearLabel: "开始新对话",
    eyebrow: "PROFILE COPILOT",
    capability: "检索 · 归纳 · 回答",
    starterTitle: "从一个问题开始"
  },
  en: {
    unavailable: "The assistant is temporarily unavailable.",
    noAnswer:
      "I do not have much information on that, so I can only keep it brief.",
    genericError: "The assistant got stuck for a moment.",
    windowLabel: "Guohua's AI assistant chat window",
    minimizeLabel: "Minimize AI assistant",
    closeLabel: "Close AI assistant",
    loading: "Thinking briefly...",
    helper: "Public-site RAG · concise replies",
    placeholder: "Ask about work, projects, or anything light",
    sendLabel: "Send",
    clearLabel: "Start a new conversation",
    eyebrow: "PROFILE COPILOT",
    capability: "Retrieve · synthesize · answer",
    starterTitle: "Start with a question"
  }
} as const;

export function AgentDialog({ open, onClose, onMinimize }: AgentDialogProps) {
  const { locale } = useLanguage();
  const profile = agentProfiles[locale];
  const copy = agentDialogCopy[locale];
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: profile.welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState<"retrieving" | "composing">("retrieving");
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const thinkingTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const canSend = input.trim().length > 0 && input.trim().length <= MAX_INPUT_LENGTH && !loading;
  const remaining = MAX_INPUT_LENGTH - input.trim().length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const welcomeMessages = Object.values(agentProfiles).map((item) => item.welcomeMessage);
    setMessages((current) => {
      if (
        current.length === 1 &&
        current[0]?.role === "assistant" &&
        (welcomeMessages as readonly string[]).includes(current[0].content)
      ) {
        return [{ role: "assistant", content: profile.welcomeMessage }];
      }

      return current;
    });
  }, [profile.welcomeMessage]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) {
        window.clearTimeout(thinkingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [messages, loading, reduceMotion]);

  async function submitQuestion(question: string) {
    const trimmed = question.trim();

    if (!trimmed || trimmed.length > MAX_INPUT_LENGTH || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setThinkingPhase("retrieving");
    thinkingTimerRef.current = window.setTimeout(() => setThinkingPhase("composing"), 850);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages,
          locale
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.reply || copy.unavailable);
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          mode: data?.mode === "general" ? "general" : "profile",
          content:
            typeof data?.reply === "string" && data.reply.trim()
              ? data.reply.trim()
              : copy.noAnswer,
          sections: Array.isArray(data?.sections) ? data.sections : undefined,
          sources: Array.isArray(data?.sources) ? data.sources : undefined,
          actions: Array.isArray(data?.actions) ? data.actions : undefined,
          followups: Array.isArray(data?.followups) ? data.followups : undefined,
          refused: Boolean(data?.refused),
          fallback: Boolean(data?.fallback),
          casual: Boolean(data?.casual)
        }
      ]);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : copy.genericError;

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: message,
          sections: [{ type: "summary", content: message }]
        }
      ]);
    } finally {
      if (thinkingTimerRef.current) {
        window.clearTimeout(thinkingTimerRef.current);
        thinkingTimerRef.current = null;
      }
      setLoading(false);
    }
  }

  function resetConversation() {
    setMessages([{ role: "assistant", content: profile.welcomeMessage }]);
    setInput("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function handleAgentAction(action: AgentAction) {
    if (action.kind === "copy" && action.value) {
      try {
        await navigator.clipboard.writeText(action.value);
        setCopiedActionId(action.id);
        window.setTimeout(() => setCopiedActionId(null), 1500);
      } catch {
        if (action.value.includes("@")) {
          window.location.href = `mailto:${action.value}`;
        }
      }
      return;
    }

    if (action.kind === "resume") {
      window.dispatchEvent(new CustomEvent(RESUME_REQUEST_EVENT));
      return;
    }

    if (action.kind === "mailto" && action.href) {
      window.location.href = action.href;
      return;
    }

    if (action.kind === "anchor" && action.href) {
      if (action.href.startsWith("#")) {
        if (window.location.pathname !== "/") {
          window.location.href = `/${action.href}`;
          return;
        }

        const target = document.querySelector(action.href);
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          window.history.replaceState(null, "", action.href);
        }
        return;
      }

      window.location.href = action.href;
    }
  }

  const quickQuestions = useMemo(() => profile.suggestedQuestions, [profile.suggestedQuestions]);
  const hasConversation = messages.some((message) => message.role === "user");

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "100% 100%" }}
          className="fixed inset-x-3 bottom-3 z-[80] flex h-[min(680px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-xl border border-violet-200/70 bg-[#fffefd] shadow-[0_28px_80px_rgba(72,58,120,0.16)] md:inset-x-auto md:bottom-6 md:right-6 md:h-[min(620px,calc(100dvh-3rem))] md:w-[430px]"
          aria-label={copy.windowLabel}
          role="dialog"
        >
          <header className="relative overflow-hidden border-b border-violet-200/60 bg-[#f7f5fc] px-4 py-4">
            <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-violet-400" />
            <span className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[#eef7f5] opacity-70" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                  <AgentSprite state={loading ? "thinking" : "curious"} />
                </span>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase text-violet-600/70">
                    {copy.eyebrow}
                  </p>
                  <p className="mt-0.5 font-display text-base font-[620] leading-6 text-stone-950">
                    {profile.agentName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-4 text-stone-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {copy.capability}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {hasConversation ? (
                  <button
                    type="button"
                    onClick={resetConversation}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/70 bg-white/75 text-stone-500 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                    aria-label={copy.clearLabel}
                    title={copy.clearLabel}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onMinimize}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/70 bg-white/75 text-stone-500 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                  aria-label={copy.minimizeLabel}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/70 bg-white/75 text-stone-500 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                  aria-label={copy.closeLabel}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 md:px-5" aria-live="polite">
            {messages.map((message, index) => {
              const suggestions =
                index === 0 && !hasConversation
                  ? quickQuestions
                  : message.role === "assistant" && index === messages.length - 1
                    ? message.followups ?? []
                    : [];

              return (
                <div key={`${message.role}-${index}`}>
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    locale={locale}
                    mode={message.mode}
                    sections={message.sections}
                    actions={message.actions}
                    copiedActionId={copiedActionId}
                    onAction={handleAgentAction}
                  />
                  {suggestions.length ? (
                  <div className="mt-3">
                    {index === 0 ? (
                      <p className="mb-2 text-[10px] font-semibold uppercase text-stone-400">
                        {copy.starterTitle}
                      </p>
                    ) : null}
                    <SuggestedQuestions
                      questions={suggestions}
                      onSelect={submitQuestion}
                      disabled={loading}
                      variant={index === 0 ? "starter" : "followup"}
                    />
                  </div>
                  ) : null}
                </div>
              );
            })}

            {loading ? (
              <AgentThinking phase={thinkingPhase} locale={locale} />
            ) : null}
          </div>

          <form
            className="border-t border-violet-200/60 bg-[#fbfaff] px-4 py-3.5 md:px-5"
            onSubmit={(event) => {
              event.preventDefault();
              void submitQuestion(input);
            }}
          >
            <div className="mb-2 flex items-center justify-between text-[10px] text-stone-400">
              <span>{copy.helper}</span>
              <span>{remaining}</span>
            </div>
            <div className="flex items-end gap-2 rounded-lg border border-violet-200/70 bg-white p-1.5 transition focus-within:border-violet-400 focus-within:shadow-[0_8px_24px_rgba(70,55,120,0.08)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))}
                onInput={(event) => {
                  const target = event.currentTarget;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 112)}px`;
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (canSend) {
                      void submitQuestion(input);
                    }
                  }
                }}
                rows={1}
                placeholder={copy.placeholder}
                className="min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-6 text-stone-800 outline-none placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-violet-600 text-white shadow-[0_8px_20px_rgba(109,91,208,0.2)] transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-200 disabled:shadow-none"
                aria-label={copy.sendLabel}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );

  return mounted ? createPortal(dialog, document.body) : null;
}
