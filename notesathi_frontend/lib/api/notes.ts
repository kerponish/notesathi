import axiosInstance from "./axios_instance";
import { API } from "./endpoints";

export const getAllNotes = async () => {
  try {
    const response = await axiosInstance.get(API.NOTE.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch notes");
  }
};

export const createNote = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(API.NOTE.CREATE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to create note");
  }
};

export const searchNotes = async (query: string) => {
  try {
    const response = await axiosInstance.get(API.NOTE.SEARCH, {
      params: { q: query },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to search notes");
  }
};

export const getNoteById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.NOTE.GET_BY_ID(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch note");
  }
};

export const toggleLike = async (id: string) => {
  try {
    const response = await axiosInstance.post(API.NOTE.LIKE(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update like");
  }
};

export const updateNote = async (
  id: string,
  data: { title?: string; description?: string; subjectId?: string; classLevel?: string },
) => {
  try {
    const response = await axiosInstance.put(API.NOTE.UPDATE(id), data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update note");
  }
};

export const deleteNote = async (id: string) => {
  try {
    const response = await axiosInstance.delete(API.NOTE.DELETE(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to delete note");
  }
};
