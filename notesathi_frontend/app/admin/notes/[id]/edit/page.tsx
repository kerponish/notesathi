import { notFound } from "next/navigation";
import { handleGetNoteById } from "@/lib/actions/admin/note-action";
import { getAllSubjects } from "@/lib/api/subjects";
import { Subject } from "@/lib/types/subject";
import NoteFormEdit from "../../_components/NoteFormEdit";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditNotePage({ params }: Props) {
  const { id } = await params;

  const result = await handleGetNoteById(id);

  if (!result.success) {
    notFound();
  }

  let subjects: Subject[] = [];
  try {
    const subjectResult = await getAllSubjects();
    subjects = subjectResult?.data || [];
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <NoteFormEdit note={result.data} subjects={subjects} />
    </div>
  );
}
