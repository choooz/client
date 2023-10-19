import { authHttpFetch, commonHttpFetch } from 'src/modules/httpFetch';
import { VoteSortType } from 'src/types/common';
import { CommonVoteListResponse, Content } from 'src/types/vote';

import { baseApi } from './http/base';
import { http } from './http/http';

export interface GetVoteListRequest {
  keyword?: string;
  sortBy: VoteSortType;
  page: number;
  size: number;
}

/**
 * @TODO 숫자 제거 필요
 */
interface GetVoteListResponse {
  content: Content[];
  first: boolean;
  last: boolean;
  numberOfElements: 10;
  size: 10;
  empty: boolean;
}

export const getVoteListAPI = async ({
  page,
  size,
  sortBy,
  keyword,
}: GetVoteListRequest) => {
  const response = await baseApi.get<GetVoteListResponse>('api/votes', {
    params: {
      page,
      size,
      sortBy,
      keyword,
    },
  });
  return response.data;
};

export const getVoteListV2API = async ({
  page,
  size,
  sortBy,
  keyword,
}: GetVoteListRequest) => {
  const response = await commonHttpFetch(
    `api/votes/v2?page=${page}&size=${size}&sortBy=${sortBy}&keyword=${
      keyword ?? ''
    }`,
  );
  const data = await response.json();
  return data as GetVoteListResponse;
};

export interface GetVoteByIdResponse {
  createdAt: string;
  voteId: number;
  title: string;
  detail: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
  votedCount: number;
  voteType: string;
  imageA: string;
  imageB: string;
  titleA: string;
  titleB: string;
  region: string;
  postedUserAge: string | null;
  postedUserAlcoholLimit: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  postedUserGender: '' | '';
  postedUserId: number;
  postedUserImageUrl: null;
  postedUserMbti: string | null;
  postedUserNickname: string;
  drinkAId: number;
  drinkBId: number;
}

export const getVoteByVoteIdAPI = async (voteId: number) => {
  const response = await baseApi.get<GetVoteByIdResponse>(
    `api/votes/${voteId}`,
  );
  return response.data;
};

// export const getVoteByVoteIdAPI = async (voteId: number) => {
//   const response = await fetch(`${SERVER_URL}api/votes/${voteId}`, {});
//   const voteInfo = await response.json();
//   return voteInfo.data;
// };

interface ModifyNormalVoteRequest {
  title: string;
  detail: string;
  titleA: string;
  titleB: string;
  voteId: number;
}

export const modifyNormalVoteAPI = async (params: ModifyNormalVoteRequest) => {
  const response = await authHttpFetch(`api/votes/${params.voteId}/normal`, {
    method: 'PUT',
    body: JSON.stringify({
      title: params.title,
      detail: params.detail,
      titleA: params.titleA,
      titleB: params.titleB,
    }),
  });
  const res = await response.json();
  return res.data;
};

interface ModifyDrinkVoteRequest {
  title: string;
  detail: string;
  drinkAId: number;
  drinkBId: number;
  voteId: number;
}

export const modifyDrinkVoteAPI = async (params: ModifyDrinkVoteRequest) => {
  const response = await authHttpFetch(`api/votes/${params.voteId}/drink`, {
    method: 'PUT',
    body: JSON.stringify({
      title: params.title,
      detail: params.detail,
      drinkAId: params.drinkAId,
      drinkBId: params.drinkBId,
    }),
  });
  const res = await response.json();
  return res.data;
};

export interface PostNormalVoteRequest {
  title: string;
  detail: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
}

export const postNormalVoteAPI = async (voteInfo: PostNormalVoteRequest) => {
  const response = await http.post('api/votes/normal', voteInfo);
  return response.data;
};
// export const postNormalVoteAPI = async (voteInfo: PostNormalVoteRequest) => {
//   const response = await fetch(`${SERVER_URL}api/votes/normal`, {
//     method: "POST",
//     body: JSON.stringify({
//       voteInfo,
//     }),
//   });
//   const res = await response.json();
//   return res.data;
// };

export interface PostDrinkVoteRequest {
  title: string;
  detail: string;
  drinkAId: number;
  drinkBId: number;
}

export const postDrinkVoteAPI = async (voteInfo: PostDrinkVoteRequest) => {
  const response = await http.post('api/votes/drink', voteInfo);
  return response.data;
};

export interface GetVoteDrinkListRequest {
  page: number;
  size: number;
  keyword?: string;
  region?: string;
  sortBy: string;
}

export interface GetVotetDrinkListResponse {
  voteSlice: CommonVoteListResponse;
}

export const getVoteDrinkList = async (params: GetVoteDrinkListRequest) => {
  const response = await baseApi.get<GetVotetDrinkListResponse>(
    'api/votes/drinks',
    {
      params: {
        ...params,
      },
    },
  );
  return response.data.voteSlice;
};

export const postExecuteVote = async (
  voteId: number,
  body: { choice: 'A' | 'B' | null },
) => {
  const response = await http.post(`api/votes/${voteId}/vote`, body);
  return response.data;
};

export type AorB = 'A' | 'B';
interface GetVotingCheckResponse {
  userChoice: AorB | null;
  voted: boolean;
}

export const getVotingCheck = async (voteId: number) => {
  const response = await http.get<GetVotingCheckResponse>(
    `api/votes/${voteId}/voted`,
  );
  return response.data;
};

export const deleteVote = async (voteId: number) => {
  const response = await http.delete(`api/votes/${voteId}/`);
  return response.data;
};
