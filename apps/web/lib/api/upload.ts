import apiClient from "./apiClient";

export interface postVoteResponse {
  imageUrl: string;
  message: string;
}

export const uploadProfileImageAPI = async (body: FormData) => {
  const response = await apiClient.post<postVoteResponse>("api/image/upload", body);
  return response.data;
};
