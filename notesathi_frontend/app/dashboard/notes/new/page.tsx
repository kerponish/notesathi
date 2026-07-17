import { getAllSubjects } from "@/lib/api/subjects";
import { Subject } from "@/lib/types/subject";
import CreateNoteForm from "./_components/CreateNoteForm";

export default async function NewNotePage() {
  let subjects: Subject[] = [];
  try {
    const result = await getAllSubjects();
    subjects = result?.data ?? [];
  } catch {
    subjects = [];
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Upload a Note</h1>
        <p className="mt-1 text-sm text-slate-500">
          Share your notes with the Notesathi community.
        </p>
      </div>

      <CreateNoteForm subjects={subjects} />
    </div>
  );
}
