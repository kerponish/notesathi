import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24 text-center">
      <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <Sparkles className="h-6 w-6" />
      </div>
      <h1 className="text-lg font-bold text-slate-900">Generating your quiz...</h1>
      <p className="max-w-sm text-sm text-slate-500">
        We're putting together 10 questions to test what you know. This can take a
        few seconds.
      </p>
    </div>
  );
}
