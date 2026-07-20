import { getAllNotes } from "@/lib/api/notes";
import { getAllSubjects } from "@/lib/api/subjects";
import { Note } from "@/lib/types/note";
import { Subject } from "@/lib/types/subject";
import CategoriesView from "./_components/CategoriesView";

export default async function CategoriesPage() {
  let notes: Note[] = [];
  try {
    const result = await getAllNotes();
    notes = result?.data ?? [];
  } catch {
    notes = [];
  }

  let subjects: Subject[] = [];
  try {
    const result = await getAllSubjects();
    subjects = result?.data ?? [];
  } catch {
    subjects = [];
  }

  return <CategoriesView notes={notes} subjects={subjects} />;
}
