"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { QuizQuestion } from "@/lib/types/quiz";

export default function QuizRunner({
  noteTitle,
  questions,
}: {
  noteTitle: string;
  questions: QuizQuestion[];
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const selected = answers[index];

  const selectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const retake = () => {
    setAnswers(Array(questions.length).fill(null));
    setIndex(0);
    setSubmitted(false);
  };

  if (submitted) {
    const score = answers.filter(
      (answer, i) => answer === questions[i].correctIndex,
    ).length;
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Quiz Results
          </p>
          <p className="mt-2 text-4xl font-bold text-violet-600">
            {score}/{questions.length}
          </p>
          <p className="mt-1 text-sm text-slate-500">{percent}% correct</p>
          <button
            onClick={retake}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-violet-600 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctIndex;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      correct ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
                    }`}
                  >
                    {correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {i + 1}. {q.question}
                    </p>
                    <div className="mt-2 flex flex-col gap-1">
                      {q.options.map((option, optionIndex) => {
                        const isCorrectOption = optionIndex === q.correctIndex;
                        const isSelectedOption = optionIndex === answers[i];
                        return (
                          <p
                            key={optionIndex}
                            className={`rounded-md px-3 py-1.5 text-sm ${
                              isCorrectOption
                                ? "bg-emerald-50 text-emerald-700"
                                : isSelectedOption
                                  ? "bg-red-50 text-red-600"
                                  : "text-slate-500"
                            }`}
                          >
                            {option}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          {noteTitle}
        </p>
        <p className="text-xs font-medium text-slate-400">
          Question {index + 1} of {questions.length}
        </p>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-violet-600 transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">
        {question.question}
      </h2>

      <div className="mt-5 flex flex-col gap-2">
        {question.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => selectOption(optionIndex)}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
              selected === optionIndex
                ? "border-violet-400 bg-violet-50 text-violet-700"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex h-10 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40"
        >
          Previous
        </button>

        {isLast ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={selected === null}
            className="flex h-10 items-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={selected === null}
            className="flex h-10 items-center rounded-lg bg-violet-600 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
