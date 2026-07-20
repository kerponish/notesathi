import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Shield, Calendar, ArrowLeft, Pencil } from "lucide-react";

import { handleGetUserById } from "@/lib/actions/admin/user-action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;

  const result = await handleGetUserById(id);

  if (!result.success) {
    notFound();
  }

  const user = result.data;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            User Profile
          </h1>

          <p className="mt-2 text-gray-600">
            View complete information about this user.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Main Card */}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Blue Header */}

        <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

        {/* Avatar */}

        <div className="-mt-16 flex flex-col items-center">
          {user.profilePicture ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.profilePicture}`}
              alt={user.fullname}
              width={120}
              height={120}
              className="rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-5xl font-bold text-white shadow-lg">
              {user.fullname.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            {user.fullname}
          </h2>

          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info */}

        <div className="grid gap-6 p-10 md:grid-cols-2">
          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span className="font-semibold text-gray-700">Email</span>
            </div>

            <p className="text-lg text-gray-900">{user.email}</p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Shield className="text-indigo-600" />
              <span className="font-semibold text-gray-700">Role</span>
            </div>

            <span
              className={`rounded-md px-4 py-2 text-sm font-bold ${
                user.role === "admin"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user.role}
            </span>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Calendar className="text-green-600" />
              <span className="font-semibold text-gray-700">Joined Date</span>
            </div>

            <p className="text-lg text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-6">
            <div className="mb-2 font-semibold text-gray-700">Status</div>

            <span className="rounded-md bg-green-100 px-4 py-2 font-semibold text-green-700">
              Active
            </span>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 border-t bg-gray-50 p-6">
          <Link
            href="/admin/users"
            className="rounded-md border px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back
          </Link>

          <Link
            href={`/admin/users/${user._id}/edit`}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit User
          </Link>
        </div>
      </div>
    </div>
  );
}
