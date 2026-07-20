"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ResetPasswordFormData, resetPasswordSchema } from "./schema";
import { handleResetPassword } from "@/lib/actions/auth-action";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (!token) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-600">Invalid reset link</p>
        <p className="mt-2 text-sm text-gray-500">
          This link is missing its reset token.{" "}
          <Link href="/forgot-password" className="font-semibold text-[#5B4DFF] hover:underline">
            Request a new one
          </Link>
          .
        </p>
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError("");
    const result = await handleResetPassword({ token, ...data });
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          NEW PASSWORD
        </label>
        <input
          type="password"
          placeholder="********"
          {...register("newPassword")}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-[#5B4DFF] focus:ring-2 focus:ring-[#5B4DFF]"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          CONFIRM NEW PASSWORD
        </label>
        <input
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-[#5B4DFF] focus:ring-2 focus:ring-[#5B4DFF]"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-[#5B4DFF] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
