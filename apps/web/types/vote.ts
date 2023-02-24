import { PostVotingRequest } from "lib/apis/vote";

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

export type AorB = "A" | "B";

export type Voting = PostVotingRequest;
