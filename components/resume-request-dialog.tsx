"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Mail, X } from "lucide-react";
import { cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

type ResumeRequestDialogProps = {
  open: boolean;
  onClose: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ResumeRequestDialog({ open, onClose }: ResumeRequestDialogProps) {
  const reduceMotion = useReducedMotion();
  const { locale, t } = useLanguage();
  const emailId = useId();
  const reasonId = useId();
  const copy = t.resumeRequest;
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setMessage("");
    }
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const normalizedReason = reason.trim();

    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage(copy.errors.email);
      return;
    }

    if (normalizedReason.length < 4) {
      setStatus("error");
      setMessage(copy.errors.reason);
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/resume-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: normalizedEmail,
          reason: normalizedReason,
          locale
        })
      });

      const result = (await response.json().catch(() => null)) as { code?: string; error?: string } | null;

      if (!response.ok) {
        setStatus("error");
        setMessage(
          result?.code === "EMAIL_NOT_CONFIGURED" || result?.code === "FORMSPREE_NOT_CONFIGURED"
            ? copy.errors.service
            : result?.error ?? copy.errors.generic
        );
        return;
      }

      setStatus("success");
      setMessage(copy.success);
      setEmail("");
      setReason("");
    } catch {
      setStatus("error");
      setMessage(copy.errors.generic);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[90] flex items-center justify-center bg-[#241f1b]/[0.18] px-4 py-8 backdrop-blur-sm"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-request-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label={locale === "zh" ? "关闭弹窗" : "Close dialog"}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-[31rem] overflow-hidden rounded-[1.75rem] border border-[rgba(80,60,40,0.12)] bg-[#fffdfa]/95 p-5 shadow-[0_28px_90px_rgba(60,45,28,0.20)] backdrop-blur-2xl sm:p-6"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24 }}
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(120,90,60,0.12)] bg-[#f7f0e7] text-[#7b6752]">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="resume-request-title" className="font-display text-2xl font-[760] leading-tight text-[#241f1b]">
                    {copy.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#6b625a]">
                    {copy.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-900/10 bg-white/[0.72] text-stone-500 transition hover:bg-white hover:text-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35]"
                aria-label={locale === "zh" ? "关闭" : "Close"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor={emailId} className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {copy.emailLabel}
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-[1.125rem] border border-[rgba(80,60,40,0.12)] bg-white/[0.72] px-4 py-3 shadow-[0_10px_28px_rgba(80,60,40,0.055)]">
                  <Mail className="h-4 w-4 shrink-0 text-[#7b6752]" />
                  <input
                    id={emailId}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={copy.emailPlaceholder}
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#241f1b] outline-none placeholder:text-stone-400"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={reasonId} className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {copy.reasonLabel}
                </label>
                <textarea
                  id={reasonId}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder={copy.reasonPlaceholder}
                  rows={4}
                  maxLength={600}
                  className="mt-2 w-full resize-none rounded-[1.125rem] border border-[rgba(80,60,40,0.12)] bg-white/[0.72] px-4 py-3 text-sm leading-6 text-[#241f1b] shadow-[0_10px_28px_rgba(80,60,40,0.055)] outline-none placeholder:text-stone-400 focus:border-[#d7a45f]/[0.42]"
                />
              </div>

              {message ? (
                <div
                  className={cn(
                    "flex items-start gap-2 rounded-[1rem] px-3.5 py-3 text-sm leading-6",
                    status === "success"
                      ? "border border-emerald-500/15 bg-emerald-50 text-emerald-800"
                      : "border border-rose-500/15 bg-rose-50 text-rose-800"
                  )}
                >
                  {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                  <span>{message}</span>
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[rgba(80,60,40,0.12)] bg-white/[0.72] px-5 text-sm font-semibold text-[#4a423b] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35]"
                >
                  {copy.cancel}
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2b251f] px-5 text-sm font-semibold text-[#fffaf2] shadow-[0_14px_38px_rgba(62,46,31,0.16)] transition hover:-translate-y-0.5 hover:bg-[#211d19] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.45]"
                >
                  {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {status === "submitting" ? copy.submitting : copy.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
