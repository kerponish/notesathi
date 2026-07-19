import { handleUserDetails } from "@/lib/actions/auth-action";
import SettingsView from "./_components/SettingsView";

export default async function SettingsPage() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }

  return <SettingsView user={userDetails.data} />;
}
