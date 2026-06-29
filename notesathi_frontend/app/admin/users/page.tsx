import { handleGetAllUsers } from "@/lib/actions/admin/user-action";

import DashboardCards from "../_components/DashboardCard";
import StatsCards from "./_components/StatsCard";
import CreateUserCard from "./_components/CreateuserCard";
import SearchBar from "./_components/SearchBar";
import UsersTable from "./_components/UserTable";
import Pagination from "./_components/Pagination";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || "";

  const result = await handleGetAllUsers({
    page,
    limit,
    search,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Overview</h1>

          <p className="text-gray-500">Manage all registered users.</p>
        </div>

        <SearchBar />
      </div>

      <StatsCards users={result.data || []} />

      <CreateUserCard />

      <UsersTable users={result.data || []} />

      <Pagination meta={result.pagination} />
    </div>
  );
}
