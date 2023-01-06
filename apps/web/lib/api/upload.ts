import apiClient from "./apiClient";

export const uploadProfileImageAPI = async (body: FormData) => {
  const response = await apiClient.post("api/image/upload", body);
  return response.data;
};
