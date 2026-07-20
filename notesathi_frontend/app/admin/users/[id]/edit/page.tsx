import Link from "next/link";
import { notFound } from "next/navigation";

import UserFormEdit from "../../_components/UserFormEdit";
import { handleGetUserById } from "@/lib/actions/admin/user-action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;

  const result = await handleGetUserById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit User</h1>

          <p className="mt-2 text-sm text-slate-500">
            Update user information.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back
        </Link>
      </div>

      {/* Form Card */}
      <div className="rounded-lg border border-slate-200 bg-white p-10 shadow-sm">
        <UserFormEdit user={result.data} />
      </div>
    </div>
  );
}
