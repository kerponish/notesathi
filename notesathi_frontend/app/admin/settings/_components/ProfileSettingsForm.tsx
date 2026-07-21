"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { Camera, User, Mail, Loader2 } from "lucide-react";

import { ProfileSettingsFormData, profileSettingsSchema } from "./schema";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { resolveMediaUrl } from "@/lib/utils/media";

export default function ProfileSettingsForm({ user }: { user: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    resolveMediaUrl(user?.profilePicture) ?? null,
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      fullname: user?.fullname ?? "",
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
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
    onChange(file);
  };

  const initial = (user?.fullname?.[0] || "A").toUpperCase();
  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const onSubmit = (data: ProfileSettingsFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      if (data.image) formData.append("profilePicture", data.image);

      const result = await handleUpdateProfile(formData);

      if (result.success) {
        toast.success(result.message || "Profile updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-gray-200 bg-white p-6"
    >
      <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
      <p className="mt-1 text-sm text-gray-500">Update your photo and personal details.</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          {previewImage ? (
            <Image
              src={previewImage}
              alt=""
              width={72}
              height={72}
              unoptimized
              className="h-18 w-18 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-[#246BFD] text-2xl font-semibold text-white">
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
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#246BFD] text-white shadow-sm transition hover:bg-blue-700"
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
          <p className="text-sm font-semibold text-gray-900">Profile photo</p>
          <p className="text-xs text-gray-400">JPG, PNG or WEBP. Max 5MB.</p>
        </div>
      </div>
      {errors.image && (
        <p className="mt-2 text-xs text-red-500">{errors.image.message}</p>
      )}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
        <div className="relative">
          <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input {...register("fullname")} className={inputClass} placeholder="John Doe" />
        </div>
        {errors.fullname && (
          <p className="mt-1 text-sm text-red-500">{errors.fullname.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
        <div className="relative">
          <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" {...register("email")} className={inputClass} placeholder="john@example.com" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-md bg-[#246BFD] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
