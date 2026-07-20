"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "./schema";
import { handleForgotPassword } from "@/lib/actions/auth-action";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await handleForgotPassword(data.email);
    // Always show the same confirmation, regardless of whether the email
    // is registered — avoids leaking which emails have accounts.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="font-semibold text-gray-900">Check your email</p>
        <p className="mt-2 text-sm text-gray-500">
          If an account exists for that email, we&apos;ve sent a link to reset
          your password. It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-[#5B4DFF] focus:ring-2 focus:ring-[#5B4DFF]"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-[#5B4DFF] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
