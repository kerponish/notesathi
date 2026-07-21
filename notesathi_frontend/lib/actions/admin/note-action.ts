"use server";
import { revalidatePath } from "next/cache";
import {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteById,
  updateNote,
} from "@/lib/api/admin/note";

export const handleCreateNote = async (data: FormData) => {
  try {
    const result = await createNote(data);
    if (result.success) {
      revalidatePath("/admin/notes");
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Note creation failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Note creation failed",
    };
  }
};

export const handleGetAllNotes = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const currentPage = page ? (page > 0 ? page : 1) : 1;
    const currentLimit = limit ? (limit > 0 ? limit : 10) : 10;
    const currentSearch = search || "";
    const result = await getAllNotes({
      page: currentPage,
      limit: currentLimit,
      search: currentSearch,
    });
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.meta,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch notes",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch notes",
    };
  }
};

export const handleGetNoteById = async (id: string) => {
  try {
    const result = await getNoteById(id);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch note",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch note",
    };
  }
};

export const handleUpdateNote = async (id: string, data: FormData) => {
  try {
    const result = await updateNote(id, data);
    if (result.success) {
      revalidatePath("/admin/notes");
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to update note",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update note",
    };
  }
};

export const handleDeleteNote = async (id: string) => {
  try {
    const result = await deleteNote(id);
    if (result.success) {
      revalidatePath("/admin/notes");
      return { success: true, message: result.message };
    }
    return {
      success: false,
      message: result.message || "Failed to delete note",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete note",
    };
  }
};
