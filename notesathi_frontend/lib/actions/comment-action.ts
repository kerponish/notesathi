"use server";
import { addComment } from "@/lib/api/comments";

export const handleAddComment = async (noteId: string, text: string) => {
  try {
    const result = await addComment(noteId, text);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message || "Failed to add comment" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to add comment" };
  }
};
