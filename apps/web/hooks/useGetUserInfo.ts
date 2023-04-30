import { reactQueryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";
import { useState } from "react";
import { GetUserInfoResponse } from "types/user";
import { isLogin } from "lib/utils/auth";

export function useGetUserInfo() {
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse>();

  const { data } = useQuery(reactQueryKeys.userInfo(), getUserInfo, {
    onSuccess: (data) => {
      setUserInfo(data);
    },
    enabled: isLogin(),
  });
  return { data, userInfo, setUserInfo };
}
