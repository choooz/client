import { CommonVoteListResponse } from "src/types/vote";
import { http } from "./http/http";

interface GetMyVoteListRequest {
  page: number;
  size: number;
}

export const getMyParticipatedVoteList = async (params: GetMyVoteListRequest) => {
  const response = await http.get<CommonVoteListResponse>("api/votes/participated", {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const getMyCreatedVoteList = async (params: GetMyVoteListRequest) => {
  const response = await http.get<CommonVoteListResponse>("api/votes/my-vote", {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const getMyBookmarkedVoteList = async (params: GetMyVoteListRequest) => {
  const response = await http.get<CommonVoteListResponse>("api/votes/bookmarked", {
    params: {
      ...params,
    },
  });
  return response.data;
};

interface GetVoteCountResponse {
  countCreatedVote: number;
  countParticipatedVote: number;
  countBookmarkedVote: number;
}

export const getVoteCount = async () => {
  const response = await http.get<GetVoteCountResponse>("api/user/mypage/count");
  return response.data;
};

export interface UpdateUserInfoRequest {
  imageUrl: string;
  nickname: string;
  alcoholLimit: string;
  mbti: string;
}
export const updateUserInfoAPI = async (updateUserInfoRequest: UpdateUserInfoRequest) => {
  const response = await http.put("api/users", updateUserInfoRequest);
  return response.data;
};
