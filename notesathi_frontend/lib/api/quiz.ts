import axiosInstance from "./axios_instance";
import { API } from "./endpoints";

export const generateQuiz = async (noteId: string) => {
  try {
    const response = await axiosInstance.get(API.NOTE.QUIZ(noteId));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to generate quiz");
  }
};
