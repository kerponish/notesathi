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
      fullname: "",
      email: "default@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    alert(`Submitted data: ${data.fullname}, ${data.email}, ${data.password}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Fullname :</label>
          <input type="text" {...register("fullname")} />
          {errors.fullname && <span>{errors.fullname.message}</span>}
        </div>

        <div>
          <label>Email :</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password :</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label>Confirm Password :</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
}
