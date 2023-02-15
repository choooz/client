import { CategoryNameType } from "types/vote";
import apiClient from "./apiClient";

export interface GetVoteListRequest {
  page: number;
  size: number;
  sortBy: string;
  category?: CategoryNameType | null;
}

export const getVoteListAPI = async ({ page, size, sortBy, category }: GetVoteListRequest) => {
  const response = await apiClient.get("api/votes", {
    params: {
      page,
      size,
      sortBy,
      category,
    },
  });

  return response.data.voteSlice;
};

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
