"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleGoogleAuth } from "@/lib/actions/auth-action";

export default function GoogleAuthButton() {
  const router = useRouter();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google sign-in failed");
      return;
    }

    const result = await handleGoogleAuth(credentialResponse.credential);

    if (result.success) {
      router.push("/dashboard");
    } else {
      toast.error(result.message || "Google sign-in failed");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => toast.error("Google sign-in failed")}
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
        logo_alignment="center"
      />
    </div>
  );
}
