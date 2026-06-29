"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { handleUpdateUser } from "@/lib/actions/admin/user-action";

interface Props {
  user: any;
}

interface FormData {
  fullname: string;
  email: string;
  role: string;
  profilePicture?: FileList;
}

export default function UserFormEdit({ user }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [preview, setPreview] = useState<string | null>(
    user.profilePicture
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.profilePicture}`
      : null,
  );

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("role", data.role);

    if (data.profilePicture?.[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    startTransition(async () => {
      const result = await handleUpdateUser(user._id, formData);

      if (result.success) {
        toast.success("User updated successfully");
        router.push("/admin/users");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Avatar */}

      <div className="md:col-span-2 flex justify-center">
        {preview ? (
          <Image
            src={preview}
            alt="Profile"
            width={140}
            height={140}
            className="rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-200 text-5xl font-bold text-slate-600">
            {user.fullname.charAt(0)}
          </div>
        )}
      </div>

      {/* Upload */}

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">
          Profile Picture
        </label>

        <input
          type="file"
          accept="image/*"
          {...register("profilePicture")}
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="block w-full rounded-xl border p-3"
        />
      </div>

      {/* Full Name */}

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">Full Name</label>

        <input
          {...register("fullname")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Email */}

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">Email</label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Role */}

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">Role</label>

        <select
          {...register("role")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Buttons */}

      <div className="md:col-span-2 mt-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
          className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {isPending ? "Updating..." : "Update User"}
        </button>
      </div>
    </form>
  );
}
