"use client";

import { ArrowUpRight } from "lucide-react";

type SuggestedQuestionsProps = {
  questions: readonly string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
  variant?: "starter" | "followup";
};

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
  variant = "starter"
}: SuggestedQuestionsProps) {
  return (
    <div
      className={
        variant === "starter"
          ? "space-y-1 rounded-lg border border-violet-200/60 bg-[#f7f5fc] p-1"
          : "flex flex-wrap gap-x-4 gap-y-2"
      }
    >
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className={
            variant === "starter"
              ? "flex w-full items-center justify-between gap-3 rounded-md px-3.5 py-2.5 text-left text-xs leading-5 text-stone-600 transition hover:bg-white hover:text-stone-950 hover:shadow-[0_6px_18px_rgba(78,64,130,0.07)] disabled:cursor-not-allowed disabled:opacity-50"
              : "border-b border-transparent py-0.5 text-left text-xs leading-5 text-stone-500 transition hover:border-violet-400 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          <span>{variant === "followup" ? `↳ ${question}` : question}</span>
          {variant === "starter" ? (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-violet-400" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
