import axiosInstance from "./axios_instance";
import { API } from "./endpoints";

export const getComments = async (noteId: string) => {
  try {
    const response = await axiosInstance.get(API.NOTE.COMMENTS(noteId));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch comments");
  }
};

export const addComment = async (noteId: string, text: string) => {
  try {
    const response = await axiosInstance.post(API.NOTE.COMMENTS(noteId), { text });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to add comment");
  }
};
