import { notFound, redirect } from "next/navigation";
import { getUserData } from "@/lib/cookies";
import { getNoteById } from "@/lib/api/notes";
import { getAllSubjects } from "@/lib/api/subjects";
import { Subject } from "@/lib/types/subject";
import EditNoteForm from "./_components/EditNoteForm";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserData();

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

  if (note.createdBy?._id !== user?._id) {
    redirect(`/dashboard/notes/${id}`);
  }

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
        <h1 className="text-xl font-bold text-slate-900">Edit Note</h1>
        <p className="mt-1 text-sm text-slate-500">Update your note&apos;s details.</p>
      </div>

      <EditNoteForm note={note} subjects={subjects} />
    </div>
  );
}
