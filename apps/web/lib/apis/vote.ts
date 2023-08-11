import { AorB, CategoryNameType } from "types/vote";
import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { Vote } from "types/vote";
import apiClient from "lib/apis/apiClient";

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

export const getVoteListAPI = async ({ page, size, sortBy, category }: GetVoteListRequest) => {
  const response = await axios.get<GetVoteListResponse>(`${SERVER_URL}api/votes`, {
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
  category: CategoryNameType | null;
  titleA: string;
  titleB: string;
}

export type ModifyVote = ModifyVoteRequest;

export const modifyVoteAPI = async (body: ModifyVoteRequest, voteId: number) => {
  const response = await apiClient.patch(`api/votes/${voteId}`, body);
  return response.data;
};

export const deleteVoteAPI = async (voteId: number) => {
  const response = await apiClient.delete(`api/votes/${voteId}`);
  return response.data;
};

interface GetVoteByIdResponse {
  writer: {
    userImage: string | null;
    userGender: string;
    userAge: number;
    userMbti: string;
    nickName: null;
  };
  voteCreatedDate: string;
  category: null;
  title: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
  titleA: string;
  titleB: string;
  description: string;
}
export const getVoteByIdAPI = async (id: number) => {
  const response = await axios.get<GetVoteByIdResponse>(`${SERVER_URL}api/votes/${id}`);
  return response.data;
};
export interface PostVotingRequest {
  choice: AorB | null;
}

export const getVoteCountById = async (voteId: number) => {
  const response = await apiClient.get(`api/vote/${voteId}/total-statistics`);
  return response.data;
};

interface GetVoteStatisticsResponse {
  message: string;
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
  voteId: number;
}

export const getStatisticsById = async (voteId: number) => {
  const response = await axios.get<GetVoteStatisticsResponse>(
    `${SERVER_URL}api/vote/${voteId}/select-statistics`,
  );
  return response.data;
};

export interface GetSearchVoteListRequest {
  keyword: string;
  page: number;
  size: number;
  sortBy: string;
  category?: CategoryNameType | null;
}

export const getSearchVoteListAPI = async ({
  keyword,
  page,
  size,
  sortBy,
  category,
}: GetSearchVoteListRequest) => {
  const response = await axios.get(`${SERVER_URL}api/votes/search`, {
    params: {
      keyword,
      sortBy,
      page,
      size,
      category,
    },
  });
  return response.data.voteSlice;
};
export const getFilterdStatisticsById = async (
  voteId: number,
  gender: string,
  mbti: string,
  age: string,
) => {
  const response = await axios.get<GetVoteStatisticsResponse>(
    `${SERVER_URL}api/vote/${voteId}/select-statistics`,
    {
      params: {
        gender,
        mbti,
        age,
      },
    },
  );
  return response.data;
};

interface GetSearchRecommendationRequest {
  keyword: string;
  category?: CategoryNameType | null;
}

export const getSearchRecommendationAPI = async ({
  keyword,
  category,
}: GetSearchRecommendationRequest) => {
  const response = await axios.get(`${SERVER_URL}api/votes/recommend`, {
    params: {
      keyword,
      category,
    },
  });
  return response.data;
};

export const postBookmarkAPI = async (voteId: number) => {
  const response = await apiClient.post(`api/votes/${voteId}/bookmark`, { voteId });
  return response.data;
};

interface GetBookmarkResponse {
  bookmarked: boolean;
}

export const getBookMarkCheckAPI = async (voteId: number) => {
  const response = await apiClient.get<GetBookmarkResponse>(`api/votes/${voteId}/bookmark`);
  return response.data;
};
