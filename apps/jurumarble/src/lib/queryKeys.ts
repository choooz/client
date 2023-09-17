export const queryKeys = {
  MAIN_VOTE_LIST: "mainVoteList" as const,
  BOOKMARK_CHECK: "bookmarkCheck" as const,
  USER_INFO: "userInfo" as const,
  VOTE_LIST: "voteList" as const,
  RESTAURANT_LIST: "restaurantList" as const,
  SEARCH_DRINK_LIST: "searchDrinkList" as const,
  SEARCH_VOTE_DRINK_LIST: "searchVoteDrinkList" as const,
  VOTE_DETAIL: "voteDetail" as const,
  VOTING_CHECK: "votingCheck" as const,
  DETAIL_COMMENT_LIST: "commentByVoteId" as const,
  DETAIL_VOTE_COUNT: "voteCountByVoteId" as const,
};

export const reactQueryKeys = {
  // @note any 처리
  mainVoteList: () => [queryKeys.MAIN_VOTE_LIST] as const,
  bookmarkCheck: () => [queryKeys.BOOKMARK_CHECK] as const,
  userInfo: () => [queryKeys.USER_INFO],
  voteList: (params: any) => [queryKeys.VOTE_LIST, ...params],
  restaurantList: (params: any) => [queryKeys.RESTAURANT_LIST, ...params],
  voteDetail: (voteId: number) => [queryKeys.VOTE_DETAIL, voteId] as const,
  votingCheck: (id: number) => [queryKeys.VOTING_CHECK, id] as const,
  detailCommentList: (
    typeId: number,
    commentType: "votes" | "drinks",
    size?: number,
    page?: number,
    sortBy?: string,
  ) => [queryKeys.DETAIL_COMMENT_LIST, typeId, commentType, size, page, sortBy] as const,
  detailVoteCount: (id: number) => [queryKeys.DETAIL_VOTE_COUNT, id] as const,
};
