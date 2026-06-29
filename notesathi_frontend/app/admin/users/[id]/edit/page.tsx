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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Edit User</h1>

          <p className="mt-2 text-gray-500">Update user information.</p>
        </div>

        <Link
          href="/admin/users"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium hover:bg-gray-50"
        >
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <UserFormEdit user={result.data} />
      </div>
    </div>
  );
}
