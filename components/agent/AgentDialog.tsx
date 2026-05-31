"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Loader2, Mail, Minus, Send, X } from "lucide-react";
import { agentProfile } from "@/data/knowledge-base/profile";
import { contactData } from "@/data/profile";
import { ChatMessage } from "@/components/agent/ChatMessage";
import { SuggestedQuestions } from "@/components/agent/SuggestedQuestions";
import { AgentSprite } from "@/components/agent/AgentSprite";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AgentDialogProps = {
  open: boolean;
  onClose: () => void;
  onMinimize: () => void;
};

const MAX_INPUT_LENGTH = 500;

function shouldShowEmailAction(content: string) {
  return content.includes(contactData.email);
}

function AgentActionBar() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${contactData.email}`;
    }
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2 pl-1">
      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/10 bg-blue-500/[0.065] px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-500/[0.1]"
      >
        {copied ? "已复制邮箱" : "复制邮箱"}
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function AgentDialog({ open, onClose, onMinimize }: AgentDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: agentProfile.welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const reduceMotion = useReducedMotion();

  const canSend = input.trim().length > 0 && input.trim().length <= MAX_INPUT_LENGTH && !loading;
  const remaining = MAX_INPUT_LENGTH - input.trim().length;

  useEffect(() => {
    setMounted(true);
  }, []);

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
          messages: nextMessages
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.reply || "资料助手暂时不可用。");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            typeof data?.reply === "string" && data.reply.trim()
              ? data.reply.trim()
              : "我目前的资料里没有足够信息回答这个问题。你可以改问他的教育、实习、科研或技能相关内容。"
        }
      ]);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "资料助手暂时出现了一点问题。";

      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: message
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickQuestions = useMemo(() => agentProfile.suggestedQuestions, []);

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
          aria-label="国华的 AI 助手聊天窗口"
        >
          <header className="border-b border-stone-900/10 bg-[linear-gradient(135deg,#fffdfa,#f5efe4_52%,#eef5ff)] px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-stone-900/10 bg-white/70 shadow-[0_12px_28px_rgba(79,62,39,0.10)]">
                  <AgentSprite active />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-[620] leading-6 text-stone-950">
                    {agentProfile.agentName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs leading-5 text-stone-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {agentProfile.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={onMinimize}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-900/10 bg-white/55 text-stone-500 transition hover:bg-white hover:text-stone-950"
                  aria-label="最小化 AI 助手"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-900/10 bg-white/55 text-stone-500 transition hover:bg-white hover:text-stone-950"
                  aria-label="关闭 AI 助手"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`}>
                <ChatMessage role={message.role} content={message.content} />
                {message.role === "assistant" && shouldShowEmailAction(message.content) ? <AgentActionBar /> : null}
                {index === 0 ? (
                  <div className="mt-3">
                    <SuggestedQuestions questions={quickQuestions} onSelect={submitQuestion} disabled={loading} />
                  </div>
                ) : null}
              </div>
            ))}

            {loading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-[1.35rem] border border-stone-900/10 bg-[#fffdfa]/86 px-4 py-3 text-sm text-stone-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  正在整理站内资料...
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
              <span>主要回答国华的站内资料问题</span>
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
                placeholder="想了解国华的什么？"
                className="min-h-[48px] flex-1 resize-none rounded-[1.2rem] border border-stone-900/10 bg-white/72 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-blue-500/24 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2933] text-[#fffaf2] shadow-[0_14px_32px_rgba(61,50,38,0.14)] transition hover:bg-[#24222b] disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="发送问题"
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
