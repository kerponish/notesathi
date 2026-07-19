"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UpdatePasswordFormData, updatePasswordSchema } from "./schema";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { handleUpdatePassword } from "@/lib/actions/auth-action";

export default function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await handleUpdatePassword(data);
        if (!result.success) {
          throw new Error(result.message || "Failed to update password");
        }
        toast.success("Password updated successfully");
        reset();
        router.push("/dashboard/settings");
      } catch (error: any) {
        toast.error(error?.message);
        setError(error?.message || "Failed to update password");
      }
    });
  };

  const fieldClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
  const labelClass =
    "mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500";
  const errClass = "mt-1 block text-xs text-red-500";

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6">
      <h1 className="text-lg font-bold text-slate-900">Change Password</h1>
      <p className="mt-1 text-sm text-slate-500">
        Choose a strong password you don&apos;t use elsewhere.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className={labelClass}>Current Password</label>
          <input
            type="password"
            {...register("currentPassword")}
            placeholder="••••••••"
            className={fieldClass}
          />
          {errors.currentPassword && (
            <span className={errClass}>{errors.currentPassword.message}</span>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            placeholder="••••••••"
            className={fieldClass}
          />
          {errors.newPassword && (
            <span className={errClass}>{errors.newPassword.message}</span>
          )}
        </div>

        <div className="mb-6">
          <label className={labelClass}>Confirm New Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="••••••••"
            className={fieldClass}
          />
          {errors.confirmPassword && (
            <span className={errClass}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-violet-600 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
