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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="rounded-2xl border border-stone-900/10 bg-[#fffdfa]/72 px-3.5 py-2.5 text-left text-xs leading-5 text-stone-600 transition hover:-translate-y-0.5 hover:border-stone-900/16 hover:bg-white hover:text-stone-950 hover:shadow-[0_12px_30px_rgba(79,62,39,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
