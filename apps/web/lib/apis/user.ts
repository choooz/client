import { GetUserInfoResponse } from "types/user";
import { CategoryNameType, MyPageVote } from "types/vote";
import apiClient from "./apiClient";

interface AddInfoRequest {
  mbti: string;
  age: number;
  gender: string | null;
}

export const addInfoAPI = async (addInfoRequest: AddInfoRequest) => {
  const response = await apiClient.patch("api/user/addInfo", addInfoRequest);
  return response.data;
};
interface AddInterestCategoryRequest {
  categoryLists: CategoryNameType[];
}

export const addInterestCategoryAPI = async (
  addInterestCategoryRequest: AddInterestCategoryRequest,
) => {
  const response = await apiClient.patch(
    "api/user/addInterestCategory",
    addInterestCategoryRequest,
  );
  return response.data;
};

export const getUserInfo = async () => {
  const response = await apiClient.get<GetUserInfoResponse>("api/oauth/login");
  return response.data;
};

export type VoteListType = "created" | "participated" | "bookmarked";

export interface GetMyPageVoteListRequest {
  page: number;
  size: number;
  voteType: VoteListType;
}
interface GetMyPageVoteListResponse {
  content: MyPageVote[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
}

// @Note api 경로에 따라 분리하는 게 맞나, 도메인에 따라 분리하는 게 맞나
export const getMyPageVoteList = async ({ page, size, voteType }: GetMyPageVoteListRequest) => {
  const response = await apiClient.get<GetMyPageVoteListResponse>("api/user/mypage", {
    params: {
      page,
      size,
      voteType,
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
  const response = await apiClient.get<GetVoteCountResponse>("api/user/mypage/count");
  return response.data;
};

interface UpdateUserInfoRequest {
  nickname: string;
  // image: string;
  mbti: string;
  categoryList: string[];
}

export const updateUserInfo = async (updateUserInfoRequest: UpdateUserInfoRequest) => {
  const response = await apiClient.patch("api/user/mypage/edit", updateUserInfoRequest);
  return response.data;
};
