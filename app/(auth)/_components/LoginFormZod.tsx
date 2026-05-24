"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./schema";

export default function LoginFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "default@gmail.com",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    alert("Submitted data: " + data.email + ", " + data.password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label> Email :</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span> {errors.email.message}</span>}
        </div>
        <div>
          <label> password :</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span> {errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          loin
        </button>
      </form>
    </div>
  );
}
