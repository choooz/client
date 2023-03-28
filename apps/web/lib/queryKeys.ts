import { Agetype } from "types/user";
import { GenderType } from "types/vote";
import { VoteListType } from "./apis/user";

export const queryKeys = {
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  MAIN_VOTE_LIST: "mainVoteList" as const,
  VOTE_DETAIL: "voteDetail" as const,
  DETAIL_COMMENT_LIST: "commentByVoteId" as const,
  DETAIL_VOTE_COUNT: "voteCountByVoteId" as const,
  DETAIL_ANALYSIS: "analysisByVoteId" as const,
  DETAIL_FILTERED_ANALYSIS: "filteredAnalysisByVoteId" as const,
  VOTING_CHECK: "votingCheck" as const,
  MY_PAGE_VOTE_LIST: "myPageVoteList" as const,
  MY_PAGE_VOTE_COUNT: "myPageVoteCount" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
  // @note any 처리
  voteList: (params: any) => [queryKeys.VOTE_LIST, ...params],
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
  voteDetail: (id: number) => [queryKeys.VOTE_DETAIL, id] as const,
  detailCommentList: (
    id: number,
    age?: Agetype,
    mbti?: string | null,
    gender?: GenderType,
    sortBy?: string,
  ) => [queryKeys.DETAIL_COMMENT_LIST, id, age, mbti, gender, sortBy] as const,
  detailVoteCount: (id: number) => [queryKeys.DETAIL_VOTE_COUNT, id] as const,
  detailAnalysis: (id: number) => [queryKeys.DETAIL_ANALYSIS, id] as const,
  detailFilterdAnalysis: (id: number, mbti: string, gender: string, age: string) =>
    [queryKeys.DETAIL_FILTERED_ANALYSIS, id, mbti, gender, age] as const,
  votingCheck: (id: number) => [queryKeys.VOTING_CHECK, id] as const,
  myPageVoteList: (params: VoteListType) => [queryKeys.MY_PAGE_VOTE_LIST, ...params] as const,
  myPageVoteCount: () => [queryKeys.MY_PAGE_VOTE_COUNT] as const,
};
