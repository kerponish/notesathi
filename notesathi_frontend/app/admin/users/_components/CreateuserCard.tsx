import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreateUserCard() {
  return (
    <Link href="/admin/users/create">
      <div className="flex cursor-pointer items-center justify-between rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
        <div>
          <h2 className="text-lg font-semibold">Create Users</h2>

          <p className="text-sm text-gray-500">
            Add new users into the system.
          </p>
        </div>

        <div className="rounded-full bg-[#246BFD] p-3 text-white">
          <Plus size={26} />
        </div>
      </div>
    </Link>
  );
}
