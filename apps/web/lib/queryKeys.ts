export const queryKeys = {
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
  voteList: () => [queryKeys.VOTE_LIST],
};
