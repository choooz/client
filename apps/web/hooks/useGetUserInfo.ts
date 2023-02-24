import { reactQueryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";

export function useGetUserInfo() {
  const { data } = useQuery(reactQueryKeys.userInfo(), getUserInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  console.log(data);
  return data;
}
