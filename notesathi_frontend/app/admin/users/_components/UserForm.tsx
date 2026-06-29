"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTransition } from "react";

import { handleCreateUser } from "@/lib/actions/admin/user-action";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

export default function UserForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await handleCreateUser(data);

      if (result.success) {
        toast.success("User created successfully");
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
      {/* Full Name */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Full Name
        </label>

        <input
          {...register("fullname")}
          placeholder="John Doe"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Email */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="john@gmail.com"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Password
        </label>

        <input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Role
        </label>

        <select
          {...register("role")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-4 md:col-span-2">
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
