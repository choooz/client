import { useQuery } from "@tanstack/react-query";
import { getUserInfoAPI, GetUserInfoResponse } from "lib/apis/user";
import { queryKeys } from "lib/queryKeys";

const getQueryKey = [queryKeys.USER_INFO];

export default function useGetUserInfo() {
  const { data: userInfo } = useQuery<GetUserInfoResponse>(getQueryKey, getUserInfoAPI, {
    placeholderData: () => ({
      alcoholLimit: "",
      email: "",
      gender: "MALE",
      imageUrl: "",
      mbti: "ESTJ",
      nickname: "",
      userId: 0,
      yearOfBirth: 1990,
    }),
  });

  return { userInfo };
}
