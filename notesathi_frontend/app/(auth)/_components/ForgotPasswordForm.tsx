"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ForgotPasswordFormData, forgotPasswordSchema } from "./schema";
import { handleForgotPassword } from "@/lib/actions/auth-action";

export default function ForgotPasswordForm() {
  const router = useRouter();

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
    // Always proceed the same way regardless of whether the email is
    // registered — avoids leaking which emails have accounts.
    router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
  };

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
        {isSubmitting ? "Sending..." : "Send Reset Code"}
      </button>
    </form>
  );
}
