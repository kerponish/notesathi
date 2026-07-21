import axiosInstance from "../axios_instance";
import { API } from "../endpoints";

export const getAllNotes = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const response = await axiosInstance.get(API.ADMIN.NOTES.GET_ALL, {
      params,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch notes");
  }
};

export const getNoteById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.ADMIN.NOTES.GET_BY_ID(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch note");
  }
};

export const createNote = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(API.ADMIN.NOTES.CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to create note");
  }
};

export const updateNote = async (id: string, data: FormData) => {
  try {
    const response = await axiosInstance.put(API.ADMIN.NOTES.UPDATE(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to update note");
  }
};

export const deleteNote = async (id: string) => {
  try {
    const response = await axiosInstance.delete(API.ADMIN.NOTES.DELETE(id));
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to delete note");
  }
};
