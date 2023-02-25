"use client";

import { naverLoginAPI } from "lib/apis/auth";
import Path from "lib/Path";
import userStorage from "lib/utils/userStorage";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { isLogin } from "lib/utils/auth";
import { reactQueryKeys } from "lib/queryKeys";
import { getUserInfo } from "lib/apis/user";

function naverLoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = new QueryClient();

  const code = searchParams.get("code") ?? "";

  useEffect(() => {
    if (code) {
      naverLogin();
    }
  }, [code]);

  const naverLogin = async () => {
    try {
      const { accessToken, newUser } = await naverLoginAPI({ code, state: "test" });
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

export default naverLoginProcess;
