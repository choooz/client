import { reactQueryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";
import { useState } from "react";

export function useGetUserInfo() {
  const [userInfo, setUserInfo] = useState({
    gender: "MALE",
    username: "",
    age: "",
    mbti: "",
    imageUrl: "",
  });

  const { data } = useQuery(reactQueryKeys.userInfo(), getUserInfo, {
    onSuccess: (data) => {
      /*
      @Todo state를 사용 안하고 할 수 있는 방법 없을까?
      */
      setUserInfo(data);
    },
  });

  return { data, userInfo, setUserInfo };
}
