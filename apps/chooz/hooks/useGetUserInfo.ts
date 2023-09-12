import { reactQueryKeys } from "lib/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";
import { GetUserInfoResponse } from "types/user";

type SetUserInfoProps = Omit<GetUserInfoResponse, "userId" | "provider" | "providerId" | "email">;

export function useGetUserInfo() {
  const { data } = useQuery(reactQueryKeys.userInfo(), getUserInfo, {
    suspense: true,
  });

  const qc = useQueryClient();

  const setUserInfo = (userInfo: SetUserInfoProps) => {
    qc.setQueryData(reactQueryKeys.userInfo(), userInfo);
  };

  return { data, setUserInfo };
}
