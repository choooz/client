import { Agetype } from "types/user";
import { GenderType } from "types/vote";

export const queryKeys = {
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  MAIN_VOTE_LIST: "mainVoteList" as const,
  VOTE_DETAIL: "voteDetail" as const,
  DETAIL_COMMENT_LIST: "commentByVoteId" as const,
  DETAIL_VOTE_COUNT: "voteCountByVoteId" as const,
  DETAIL_ANALYSIS: "analysisByVoteId" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
  // @note any말고 방법이 있나?
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
};
