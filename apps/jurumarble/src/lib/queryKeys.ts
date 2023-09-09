export const queryKeys = {
  MAIN_VOTE_LIST: "mainVoteList" as const,
  BOOKMARK_CHECK: "bookmarkCheck" as const,
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  RESTAURANT_LIST: "restaurantList" as const,
  DRINK_LIST: "drinkList" as const,
};

export const reactQueryKeys = {
  // @note any 처리
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
  bookmarkCheck: () => [queryKeys.BOOKMARK_CHECK] as const,
  userInfo: () => [queryKeys.USER_INFO],
  voteList: (params: any) => [queryKeys.VOTE_LIST, ...params],
  restaurantList: (params: any) => [queryKeys.RESTAURANT_LIST, ...params],
  drinkList: (params: any) => [queryKeys.DRINK_LIST, ...params],
};
