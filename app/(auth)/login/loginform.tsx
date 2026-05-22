"use client";
import { useForm } from "react-hook-form";
export default function LoginForm() {
  const {
    register, // to implement in input
    handleSubmit, // to implement submission
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "", // states default
      password: "",
    },
  });
  const onSubmit = (data: { email: string; password: string }) => {
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
        <button type="submit" disabled={isSubmitting}>
          loin
        </button>
      </form>
    </div>
  );
}
