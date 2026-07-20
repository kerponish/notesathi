"use server";
import { revalidatePath } from "next/cache";
import { createNote, deleteNote, toggleLike, updateNote } from "@/lib/api/notes";

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

export const handleUpdateNote = async (
  id: string,
  data: { title?: string; description?: string; subjectId?: string; classLevel?: string },
) => {
  try {
    const result = await updateNote(id, data);
    if (result.success) {
      revalidatePath("/dashboard/notes");
      revalidatePath(`/dashboard/notes/${id}`);
      return { success: true, message: "Note updated", data: result.data };
    }
    return { success: false, message: result.message || "Failed to update note" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update note" };
  }
};

export const handleDeleteNote = async (id: string) => {
  try {
    const result = await deleteNote(id);
    if (result.success) {
      revalidatePath("/dashboard/notes");
      return { success: true, message: result.message || "Note deleted" };
    }
    return { success: false, message: result.message || "Failed to delete note" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete note" };
  }
};
