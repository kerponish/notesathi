import axiosInstance from "./axios_instance";
import { API } from "./endpoints";

export const getAllSubjects = async () => {
  try {
    const response = await axiosInstance.get(API.SUBJECT.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch subjects");
  }
};
