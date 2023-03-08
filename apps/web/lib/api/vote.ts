import apiClient from "./apiClient";

interface PostVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
}

export type PostVote = PostVoteRequest;

export const postVoteAPI = async (body: PostVoteRequest) => {
  const response = await apiClient.post("api/votes", body);
  return response.data;
};

interface ModifyVoteRequest {
  title: string;
  detail: string;
  category: string;
  titleA: string;
  titleB: string;
}

export type ModifyVote = ModifyVoteRequest;

export const modifyVoteAPI = async (body: ModifyVoteRequest) => {
  const response = await apiClient.patch("api/votes/1", body);
  return response.data;
};
