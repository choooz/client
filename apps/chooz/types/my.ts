import { Vote } from "./vote";

export interface MyVote extends Vote {
  countComment: number;
}

export type MyVoteListType = "created" | "participated" | "bookmarked";
