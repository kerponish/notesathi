import Link from "next/link";
import { ArrowLeft, FilePlus } from "lucide-react";
import NoteForm from "../_components/NoteForm";
import { getAllSubjects } from "@/lib/api/subjects";
import { Subject } from "@/lib/types/subject";

export default async function CreateNotePage() {
  let subjects: Subject[] = [];
  try {
    const result = await getAllSubjects();
    subjects = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-[#246BFD]">
            <FilePlus size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Create New Note
            </h1>
            <p className="mt-1 text-gray-500">
              Add a new note to the Notesathi platform.
            </p>
          </div>
        </div>

        <Link
          href="/admin/notes"
          className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-10 shadow-sm">
        <NoteForm subjects={subjects} />
      </div>
    </div>
  );
}
