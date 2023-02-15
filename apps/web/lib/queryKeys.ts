export const queryKeys = {
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  MAIN_VOTE_LIST: "mainVoteList" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
  voteList: () => [queryKeys.VOTE_LIST],
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
};
