import apiClient from "lib/apis/apiClient";
import { MyVote, MyVoteListType } from "types/my";

export interface GetMyVoteListRequest {
  page: number;
  size: number;
  voteType: MyVoteListType;
}

interface GetMyVoteListResponse {
  content: MyVote[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
}

export const getMyVoteList = async ({ page, size, voteType }: GetMyVoteListRequest) => {
  const response = await apiClient.get<GetMyVoteListResponse>("api/user/mypage", {
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
