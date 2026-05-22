"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "./schema";

export default function RegisterFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "default@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    alert("Submitted data: " + data.email + ", " + data.password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label> Email :</label>
          <input
            type="email"
            {...register("email", { required: "email is required" })}
          />
          {errors.email && <span> {errors.email.message}</span>}
        </div>
        <div>
          <label> password :</label>
          <input
            type="password"
            {...register("password", { required: "pw is required" })}
          />
          {errors.password && <span> {errors.password.message}</span>}
        </div>
        <div>
          <label> confirm password :</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "confirm pw is same as pw",
            })}
          />
          {errors.confirmPassword && (
            <span> {errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          register
        </button>
      </form>
    </div>
  );
}
