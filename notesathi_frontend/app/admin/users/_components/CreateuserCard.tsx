import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreateUserCard() {
  return (
    <Link href="/admin/users/create">
      <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#246BFD]/30 hover:shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create User</h2>

          <p className="mt-2 text-sm text-gray-600">
            Add a new user to the system.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#246BFD] text-white transition-all duration-300 group-hover:rotate-90 group-hover:scale-110">
          <Plus size={32} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}
