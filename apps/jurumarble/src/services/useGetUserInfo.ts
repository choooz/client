import { queryKeys } from "lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, GetUserInfoResponse } from "lib/apis/user";

const getQueryKey = [queryKeys.USER_INFO];

export default function useGetUserInfo() {
  const { data: userInfo } = useQuery<GetUserInfoResponse>(getQueryKey, getUserInfo, {
    placeholderData: () => ({
      gender: "MALE",
      nickname: "",
      yearOfBirth: 1990,
      imageUrl: "",
      mbti: "ESTJ",
      alcoholLimit: "",
      email: "",
      userId: 0,
    }),
  });

  return { userInfo };
}
