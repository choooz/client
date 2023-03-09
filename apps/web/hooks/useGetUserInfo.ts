import { reactQueryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";
import { useState } from "react";
import { GetUserInfoResponse } from "types/user";

export function useGetUserInfo() {
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse>();
  const { data } = useQuery(reactQueryKeys.userInfo(), getUserInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });
  return { userInfo, setUserInfo };
}
