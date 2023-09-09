import { http } from "./http";

export interface postVoteResponse {
  imageUrl: string;
  message: string;
}

export const uploadImageAPI = async (body: FormData) => {
  const response = await http.post<postVoteResponse>("api/images", body);
  // return response.data;
  return response.data;
};
