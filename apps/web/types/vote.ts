import { PostVotingRequest } from "lib/apis/vote";

// @Todo ui타입과 api타입을 분리해야할 것 같다. null값 땜시
export type CategoryNameType = "FOODS" | "CAREER" | "LOVE" | "FASHION" | "INTEREST" | "NULL";

export type Direction = "left" | "right";

export type ActiveType = "active" | "inactive" | null;

export type GenderType = "FEMALE" | "MALE" | null;
export interface Writer {
  imageUrl: string;
  nickname: string;
  userid: number;
}
export interface Vote {
  titleA: string;
  titleB: string;
  voteId: number;
  detail: string;
  category: CategoryNameType | null;
  title: string;
  writer: Writer;
  filteredAge: string | null;
  filteredGender: GenderType | null;
  filteredMbti: string | null;
  modifiedDate: string;
  countVoted: number;
  imageA: string | null;
  imageB: string | null;
}

export interface MyPageVote extends Vote {
  countComment: number;
}

export type AorB = "A" | "B";

export type Voting = PostVotingRequest;

export type SortOption = "ByTime" | "ByPoular";
