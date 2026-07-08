"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Mail, Minus, Send, X } from "lucide-react";
import { agentProfiles } from "@/data/knowledge-base/profile";
import { ChatMessage } from "@/components/agent/ChatMessage";
import { SuggestedQuestions } from "@/components/agent/SuggestedQuestions";
import { AgentSprite } from "@/components/agent/AgentSprite";
import { useLanguage } from "@/components/language-provider";
import type { AgentAction, AgentResponse } from "@/lib/agent/types";

type Message = {
  role: "user" | "assistant";
  content: string;
} & Partial<Pick<AgentResponse, "sections" | "sources" | "actions" | "followups" | "refused" | "fallback" | "casual">>;

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
    helper: "轻松聊，回答会尽量简短",
    placeholder: "想聊点什么？",
    sendLabel: "发送"
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
    helper: "Ask anything; replies stay brief",
    placeholder: "What would you like to ask?",
    sendLabel: "Send"
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
  const [error, setError] = useState<string | null>(null);
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
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
    setError(null);

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

      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: message,
          sections: [{ type: "summary", content: message }]
        }
      ]);
    } finally {
      setLoading(false);
    }
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

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "100% 100%" }}
          className="fixed bottom-5 right-5 z-[80] flex h-[min(560px,calc(100vh-2.5rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-stone-900/10 bg-[#fffdfa]/95 shadow-[0_30px_90px_rgba(79,62,39,0.18)] backdrop-blur-2xl md:bottom-6 md:right-6"
          aria-label={copy.windowLabel}
        >
          <header className="border-b border-stone-900/10 bg-[linear-gradient(135deg,#fffdfa,#f5efe4_52%,#eef5ff)] px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-stone-900/10 bg-white/70 shadow-[0_12px_28px_rgba(79,62,39,0.10)]">
                  <AgentSprite active />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-[620] leading-6 text-stone-950">
                    {profile.agentName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs leading-5 text-stone-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {profile.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={onMinimize}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-900/10 bg-white/55 text-stone-500 transition hover:bg-white hover:text-stone-950"
                  aria-label={copy.minimizeLabel}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-900/10 bg-white/55 text-stone-500 transition hover:bg-white hover:text-stone-950"
                  aria-label={copy.closeLabel}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => {
              const suggestions =
                index === 0
                  ? quickQuestions
                  : message.role === "assistant"
                    ? message.followups ?? []
                    : [];

              return (
                <div key={`${message.role}-${index}`}>
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    locale={locale}
                    sections={message.sections}
                    actions={message.actions}
                    copiedActionId={copiedActionId}
                    onAction={handleAgentAction}
                  />
                  {suggestions.length ? (
                  <div className="mt-3">
                    <SuggestedQuestions questions={suggestions} onSelect={submitQuestion} disabled={loading} />
                  </div>
                  ) : null}
                </div>
              );
            })}

            {loading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-[1.35rem] border border-stone-900/10 bg-[#fffdfa]/86 px-4 py-3 text-sm text-stone-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {copy.loading}
                </div>
              </div>
            ) : null}
          </div>

          <form
            className="border-t border-stone-900/10 bg-[#fffdfa]/92 px-4 py-4"
            onSubmit={(event) => {
              event.preventDefault();
              void submitQuestion(input);
            }}
          >
            <div className="mb-2 flex items-center justify-between text-[11px] text-stone-400">
              <span>{copy.helper}</span>
              <span>{remaining}</span>
            </div>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))}
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
                className="min-h-[48px] flex-1 resize-none rounded-[1.2rem] border border-stone-900/10 bg-white/72 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-blue-500/24 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2933] text-[#fffaf2] shadow-[0_14px_32px_rgba(61,50,38,0.14)] transition hover:bg-[#24222b] disabled:cursor-not-allowed disabled:opacity-45"
                aria-label={copy.sendLabel}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {error ? (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-rose-500">
                <Mail className="h-3.5 w-3.5" />
                {error}
              </p>
            ) : null}
          </form>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );

  return mounted ? createPortal(dialog, document.body) : null;
}
