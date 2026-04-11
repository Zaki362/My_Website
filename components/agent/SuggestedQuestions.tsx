"use client";

type SuggestedQuestionsProps = {
  questions: readonly string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false
}: SuggestedQuestionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-xs text-slate-200/78 transition hover:border-sky-200/22 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:shrink"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
