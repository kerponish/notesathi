"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./schema";
import { useRouter } from "next/navigation";

export default function LoginFormZod() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔐 LOGIN + BEARER TOKEN FLOW
  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("http://localhost:8088/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      // ❌ handle backend error
      if (!res.ok) {
        alert(result.message || "Login failed");
        return;
      }

      // 🔥 store bearer token
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // 🚪 redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* EMAIL */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          EMAIL ADDRESS
        </label>

        <input
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          className="
            w-full border border-gray-300 rounded-xl px-4 py-3
            bg-white text-black placeholder:text-gray-400
            outline-none transition
            focus:ring-2 focus:ring-[#5B4DFF] focus:border-[#5B4DFF]
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">
            PASSWORD
          </label>

          <button
            type="button"
            className="text-sm text-[#5B4DFF] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <input
          type="password"
          placeholder="********"
          {...register("password")}
          className="
            w-full border border-gray-300 rounded-xl px-4 py-3
            bg-white text-black placeholder:text-gray-400
            outline-none transition
            focus:ring-2 focus:ring-[#5B4DFF] focus:border-[#5B4DFF]
          "
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full bg-[#5B4DFF] text-white py-3 rounded-xl font-semibold
          hover:opacity-90 transition disabled:opacity-50
        "
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
