import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreateUserCard() {
  return (
    <Link href="/admin/users/create">
      <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-7 shadow-sm transition-colors duration-200 hover:border-[#246BFD]/40">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create User</h2>

          <p className="mt-2 text-sm text-gray-600">
            Add a new user to the system.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#246BFD] text-white transition-colors duration-200 group-hover:bg-blue-700">
          <Plus size={28} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}
