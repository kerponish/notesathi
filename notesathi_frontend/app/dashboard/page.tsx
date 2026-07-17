import Link from "next/link";
import { getUserData } from "@/lib/cookies";
import { getAllNotes } from "@/lib/api/notes";
import { Note } from "@/lib/types/note";
import NoteCard from "./_components/NoteCard";

export default async function DashboardPage() {
  const user = await getUserData();
  const name = user?.fullname || user?.email || "there";

  let notes: Note[] = [];
  try {
    const result = await getAllNotes();
    notes = result?.data ?? [];
  } catch {
    notes = [];
  }

  const recentUploads = notes.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600 px-8 py-10">
        <h1 className="text-3xl font-bold text-white">Welcome back, {name}!</h1>
        <p className="mt-2 text-sm text-violet-100">
          Here&apos;s what&apos;s happening with your notes today.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Uploads</h2>
          <Link
            href="/dashboard/browse"
            className="text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            See all
          </Link>
        </div>

        {recentUploads.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            No notes have been shared yet.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {recentUploads.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
