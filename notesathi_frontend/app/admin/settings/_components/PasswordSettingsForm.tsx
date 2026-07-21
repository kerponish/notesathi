"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Lock, Loader2 } from "lucide-react";

import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from "@/app/dashboard/_components/schema";
import { handleUpdatePassword } from "@/lib/actions/auth-action";

export default function PasswordSettingsForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const onSubmit = (data: UpdatePasswordFormData) => {
    startTransition(async () => {
      const result = await handleUpdatePassword(data);

      if (result.success) {
        toast.success(result.message || "Password updated successfully");
        reset();
      } else {
        toast.error(result.message || "Failed to update password");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gray-200 bg-white p-6"
    >
      <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
      <p className="mt-1 text-sm text-gray-500">Choose a strong password you don&apos;t use elsewhere.</p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Current Password</label>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" {...register("currentPassword")} placeholder="********" className={inputClass} />
        </div>
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">New Password</label>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" {...register("newPassword")} placeholder="********" className={inputClass} />
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Confirm New Password</label>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" {...register("confirmPassword")} placeholder="********" className={inputClass} />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-md bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
