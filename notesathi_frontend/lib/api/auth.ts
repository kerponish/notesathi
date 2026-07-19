import axiosInstance from "./axios_instance";
import { API } from "./endpoints";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";
import { UpdatePasswordFormData } from "@/app/dashboard/_components/schema";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await axiosInstance.post(API.AUTH.REGISTER, data);
    console.log("API RESPONSE:", response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Registration failed");
  }
};
export const login = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data);

    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const whoami = async () => {
  try {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch user details",
    );
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.patch(API.AUTH.PROFILE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update profile",
    );
  }
};

export const updatePassword = async (data: UpdatePasswordFormData) => {
  try {
    const response = await axiosInstance.patch(API.AUTH.UPDATE_PASSWORD, data);

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update password",
    );
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(API.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to send reset email",
    );
  }
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axiosInstance.post(API.AUTH.RESET_PASSWORD, data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to reset password",
    );
  }
};

export const updateSettings = async (data: {
  notificationsEnabled?: boolean;
  language?: "en" | "ne";
}) => {
  try {
    const response = await axiosInstance.patch(API.AUTH.PROFILE, data);

    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update settings",
    );
  }
};
