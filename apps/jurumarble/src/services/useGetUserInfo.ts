import { queryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, GetUserInfoResponse } from "lib/apis/user";

const getQueryKey = [queryKeys.USER_INFO];

type MyPageUserInfo = Omit<GetUserInfoResponse, "email">;

export function useGetUserInfo() {
  const { data: userInfo } = useQuery<MyPageUserInfo>(getQueryKey, getUserInfo, {
    placeholderData: () => ({
      gender: "MALE",
      nickname: "주루마블",
      ageType: "twenties",
      imageUrl: "",
      mbti: "ESTJ",
      alcoholLimit: "1",
    }),
  });

  return { userInfo };
}
