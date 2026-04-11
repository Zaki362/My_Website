"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, X } from "lucide-react";
import { agentProfile } from "@/data/knowledge-base/profile";
import { ChatMessage } from "@/components/agent/ChatMessage";
import { SuggestedQuestions } from "@/components/agent/SuggestedQuestions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AgentDialogProps = {
  open: boolean;
  onClose: () => void;
};

const MAX_INPUT_LENGTH = 500;

export function AgentDialog({ open, onClose }: AgentDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: agentProfile.welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = input.trim().length > 0 && input.trim().length <= MAX_INPUT_LENGTH && !loading;
  const remaining = MAX_INPUT_LENGTH - input.trim().length;

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

  const emptyTips = useMemo(() => agentProfile.suggestedQuestions, []);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="关闭资料助手"
            className="fixed inset-0 z-[70] bg-slate-950/46 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 top-20 z-[80] flex h-[min(78vh,720px)] w-[min(460px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,31,0.96),rgba(7,10,22,0.9))] shadow-[0_24px_80px_rgba(4,9,22,0.58)] backdrop-blur-2xl md:right-6 md:top-24 max-md:inset-x-3 max-md:top-auto max-md:bottom-3 max-md:h-[78vh] max-md:w-auto max-md:rounded-[1.6rem]"
          >
            <div className="border-b border-white/8 px-4 py-4 md:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg text-white">{agentProfile.agentName}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">{agentProfile.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="border-b border-white/8 px-4 py-3 md:px-6 md:py-4">
              <SuggestedQuestions questions={emptyTips} onSelect={submitQuestion} disabled={loading} />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
              {messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} role={message.role} content={message.content} />
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-300/78">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    正在整理相关资料片段...
                  </div>
                </div>
              ) : null}
            </div>

            <form
              className="border-t border-white/8 px-4 py-4 md:px-6"
              onSubmit={(event) => {
                event.preventDefault();
                void submitQuestion(input);
              }}
            >
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                <span>仅回答与郑国华个人资料相关的问题</span>
                <span>{remaining}</span>
              </div>
              <div className="flex items-end gap-2 md:gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))}
                  rows={1}
                  placeholder="例如：他在百度主要做了哪些工作？"
                  className="min-h-[52px] flex-1 resize-none rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-200/28 focus:bg-white/[0.06] md:rounded-[1.4rem]"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-sky-200/16 bg-sky-300/[0.1] text-sky-100 transition hover:border-sky-200/28 hover:bg-sky-300/[0.16] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {error ? <p className="mt-3 text-xs text-rose-300/78">{error}</p> : null}
            </form>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
