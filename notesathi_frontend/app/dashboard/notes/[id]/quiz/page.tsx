import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { getNoteById } from "@/lib/api/notes";
import { generateQuiz } from "@/lib/api/quiz";
import { QuizQuestion } from "@/lib/types/quiz";
import QuizRunner from "./_components/QuizRunner";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let note;
  try {
    const result = await getNoteById(id);
    note = result?.data;
  } catch {
    note = null;
  }

  if (!note) {
    notFound();
  }

  let questions: QuizQuestion[] = [];
  let error = "";
  try {
    const result = await generateQuiz(id);
    questions = result?.data ?? [];
    if (questions.length === 0) {
      error = "Couldn't generate any questions for this note.";
    }
  } catch (e: any) {
    error = e?.message || "Failed to generate quiz";
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-lg font-bold text-slate-900">Quiz unavailable</h1>
        <p className="max-w-sm text-sm text-slate-500">{error}</p>
        <Link
          href={`/dashboard/notes/${id}`}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to note
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href={`/dashboard/notes/${id}`}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to note
      </Link>

      <QuizRunner noteTitle={note.title} questions={questions} />
    </div>
  );
}
