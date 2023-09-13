import { SERVER_URL } from "lib/constants";
import { baseApi } from "./http/base";

export interface GetVoteListRequest {
  keyword?: string;
  sortBy: "ByTime" | "ByPopularity";
  page: number;
  size: number;
}

interface Vote {
  voteId: number;
  postedUserId: number;
  title: string;
  detail: string;
  filteredGender: null;
  filteredAge: null;
  filteredMbti: null;
  votedCount: number;
  voteType: string;
  imageA: string;
  imageB: string;
  titleA: string;
  titleB: string;
  region: string;
}
interface GetVoteListResponse {
  content: Vote[];
  first: boolean;
  last: boolean;
  numberOfElements: 10;
  size: 10;
  empty: boolean;
}

export const getVoteListAPI = async ({ page, size, sortBy, keyword }: GetVoteListRequest) => {
  const response = await baseApi.get<GetVoteListResponse>("api/votes", {
    params: {
      page,
      size,
      sortBy,
      keyword,
    },
  });
  return response.data;
};

interface Writer {
  userImage: string | null;
  userGender: string;
  userAge: number;
  userMbti: string;
  nickName: string;
}

export interface GetVoteByIdResponse {
  writer: Writer;
  voteCreatedDate: Date;
  title: string;
  imageA: string;
  imageB: string;
  titleA: string;
  titleB: string;
  description: string;
}

export const getVoteByVoteIdAPI = async (voteId: number) => {
  const response = await fetch(`${SERVER_URL}api/votes/${voteId}`, {});
  const voteInfo = await response.json();
  return voteInfo.data;
};

interface ModifyVoteRequest {
  title: string;
  detail: string;
  titleA: string;
  titleB: string;
}

export const modifyVoteAPI = async (newVoteInfo: ModifyVoteRequest, voteId: number) => {
  const response = await fetch(`${SERVER_URL}api/votes/${voteId}`, {
    method: "PUT",
    body: JSON.stringify({
      newVoteInfo,
    }),
  });
  const voteInfo = await response.json();
  return voteInfo.data;
};

export interface PostVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  drinkAId: string;
  drinkBId: string;
}

export interface PostNormalVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
}

export const postNormalVoteAPI = async (voteInfo: PostNormalVoteRequest) => {
  const response = await fetch(`${SERVER_URL}api/votes/normal`, {
    method: "POST",
    body: JSON.stringify({
      voteInfo,
    }),
  });
  const res = await response.json();
  return res.data;
};

export interface PostDrinkVoteRequest {
  title: string;
  drinkAId: string;
  drinkBId: string;
}

export const postDrinkVoteAPI = async (voteInfo: PostDrinkVoteRequest) => {
  const response = await fetch(`${SERVER_URL}api/votes/drink`, {
    method: "POST",
    body: JSON.stringify({
      voteInfo,
    }),
  });
  const res = await response.json();
  return res.data;
};

export type SortBy = "ByTime" | "ByName" | "ByPopularity";

export interface GetVoteDrinkListRequest {
  page: number;
  size: number;
  keyword?: string;
  region?: string;
  sortBy: SortBy;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Content {
  voteId: number;
  postedUserId: number;
  title: string;
  detail?: any;
  filteredGender?: any;
  filteredAge?: any;
  filteredMbti?: any;
  votedCount?: any;
  voteType: string;
  imageA: string;
  imageB: string;
  titleA: string;
  titleB: string;
  region: string;
}

interface GetVotetDrinkListResponse {
  voteSlice: {
    content: Content[];
    pageable: Pageable;
    sort: Sort;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    empty: boolean;
  };
}

export const getVoteDrinkList = async (params: GetVoteDrinkListRequest) => {
  const response = await baseApi.get<GetVotetDrinkListResponse>("api/votes/drinks", {
    params: {
      ...params,
    },
  });
  return response.data.voteSlice;
};
