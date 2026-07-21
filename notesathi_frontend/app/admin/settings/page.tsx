import { handleUserDetails } from "@/lib/actions/auth-action";
import ProfileSettingsForm from "./_components/ProfileSettingsForm";
import PasswordSettingsForm from "./_components/PasswordSettingsForm";

export default async function AdminSettingsPage() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }

  const user = userDetails.data;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your admin account.</p>
      </div>

      <ProfileSettingsForm user={user} />

      {user.provider !== "google" && <PasswordSettingsForm />}
    </div>
  );
}
