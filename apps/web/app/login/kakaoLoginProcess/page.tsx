"use client";

import { kakaoLoginAPI } from "lib/apis/auth";
import { KAKAO_LOGIN_REDIRECT_URL } from "lib/constants";
import Path from "lib/Path";
import userStorage from "lib/utils/userStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function kakaoLoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code") ?? "";

  useEffect(() => {
    if (code) {
      kakaoLogin();
    }
  }, [code]);

  const kakaoLogin = async () => {
    try {
      const { accessToken, refreshToken, newUser } = await kakaoLoginAPI({
        code,
        redirectUrl: KAKAO_LOGIN_REDIRECT_URL,
      });
      userStorage.set({ accessToken, refreshToken });
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.MAIN_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    }
  };

  return <></>;
}

export default kakaoLoginProcess;
