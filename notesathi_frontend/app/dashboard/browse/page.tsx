import { getAllNotes, searchNotes } from "@/lib/api/notes";
import { Note } from "@/lib/types/note";
import NoteCard from "../_components/NoteCard";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  let notes: Note[] = [];
  try {
    const result = q ? await searchNotes(q) : await getAllNotes();
    notes = result?.data ?? [];
  } catch {
    notes = [];
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Browse Notes</h1>
        <p className="mt-1 text-sm text-slate-500">
          {q ? `Results for "${q}"` : "All notes shared by the community."}
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          {q ? `No notes found for "${q}".` : "No notes have been shared yet."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
