import { postDrinkVoteAPI, postNormalVoteAPI } from "lib/apis/vote";
import { DrinkInfo } from "./drink";

type PostNormalVoteRequest = Exclude<Parameters<typeof postNormalVoteAPI>[0], undefined>;
type PostDrinkVoteRequest = Exclude<Parameters<typeof postDrinkVoteAPI>[0], undefined>;
export type PostVoteType = PostNormalVoteRequest & PostDrinkVoteRequest;

/**
 * @TODO 네이밍 변경 필요
 */

export type DrinkInfoType = Pick<DrinkInfo, "id" | "name" | "image">;

export interface Content {
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
  createdAt: Date;
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

export interface CommonVoteListResponse {
  content: Content[];
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}
