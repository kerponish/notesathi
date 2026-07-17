"use server";
import { createNote, toggleLike } from "@/lib/api/notes";

export const handleCreateNote = async (formData: FormData) => {
  try {
    const result = await createNote(formData);
    if (result.success) {
      return { success: true, message: "Note published", data: result.data };
    }
    return { success: false, message: result.message || "Failed to publish note" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to publish note" };
  }
};

export const handleToggleLike = async (id: string) => {
  try {
    const result = await toggleLike(id);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message || "Failed to update like" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update like" };
  }
};
