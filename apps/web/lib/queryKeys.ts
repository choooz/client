export const queryKeys = {
  USER_INFO: "userInfo" as const,
};

export const reactQueryKeys = {
  userInfo: () => [queryKeys.USER_INFO],
};
