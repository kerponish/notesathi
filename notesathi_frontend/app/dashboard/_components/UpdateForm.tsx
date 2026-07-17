"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";
import Image from "next/image";
import { Camera } from "lucide-react";

import { UpdateProfileFormData, updateProfileSchema } from "./schema";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { resolveMediaUrl } from "@/lib/utils/media";

export default function UpdateForm({ user }: { user: any }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    resolveMediaUrl(user?.profilePicture) ?? null,
  );

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
      setPreviewImage(resolveMediaUrl(user?.profilePicture) ?? null);
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

  const initial = (user?.fullname?.[0] || "U").toUpperCase();

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

        if (!result.success) {
          throw new Error(result.message || "Failed to update profile");
        }

        toast.success(result.message || "Profile updated successfully", {
          position: "top-center",
          transition: Slide,
        });

        router.push("/dashboard/profile");
        router.refresh();
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message || "Something went wrong");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl rounded-2xl border border-slate-100 bg-white p-6"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          {previewImage ? (
            <Image
              src={previewImage}
              alt=""
              width={72}
              height={72}
              unoptimized
              className="h-18 w-18 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-semibold text-white">
              {initial}
            </div>
          )}
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange } }) => (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change photo"
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm transition-colors hover:bg-violet-700"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                />
              </>
            )}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Profile photo</p>
          <p className="text-xs text-slate-400">JPG, PNG or WEBP. Max 5MB.</p>
        </div>
      </div>
      {errors.image && (
        <p className="mt-2 text-xs text-red-500">{errors.image.message}</p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="mt-2 w-full rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-200"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="mt-2 w-full rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-200"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-200"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 items-center rounded-lg bg-violet-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/profile")}
          disabled={isPending}
          className="flex h-11 items-center rounded-lg border border-slate-200 px-6 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
