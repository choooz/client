import { CommentResponse, PostCommnetRequest } from "lib/apis/comments";
import { Agetype, MBTIType } from "./user";
import { GenderType } from "./vote";

export type Comment = CommentResponse;
export type CommentForm = PostCommnetRequest;

export interface CommentFilter {
  age: Agetype;
  mbti: string | null;
  gender: GenderType;
  sortBy: string;
}
