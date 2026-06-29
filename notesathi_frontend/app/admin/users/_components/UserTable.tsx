"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import DeleteUserModal from "./DeleteUserModal";

interface Props {
  users: any[];
}

export default function UsersTable({ users }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleDelete = () => {
    if (!selectedUser) return;

    startTransition(async () => {
      const result = await handleDeleteUser(selectedUser._id);

      if (result.success) {
        toast.success("User deleted successfully");

        setOpen(false);
        setSelectedUser(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-[#246BFD] text-white">
            <tr>
              <th className="p-5 text-left">User</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b transition hover:bg-blue-50"
                >
                  {/* User */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#246BFD] font-bold text-white">
                        {user.fullname
                          ?.split(" ")
                          .map((x: string) => x[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.fullname}
                        </p>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td>
                    <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/users/${user._id}`}
                        className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/admin/users/${user._id}/edit`}
                        className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpen(true);
                        }}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteUserModal
        open={open}
        loading={isPending}
        user={selectedUser}
        onClose={() => {
          setOpen(false);
          setSelectedUser(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
}
