"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { User, Mail, ShieldCheck, Loader2, X } from "lucide-react";

import { handleUpdateUser } from "@/lib/actions/admin/user-action";

interface Props {
  user: any;
}

export default function UserFormEdit({ user }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });

  const onSubmit = (data: any) => {
    startTransition(async () => {
      const result = await handleUpdateUser(user._id, data);

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
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl font-semibold text-[#246BFD]">
          {user.fullname?.charAt(0)?.toUpperCase() ?? "U"}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Edit User</h2>
          <p className="text-sm text-slate-500">
            Update details for {user.fullname}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              {...register("fullname", {
                required: "Full name is required",
              })}
              className={`w-full rounded-xl border px-5 py-3.5 pl-12 text-slate-700 outline-none transition focus:border-[#246BFD] focus:ring-4 focus:ring-blue-50 ${
                errors.fullname ? "border-red-300" : "border-slate-300"
              }`}
              placeholder="John Doe"
            />
          </div>

          {errors.fullname && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.fullname.message as string}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full rounded-xl border px-5 py-3.5 pl-12 text-slate-700 outline-none transition focus:border-[#246BFD] focus:ring-4 focus:ring-blue-50 ${
                errors.email ? "border-red-300" : "border-slate-300"
              }`}
              placeholder="john@example.com"
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Role
          </label>

          <div className="relative">
            <ShieldCheck
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              {...register("role")}
              className="w-full appearance-none rounded-xl border border-slate-300 px-5 py-3.5 pl-12 text-slate-700 outline-none transition focus:border-[#246BFD] focus:ring-4 focus:ring-blue-50"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}
