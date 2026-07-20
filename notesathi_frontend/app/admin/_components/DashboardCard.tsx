import { Users, ShieldCheck, UserPlus, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  total: number;
  admins: number;
  users: number;
}

export default function DashboardCards({ total, admins, users }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Total */}

      <div className="rounded-lg bg-blue-600 p-6 text-white shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-90">Total Users</p>

            <h2 className="mt-3 text-4xl font-bold">{total}</h2>
          </div>

          <Users size={38} />
        </div>
      </div>

      {/* Admin */}

      <div className="rounded-lg bg-blue-500 p-6 text-white shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-90">Admins</p>

            <h2 className="mt-3 text-4xl font-bold">{admins}</h2>
          </div>

          <ShieldCheck size={38} />
        </div>
      </div>

      {/* Users */}

      <div className="rounded-lg bg-blue-400 p-6 text-white shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-90">Users</p>

            <h2 className="mt-3 text-4xl font-bold">{users}</h2>
          </div>

          <UserPlus size={38} />
        </div>
      </div>

      {/* Create */}

      <Link
        href="/admin/users/create"
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-white p-6 transition hover:bg-blue-50"
      >
        <Plus className="mb-2 text-blue-600" size={40} />

        <p className="font-semibold text-blue-700">Create User</p>
      </Link>
    </div>
  );
}
