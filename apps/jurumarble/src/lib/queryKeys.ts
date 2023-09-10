export const queryKeys = {
  MAIN_VOTE_LIST: "mainVoteList" as const,
  BOOKMARK_CHECK: "bookmarkCheck" as const,
};

export const reactQueryKeys = {
  // @note any 처리
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
  bookmarkCheck: () => [queryKeys.BOOKMARK_CHECK] as const,
};
