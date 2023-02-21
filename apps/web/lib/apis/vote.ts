import { CategoryNameType } from "types/vote";
import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { Vote } from "types/vote";
import apiClient from "./apiClient";

export interface GetVoteListRequest {
  page: number;
  size: number;
  sortBy: string;
  category?: CategoryNameType | null;
}
interface GetVoteListResponse {
  voteSlice: {
    content: Vote[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
  };
}
interface GetVoteListResponse {
  voteSlice: {
    content: Vote[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
  };
}

export const getVoteListAPI = async ({ page, size, sortBy, category }: GetVoteListRequest) => {
  const response = await apiClient.get<GetVoteListResponse>("api/votes", {
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

export const modifyVoteAPI = async (body: ModifyVoteRequest, voteId: number) => {
  const response = await apiClient.patch(`api/votes/${voteId}`, body);
  return response.data;
};

interface TempVote {}

interface GetVoteByIdResponst {
  user: {
    userImage: string;
    userGender: string;
    userAge: number;
    userMbti: string;
    nickName: null;
  };
  nickName: null;
  voteCreatedDate: Date;
  category: null;
  title: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
  titleA: string;
  titleB: string;
  description: null;
}
export const getVoteByIdAPI = async (id: number) => {
  const response = await axios.get<GetVoteByIdResponst>(`${SERVER_URL}api/votes/${id}`);
  return response.data;
};
