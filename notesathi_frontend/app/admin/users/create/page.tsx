import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import UserForm from "../_components/UserForm";

export default function CreateUserPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#246BFD]">
            <UserPlus size={26} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Create New User
            </h1>
            <p className="mt-1 text-gray-500">
              Add a new user to the Notesathi platform.
            </p>
          </div>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <UserForm />
      </div>
    </div>
  );
}
