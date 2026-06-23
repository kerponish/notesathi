"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UpdateProfileFormData, updateProfileSchema } from "./schema";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { Slide, toast } from "react-toastify";
import Image from "next/image";

export default function UpdateForm({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      email: user?.email || "",
      firstName: user?.fullname?.split(" ")[0] || "",
      lastName: user?.fullname?.split(" ")[1] || "",
    },
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }

    onChange(file);
  };

  const removeImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);

    onChange?.(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    console.log("SUBMIT CLICKED", data);
    setError("");

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("email", data.email);

        formData.append(
          "fullname",
          `${data.firstName} ${data.lastName}`.trim(),
        );

        if (data.image) {
          formData.append("profilePicture", data.image);
        }

        const result = await handleUpdateProfile(formData);

        if (result.success) {
          toast.success("Profile updated successfully", {
            position: "top-center",
            transition: Slide,
          });

          router.refresh();

          removeImage();
        } else {
          throw new Error(result.message || "Failed to update profile");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");

        toast.error(err.message);
      }
    });
  };

  const inputClass = `
    h-12 w-full rounded-xl
    border border-gray-200
    bg-gray-50
    px-4
    text-gray-800
    outline-none
    transition
    focus:border-indigo-500
    focus:ring-2
    focus:ring-indigo-200
    `;

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-indigo-50
      via-white
      to-purple-50
      p-5
      "
    >
      <div
        className="
        w-full
        max-w-xl
        rounded-3xl
        bg-white
        p-8
        shadow-xl
        border
        border-gray-100
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-gray-900
          "
        >
          Update Profile
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Update your personal information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div
              className="
              rounded-xl
              bg-red-50
              border
              border-red-200
              p-3
              text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* PROFILE IMAGE */}

          <div
            className="
            flex
            flex-col
            items-center
            "
          >
            <div className="relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="
                    h-32
                    w-32
                    rounded-full
                    object-cover
                    ring-4
                    ring-indigo-100
                    "
                  alt="preview"
                />
              ) : user?.profilePicture ? (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_BASE_URL + user.profilePicture
                  }
                  width={128}
                  height={128}
                  alt="profile"
                  className="
                      h-32
                      w-32
                      rounded-full
                      object-cover
                      ring-4
                      ring-indigo-100
                      "
                />
              ) : (
                <div
                  className="
                      h-32
                      w-32
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-indigo-500
                      to-purple-600
                      text-white
                      text-4xl
                      font-bold
                      "
                >
                  {user?.fullname?.charAt(0)}
                </div>
              )}

              <label
                htmlFor="profilePicture"
                className="
                absolute
                bottom-0
                right-0
                cursor-pointer
                rounded-full
                bg-indigo-600
                p-3
                text-white
                shadow-lg
                hover:bg-indigo-700
                "
              >
                📷
              </label>
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  ref={fileInputRef}
                  id="profilePicture"
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                />
              )}
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* FIRST NAME */}

          <div>
            <label className="block mb-2 font-semibold">First Name</label>

            <input
              {...register("firstName")}
              className={inputClass}
              placeholder="John"
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* LAST NAME */}

          <div>
            <label className="block mb-2 font-semibold">Last Name</label>

            <input
              {...register("lastName")}
              className={inputClass}
              placeholder="Doe"
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* EMAIL */}

          <div>
            <label className="block mb-2 font-semibold">Email</label>

            <input
              type="email"
              {...register("email")}
              className={inputClass}
              placeholder="example@gmail.com"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="
  h-12
  w-full
  rounded-xl
  bg-indigo-600
  text-white
  font-semibold
  hover:bg-indigo-700
  transition
  disabled:opacity-50
  "
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
