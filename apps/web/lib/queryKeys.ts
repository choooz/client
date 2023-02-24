export const queryKeys = {
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  MAIN_VOTE_LIST: "mainVoteList" as const,
  VOTE_DETAIL: "voteDetail" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
  // @note any말고 방법이 있나?
  voteList: (params: any) => [queryKeys.VOTE_LIST, ...params],
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
  voteDetail: (id: number) => [queryKeys.VOTE_DETAIL, id] as const,
};
