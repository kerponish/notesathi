"use server";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/api/notifications";

export const handleGetNotifications = async () => {
  try {
    const result = await getNotifications();
    if (!result.success) {
      return { success: false, message: result.message, data: [], unreadCount: 0 };
    }
    return {
      success: true,
      data: result.data,
      unreadCount: result.unreadCount ?? 0,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch notifications",
      data: [],
      unreadCount: 0,
    };
  }
};

export const handleMarkNotificationRead = async (id: string) => {
  try {
    const result = await markNotificationRead(id);
    return { success: !!result.success };
  } catch {
    return { success: false };
  }
};

export const handleMarkAllNotificationsRead = async () => {
  try {
    const result = await markAllNotificationsRead();
    return { success: !!result.success };
  } catch {
    return { success: false };
  }
};
