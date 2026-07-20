import { getUserData } from "@/lib/cookies";
import { getAllNotes } from "@/lib/api/notes";
import { Note } from "@/lib/types/note";
import NoteCard from "../_components/NoteCard";

export default async function MyNotesPage() {
  const user = await getUserData();

  let notes: Note[] = [];
  try {
    const result = await getAllNotes();
    notes = (result?.data ?? []).filter(
      (n: Note) => n.createdBy?._id === user?._id,
    );
  } catch {
    notes = [];
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Notes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Notes you&apos;ve uploaded to Notesathi.
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          You haven&apos;t uploaded any notes yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} manageable />
          ))}
        </div>
      )}
    </div>
  );
}
