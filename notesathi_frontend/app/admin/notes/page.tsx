import { handleGetAllNotes } from "@/lib/actions/admin/note-action";

import StatsCards from "./_components/StatsCard";
import CreateNoteCard from "./_components/CreateNoteCard";
import SearchBar from "./_components/SearchBar";
import NotesTable from "./_components/NotesTable";
import Pagination from "./_components/Pagination";

interface NotesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 10));
  const search = params.search?.trim() || "";

  let result;
  try {
    result = await handleGetAllNotes({
      page,
      limit,
      search,
    });
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Note Overview</h1>
          <p className="text-gray-500">Manage all uploaded notes.</p>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to load notes. Please try again later.
        </div>
      </div>
    );
  }

  const notes = result.data || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Note Overview</h1>
          <p className="text-gray-500">Manage all uploaded notes.</p>
        </div>

        <SearchBar />
      </div>

      <StatsCards notes={notes} />

      <CreateNoteCard />

      <NotesTable notes={notes} />

      <Pagination meta={result.pagination} />
    </div>
  );
}
