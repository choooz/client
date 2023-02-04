import apiClient from "./apiClient";

export interface PostVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
}

export const postVoteAPI = async (body: PostVoteRequest) => {
  const response = await apiClient.post("api/votes", body);
  return response.data;
};

export interface ModifyVoteRequest {
  title: string;
  detail: string;
  category: string;
  titleA: string;
  titleB: string;
}

export const modifyVoteAPI = async (body: ModifyVoteRequest) => {
  const response = await apiClient.patch("api/votes", body);
  return response.data;
};
