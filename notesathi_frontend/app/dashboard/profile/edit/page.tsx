import UpdateForm from "../../_components/UpdateForm";
import { handleUserDetails } from "@/lib/actions/auth-action";

export default async function EditProfilePage() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Edit Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update your photo and personal details.
        </p>
      </div>

      <UpdateForm user={userDetails.data} />
    </div>
  );
}
