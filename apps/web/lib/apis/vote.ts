import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { Vote } from "types/vote";
import apiClient from "./apiClient";

interface GetVoteListRequest {
  page: number;
  size: number;
  sortBy: string;
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

export const getVoteListAPI = async ({ page, size, sortBy }: GetVoteListRequest) => {
  const response = await apiClient.get<GetVoteListResponse>("api/votes", {
    params: {
      page,
      size,
      sortBy,
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
