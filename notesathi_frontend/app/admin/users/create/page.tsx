import Link from "next/link";
import UserForm from "../_components/UserForm";

export default function CreateUserPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Create New User</h1>

          <p className="mt-2 text-gray-500">
            Add a new user to the Notesathi platform.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium hover:bg-gray-50"
        >
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <UserForm />
      </div>
    </div>
  );
}
