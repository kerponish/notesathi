"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import Image from "next/image";

import { UpdateProfileFormData, updateProfileSchema } from "./schema";
import { handleUpdateProfile } from "@/lib/actions/auth-action";

export default function UpdateForm({ user }: { user: any }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.fullname?.split(" ")[0] ?? "",
      lastName: user?.fullname?.split(" ").slice(1).join(" ") ?? "",
      email: user?.email ?? "",
    },
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (!file) {
      setPreviewImage(null);
      onChange(undefined);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };

    reader.readAsDataURL(file);

    onChange(file);
  };

  const removeImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onChange?.(undefined);
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append(
          "fullname",
          `${data.firstName} ${data.lastName}`.trim(),
        );

        formData.append("email", data.email);

        if (data.image) {
          formData.append("profilePicture", data.image);
        }

        const result = await handleUpdateProfile(formData);

        console.log(result);
        if (!result.success) {
          throw new Error(result.message || "Failed to update profile");
        }

        if (!result.success) {
          throw new Error(result.message);
        }

        toast.success(result.message || "Profile updated successfully", {
          position: "top-center",
          transition: Slide,
        });

        removeImage();

        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: undefined,
        });

        router.refresh();
      } catch (err: any) {
        console.error(err);

        setError(err.message);

        toast.error(err.message || "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Keep the rest of your JSX exactly the same */}
    </form>
  );
}
