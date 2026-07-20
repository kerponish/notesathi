"use client";

import { useMemo, useState } from "react";
import { Note } from "@/lib/types/note";
import { Subject } from "@/lib/types/subject";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import NoteCard from "../../_components/NoteCard";

const CLASS_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function CategoriesView({
  notes,
  subjects,
}: {
  notes: Note[];
  subjects: Subject[];
}) {
  const { t } = useLanguage();
  const [classLevel, setClassLevel] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const matchesClass = !classLevel || note.classLevel === classLevel;
      const matchesSubject = !subjectId || note.subjectId?._id === subjectId;
      return matchesClass && matchesSubject;
    });
  }, [notes, classLevel, subjectId]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{t("categories.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("categories.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("categories.class")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setClassLevel(null)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                classLevel === null
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("categories.allClasses")}
            </button>
            {CLASS_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setClassLevel(level)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  classLevel === level
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("categories.classPrefix")} {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("categories.subject")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setSubjectId(null)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                subjectId === null
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("categories.allSubjects")}
            </button>
            {subjects.map((subject) => (
              <button
                key={subject._id}
                onClick={() => setSubjectId(subject._id)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  subjectId === subject._id
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          {t("categories.noResults")}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {filtered.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
