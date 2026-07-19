import axiosInstance from "./axios_instance";
import { API } from "./endpoints";

export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get(API.NOTIFICATION.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch notifications",
    );
  }
};

export const markNotificationRead = async (id: string) => {
  try {
    const response = await axiosInstance.patch(API.NOTIFICATION.MARK_READ(id));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update notification",
    );
  }
};

export const markAllNotificationsRead = async () => {
  try {
    const response = await axiosInstance.patch(API.NOTIFICATION.MARK_ALL_READ);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to update notifications",
    );
  }
};
