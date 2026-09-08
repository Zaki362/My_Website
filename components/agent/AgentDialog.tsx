"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, RotateCcw, Send, Square, X } from "lucide-react";
import { agentProfiles } from "@/data/knowledge-base/profile";
import { ChatMessage } from "@/components/agent/ChatMessage";
import { SuggestedQuestions } from "@/components/agent/SuggestedQuestions";
import { AgentSprite } from "@/components/agent/AgentSprite";
import { AgentThinking } from "@/components/agent/AgentThinking";
import { useLanguage } from "@/components/language-provider";
import type { AgentAction, AgentResponse } from "@/lib/agent/types";
import { cn } from "@/components/agent/cn";
import styles from "./studio-agent.module.css";

type Message = {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
} & Partial<Pick<AgentResponse, "mode" | "sections" | "sources" | "actions" | "followups" | "refused" | "fallback" | "casual">>;

type AgentDialogProps = {
  open: boolean;
  onClose: () => void;
  onMinimize: () => void;
  appearance?: "default" | "studio";
  night?: boolean;
};

const MAX_INPUT_LENGTH = 500;
const REQUEST_TIMEOUT_MS = 35_000;
const RESUME_REQUEST_EVENT = "resume-request:open";

const agentDialogCopy = {
  zh: {
    unavailable: "助手暂时不可用。",
    genericError: "暂时没能连接到助手，请检查网络或稍后重试。",
    timeout: "这次回复等待过久，请重试。",
    cancelled: "已停止这次回复。你可以重试，或换个问题。",
    retry: "重试这条问题",
    stopLabel: "停止回复",
    inputLabel: "给国华的 AI 助手提问",
    errorStatus: "回复未完成 · 可重试",
    fallbackStatus: "已从网站资料回答",
    windowLabel: "国华的 AI 助手聊天窗口",
    minimizeLabel: "最小化 AI 助手",
    closeLabel: "关闭 AI 助手",
    loading: "正在准备回复…",
    helper: "回答供参考 · 仅使用公开资料",
    placeholder: "想了解什么？",
    sendLabel: "发送",
    clearLabel: "开始新对话",
    eyebrow: "个人网站助手",
    capability: "聊经历、项目与想法",
    starterTitle: "从一个问题开始"
  },
  en: {
    unavailable: "The assistant is temporarily unavailable.",
    genericError: "Could not connect. Check your connection or try again shortly.",
    timeout: "This reply took too long. Please try again.",
    cancelled: "Reply stopped. You can retry or ask something else.",
    retry: "Retry this question",
    stopLabel: "Stop reply",
    inputLabel: "Ask Guohua's AI assistant a question",
    errorStatus: "Reply incomplete · try again",
    fallbackStatus: "Answered from website info",
    windowLabel: "Guohua's AI assistant chat window",
    minimizeLabel: "Minimize AI assistant",
    closeLabel: "Close AI assistant",
    loading: "Preparing a reply…",
    helper: "Public information · check important details",
    placeholder: "Ask a question…",
    sendLabel: "Send",
    clearLabel: "Start a new conversation",
    eyebrow: "PROFILE COPILOT",
    capability: "Work, projects, and ideas",
    starterTitle: "Start with a question"
  }
} as const;

export function AgentDialog({ open, onClose, onMinimize, appearance = "default", night = false }: AgentDialogProps) {
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
  const requestRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const isStudio = appearance === "studio";

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
      if (event.key === "Escape" && !event.isComposing) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
      requestRef.current?.abort();
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

  async function submitQuestion(question: string, retryIndex?: number) {
    const trimmed = question.trim();

    if (!trimmed || trimmed.length > MAX_INPUT_LENGTH || requestRef.current) {
      return;
    }

    const nextMessages = retryIndex === undefined
      ? [...messages, { role: "user" as const, content: trimmed }]
      : messages.slice(0, retryIndex);
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    setMessages(nextMessages);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setLoading(true);
    setThinkingPhase("retrieving");
    thinkingTimerRef.current = window.setTimeout(() => setThinkingPhase("composing"), 850);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => !message.error && !message.fallback &&
              !Object.values(agentProfiles).some((item) => item.welcomeMessage === message.content))
            .slice(-8)
            .map(({ role, content }) => ({ role, content })),
          locale
        })
      });

      const data = await response.json().catch(() => null);
      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        throw new Error(typeof data?.reply === "string" ? data.reply : copy.unavailable);
      }
      if (typeof data?.reply !== "string" || !data.reply.trim()) throw new Error(copy.unavailable);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          mode: data?.mode === "general" ? "general" : "profile",
          content: data.reply.trim(),
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
      if (requestId !== requestIdRef.current) return;
      const message =
        controller.signal.aborted ? copy.timeout : submissionError instanceof TypeError
          ? copy.genericError : submissionError instanceof Error
          ? submissionError.message
          : copy.genericError;

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: message,
          error: true
        }
      ]);
    } finally {
      window.clearTimeout(timeout);
      if (requestId === requestIdRef.current) {
        if (thinkingTimerRef.current) {
          window.clearTimeout(thinkingTimerRef.current);
          thinkingTimerRef.current = null;
        }
        requestRef.current = null;
        setLoading(false);
      }
    }
  }

  function cancelRequest() {
    requestIdRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    if (thinkingTimerRef.current) window.clearTimeout(thinkingTimerRef.current);
    thinkingTimerRef.current = null;
    setLoading(false);
  }

  function resetConversation() {
    cancelRequest();
    setMessages([{ role: "assistant", content: profile.welcomeMessage }]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
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
  const lastMessage = messages.at(-1);
  const status = loading ? copy.loading : lastMessage?.error ? copy.errorStatus
    : lastMessage?.fallback ? copy.fallbackStatus : copy.capability;

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "100% 100%" }}
          className={cn("fixed inset-x-3 bottom-3 z-[80] flex h-[min(680px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-xl border border-violet-200/70 bg-[#fffefd] shadow-[0_28px_80px_rgba(72,58,120,0.16)] md:inset-x-auto md:bottom-6 md:right-6 md:h-[min(620px,calc(100dvh-3rem))] md:w-[430px]", isStudio && styles.studio)}
          data-studio-agent={isStudio || undefined}
          data-night={isStudio ? night : undefined}
          aria-label={copy.windowLabel}
          role="dialog"
        >
          <header data-agent-part="header" className="relative shrink-0 overflow-hidden border-b border-violet-200/60 bg-[#f7f5fc] px-3 py-3 md:px-4">
            <span data-agent-part="stripe" className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-violet-400" />
            <span data-agent-part="header-glow" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[#eef7f5] opacity-70" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                  <AgentSprite state={loading ? "thinking" : "curious"} />
                </span>
                <div className="min-w-0">
                  <p data-agent-part="eyebrow" className="text-[9px] font-semibold uppercase text-violet-600/70">
                    {isStudio ? "STUDIO COMPANION" : copy.eyebrow}
                  </p>
                  <p data-agent-part="name" className="mt-0.5 truncate font-display text-sm font-[620] leading-6 text-stone-950 md:text-base">
                    {profile.agentName}
                  </p>
                  <p data-agent-part="capability" className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-4 text-stone-600" role="status">
                    <span data-agent-part="status-dot" data-error={lastMessage?.error || undefined} className={`h-1.5 w-1.5 shrink-0 rounded-full ${lastMessage?.error ? "bg-amber-500" : "bg-violet-400"}`} />
                    <span className="truncate">{status}</span>
                  </p>
                </div>
              </div>

              <div data-agent-part="controls" className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={onMinimize}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-200/70 bg-white/75 text-stone-500 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                  aria-label={copy.minimizeLabel}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-200/70 bg-white/75 text-stone-500 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
                  aria-label={copy.closeLabel}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div ref={scrollRef} data-agent-part="messages" className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 md:px-5" role="log" aria-label={locale === "zh" ? "对话记录" : "Conversation"} aria-live="polite">
            {messages.map((message, index) => {
              const suggestions =
                index === 0 && !hasConversation
                  ? quickQuestions
                  : message.role === "assistant" && index === messages.length - 1
                    ? message.followups ?? []
                    : [];

              return (
                <div key={`${message.role}-${index}`} data-agent-part="message" data-message-role={message.role}>
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    locale={locale}
                    mode={message.mode}
                    fallback={message.fallback}
                    error={message.error}
                    sources={message.sources}
                    sections={message.sections}
                    actions={message.actions}
                    copiedActionId={copiedActionId}
                    onAction={handleAgentAction}
                  />
                  {message.error && index === messages.length - 1 && messages[index - 1]?.role === "user" ? (
                    <button type="button" disabled={loading} onClick={() => void submitQuestion(messages[index - 1].content, index)} className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-3 text-xs font-medium text-violet-700 hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 disabled:opacity-50">
                      <RotateCcw className="h-3.5 w-3.5" />{copy.retry}
                    </button>
                  ) : null}
                  {suggestions.length ? (
                  <div data-agent-part="suggestions" data-variant={index === 0 ? "starter" : "followup"} className="mt-3">
                    {index === 0 ? (
                      <p data-agent-part="starter-title" className="mb-2 text-[10px] font-semibold uppercase text-stone-400">
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
              <div data-agent-part="thinking"><AgentThinking phase={thinkingPhase} locale={locale} /></div>
            ) : null}
          </div>

          <form
            data-agent-part="composer"
            className="shrink-0 border-t border-violet-200/60 bg-[#fbfaff] px-4 py-3.5 md:px-5"
            onSubmit={(event) => {
              event.preventDefault();
              void submitQuestion(input);
            }}
          >
            <div data-agent-part="helper" className="mb-2 flex min-h-5 items-center justify-between gap-2 text-[10px] text-stone-500">
              <span>{copy.helper}</span>
              {hasConversation ? <button type="button" onClick={resetConversation} className="inline-flex shrink-0 items-center gap-1 rounded py-1 text-violet-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500" aria-label={copy.clearLabel}><RotateCcw className="h-3 w-3" />{locale === "zh" ? "新对话" : "New chat"}</button> : null}
              {remaining < 100 ? <span>{remaining}</span> : null}
            </div>
            <div data-agent-part="input-shell" className="flex items-end gap-2 rounded-lg border border-violet-200/70 bg-white p-1.5 transition focus-within:border-violet-400 focus-within:shadow-[0_8px_24px_rgba(70,55,120,0.08)]">
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
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) {
                    event.preventDefault();
                    if (canSend) {
                      void submitQuestion(input);
                    }
                  }
                }}
                rows={1}
                aria-label={copy.inputLabel}
                maxLength={MAX_INPUT_LENGTH}
                placeholder={copy.placeholder}
                className="min-h-[44px] min-w-0 flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-6 text-stone-800 outline-none placeholder:text-stone-400 md:text-sm"
              />
              <button
                data-agent-part="send"
                type={loading ? "button" : "submit"}
                disabled={!loading && !canSend}
                onClick={loading ? () => { cancelRequest(); setMessages((current) => [...current, { role: "assistant", content: copy.cancelled, error: true }]); } : undefined}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-violet-600 text-white shadow-[0_8px_20px_rgba(109,91,208,0.2)] transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-200 disabled:shadow-none"
                aria-label={loading ? copy.stopLabel : copy.sendLabel}
                title={loading ? copy.stopLabel : copy.sendLabel}
              >
                {loading ? <Square className="h-3.5 w-3.5" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );

  return mounted ? createPortal(dialog, document.body) : null;
}
