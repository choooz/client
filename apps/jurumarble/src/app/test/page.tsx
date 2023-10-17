"use client";

import { useEffect } from "react";

import Path from "lib/Path";
import { getTestUserAPI, getUserInfoAPI } from "lib/apis/user";
import userStorage from "lib/utils/userStorage";
import { useRouter } from "next/navigation";

// const getQuery = [queryKeys.LOGIN_INFO];

function TestPage() {
  const router = useRouter();

  // const { userInfo } = useGetUserInfo();
  // if (!userInfo) return null;
  // const { gender, yearOfBirth, mbti } = userInfo!;
  // const isRegister = gender && yearOfBirth && mbti;

  // const { data: loginInfo } = useQuery(getQuery, getTestUserAPI);

  useEffect(() => {
    const testUserLogin = async () => {
      try {
        const { accessToken } = await getTestUserAPI();
        userStorage.set({ accessToken });
        const userInfo = await getUserInfoAPI();
        if (userInfo.gender && userInfo.yearOfBirth && userInfo.mbti) {
          router.push(Path.MAIN_PAGE);
        } else {
          router.push(Path.REGISTER_PAGE);
        }
      } catch (error) {
        alert("에러가 발생하였습니다.");
      }
    };
    testUserLogin();
    // if (loginInfo?.accessToken) {
    //   userStorage.set({ accessToken: loginInfo.accessToken });
    //   if (isRegister) router.push(Path.MAIN_PAGE);
    //   else {
    //     router.replace(Path.REGISTER_PAGE);
    //   }
    // }
  }, []);

  return <>잠시만 기다려주십시오.</>;
}

export default TestPage;
