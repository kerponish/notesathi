import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      {/* Heading */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Details</h1>

          <p className="text-slate-500 mt-1">View complete information.</p>
        </div>

        <Link
          href="/admin/users"
          className="rounded-xl bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
        >
          Back
        </Link>
      </div>

      {/* Card */}

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar */}

          <div className="flex justify-center">
            {user.profilePicture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.profilePicture}`}
                alt={user.fullname
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
                width={180}
                height={180}
                className="rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-slate-200 text-5xl font-bold text-slate-500">
                {user.fullname?.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}

          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Full Name</p>

              <h2 className="text-xl font-semibold">{user.fullname}</h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>

              <h2 className="text-xl font-semibold">{user.email}</h2>
            </div>

            <div>
              <p className="text-sm text-slate-500">Role</p>

              <span
                className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">Joined</p>

              <h2 className="text-xl font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-4">
        <Link
          href={`/admin/users/${user._id}/edit`}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Edit User
        </Link>

        <Link
          href="/admin/users"
          className="rounded-xl border px-6 py-3 hover:bg-gray-100"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
