import { handleGetAllUsers } from "@/lib/actions/admin/user-action";

import DashboardCards from "../_components/DashboardCard";
import StatsCards from "./_components/StatsCard";
import CreateUserCard from "./_components/CreateuserCard";
import SearchBar from "./_components/SearchBar";
import UsersTable from "./_components/UserTable";
import Pagination from "./_components/Pagination";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 10));
  const search = params.search?.trim() || "";

  let result;
  try {
    result = await handleGetAllUsers({
      page,
      limit,
      search,
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">User Overview</h1>
          <p className="text-gray-500">Manage all registered users.</p>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to load users. Please try again later.
        </div>
      </div>
    );
  }

  const users = result.data || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Overview</h1>
          <p className="text-gray-500">Manage all registered users.</p>
        </div>

        <SearchBar />
      </div>

      <StatsCards users={users} />

      <CreateUserCard />

      <UsersTable users={users} />

      <Pagination meta={result.pagination} />
    </div>
  );
}
