"use client";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { kakaoLoginAPI } from "lib/apis/auth";
import { getUserInfo } from "lib/apis/user";
import { KAKAO_LOGIN_REDIRECT_URL } from "lib/constants";
import Path from "lib/Path";
import { reactQueryKeys } from "lib/queryKeys";
import { isLogin } from "lib/utils/auth";
import userStorage from "lib/utils/userStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function kakaoLoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = new QueryClient();

  const code = searchParams.get("code") ?? "";

  useEffect(() => {
    if (code) {
      kakaoLogin();
    }
  }, [code]);

  const kakaoLogin = async () => {
    try {
      const { accessToken, newUser } = await kakaoLoginAPI({
        code,
        redirectUrl: KAKAO_LOGIN_REDIRECT_URL,
      });
      userStorage.set(accessToken);
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.MAIN_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    } finally {
      if (isLogin()) {
        queryClient.prefetchQuery(reactQueryKeys.userInfo(), getUserInfo, {
          staleTime: Infinity,
          cacheTime: Infinity,
        });
      }
    }
  };

  return <></>;
}

export default kakaoLoginProcess;
