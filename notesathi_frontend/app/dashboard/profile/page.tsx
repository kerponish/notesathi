import Link from "next/link";
import { Upload } from "lucide-react";
import { handleUserDetails } from "@/lib/actions/auth-action";
import { getAllNotes } from "@/lib/api/notes";
import { Note } from "@/lib/types/note";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileStats from "./_components/ProfileStats";
import ProfileNoteCard from "./_components/ProfileNoteCard";

export default async function ProfilePage() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }
  const user = userDetails.data;

  let notes: Note[] = [];
  try {
    const result = await getAllNotes();
    notes = (result?.data ?? []).filter(
      (n: Note) => n.createdBy?._id === user._id,
    );
  } catch {
    notes = [];
  }

  const commentsTotal = notes.reduce((sum, n) => sum + (n.commentsCount ?? 0), 0);
  const likesTotal = notes.reduce((sum, n) => sum + (n.likes?.length ?? 0), 0);
  const uploadedNotes = notes.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader fullname={user.fullname} profilePicture={user.profilePicture} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ProfileStats comments={commentsTotal} likes={likesTotal} shared={notes.length} />

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Uploaded Notes</h2>
            <Link
              href="/dashboard/notes"
              className="text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              View All
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-6">
            {uploadedNotes.map((note) => (
              <ProfileNoteCard key={note._id} note={note} />
            ))}

            <Link
              href="/dashboard/notes/new"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-6 text-center transition-colors hover:border-violet-300 hover:bg-violet-50/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                <Upload className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Upload New Note
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Share your knowledge with others
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
