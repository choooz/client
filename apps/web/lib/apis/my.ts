import apiClient from "lib/apis/apiClient";
import { MyPageVote } from "types/my";

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
