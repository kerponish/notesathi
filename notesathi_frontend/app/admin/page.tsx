import Link from "next/link";
import { Users, ShieldCheck, FileText, BookOpen } from "lucide-react";

import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { handleGetAllNotes } from "@/lib/actions/admin/note-action";
import AdminUserDonutChart from "./_components/AdminUserDonutChart";

export default async function AdminDashboardPage() {
  const [usersResult, notesResult] = await Promise.all([
    handleGetAllUsers({ page: 1, limit: 1000 }),
    handleGetAllNotes({ page: 1, limit: 1 }),
  ]);

  const users = usersResult.success ? usersResult.data || [] : [];
  const totalUsers = usersResult.success ? usersResult.pagination?.total ?? users.length : 0;
  const totalAdmins = users.filter((user: any) => user.role === "admin").length;
  const totalNotes = notesResult.success ? notesResult.pagination?.total ?? 0 : 0;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-[#246BFD] to-[#1D4ED8]",
    },
    {
      title: "Total Admin",
      value: totalAdmins,
      icon: ShieldCheck,
      color: "from-[#6D5EF9] to-[#4338CA]",
    },
    {
      title: "Total Notes",
      value: totalNotes,
      icon: BookOpen,
      color: "from-[#06B6D4] to-[#0891B2]",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1100px] space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-gray-500">Monitor Notesathi at a glance.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`rounded-lg bg-gradient-to-r ${card.color} p-6 text-white shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">{card.title}</p>
                  <h2 className="mt-3 text-4xl font-bold tracking-tight">{card.value}</h2>
                </div>
                <div className="rounded-full bg-white/15 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-bold text-gray-900">Admin vs Users</h3>
          <div className="mt-6">
            <AdminUserDonutChart adminCount={totalAdmins} userCount={Math.max(totalUsers - totalAdmins, 0)} />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-bold text-gray-900">Quick Views</h3>
          <div className="mt-6 space-y-4">
            <Link
              href="/admin/users"
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-[#246BFD]/40 hover:bg-blue-50/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#246BFD]">
                <Users size={20} />
              </div>
              <span className="flex-1 rounded-md bg-[#246BFD] px-5 py-2.5 text-center font-semibold text-white">
                Manage Users
              </span>
            </Link>

            <Link
              href="/admin/notes"
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-[#246BFD]/40 hover:bg-blue-50/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#246BFD]">
                <FileText size={20} />
              </div>
              <span className="flex-1 rounded-md bg-[#246BFD] px-5 py-2.5 text-center font-semibold text-white">
                Manage Notes
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
