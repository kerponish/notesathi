"use server"; // server side api call
import {
  register,
  login,
  whoami,
  updateProfile,
  updatePassword,
  updateSettings,
  forgotPassword,
  resetPassword,
} from "@/lib/api/auth";
import {
  LoginFormData,
  RegisterFormData,
} from "@/app/(auth)/_components/schema";
import { clearAuthCookies, setTokenCookie, storeUserData } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { UpdatePasswordFormData } from "@/app/dashboard/_components/schema";
import { redirect, RedirectType } from "next/navigation";

export const handleRegisterUser = async (data: RegisterFormData) => {
  try {
    // how to handle data from component and how to send to component
    const result = await register(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      console.log("Registration failed:", result.message);
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }
  } catch (error: Error | any) {
    return { success: false, message: error?.message || "Registration failed" };
  }
};
export const handleLoginUser = async (data: LoginFormData) => {
  try {
    // how to handle data from component and how to send to component
    const result = await login(data);
    // set cookie
    const user = result.data.user;
    const token = result.data.token;
    await setTokenCookie(token);
    await storeUserData(user);

    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return { success: false, message: result.message || "Login failed" };
    }
  } catch (error: Error | any) {
    return { success: false, message: error?.message || "Login failed" };
  }
};

export const handleUserDetails = async () => {
  try {
    const result = await whoami();
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch user details",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch user details",
    };
  }
};

export const handleUpdateProfile = async (formData: FormData) => {
  try {
    const result = await updateProfile(formData);

    if (result.success) {
      // save updated user if returned by API
      if (result.data?.user) {
        await storeUserData(result.data.user);
      } else if (result.data) {
        await storeUserData(result.data);
      }

      revalidatePath("/dashboard/profile");

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update profile",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update profile",
    };
  }
};

export const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
  try {
    const result = await updatePassword(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to update password",
      };
    }
  } catch (error: Error | any) {
    return {
      success: false,
      message: error?.message || "Failed to update password",
    };
  }
};

export const handleUpdateSettings = async (data: {
  notificationsEnabled?: boolean;
  language?: "en" | "ne";
}) => {
  try {
    const result = await updateSettings(data);
    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update settings",
      };
    }

    if (result.data) {
      await storeUserData(result.data);
    }

    revalidatePath("/dashboard/settings");

    return { success: true, message: result.message, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update settings",
    };
  }
};

export const handleForgotPassword = async (email: string) => {
  try {
    const result = await forgotPassword(email);
    return {
      success: !!result.success,
      message: result.message || "If that email is registered, a reset link has been sent.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to send reset email",
    };
  }
};

export const handleResetPassword = async (data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const result = await resetPassword(data);
    return {
      success: !!result.success,
      message: result.message || "Password reset successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to reset password",
    };
  }
};

export const handleLogout = async () => {
  // Clear cookies or tokens here
  // donot use try/catch, redirect is treated as an exception in nextjs server component
  await clearAuthCookies();
  redirect("/login", RedirectType.replace);
};
