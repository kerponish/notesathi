"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { User, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";

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

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 pl-11 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

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

        <div className="relative">
          <User
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            {...register("fullname")}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            {...register("email")}
            placeholder="john@gmail.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Role
        </label>

        <div className="relative">
          <ShieldCheck
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            {...register("role")}
            className={`${inputClass} appearance-none`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
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
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
