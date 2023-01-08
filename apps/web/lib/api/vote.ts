import apiClient from "./apiClient";

export interface postVoteRequest {
  userId: number;
  title: string;
  detail: string;
  category: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
}

export const postVoteAPI = async (body: postVoteRequest) => {
  const response = await apiClient.post("api/vote/createVote", body);
  return response.data;
};