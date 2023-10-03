"use client";

import { naverLoginAPI } from "lib/apis/auth";
import Path from "lib/Path";
import userStorage from "lib/utils/userStorage";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function naverLoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code") ?? "";

  /**
   * @TODO 더 좋은 방법 없을까
   */

  useEffect(() => {
    if (code) {
      naverLogin();
    }
  }, [code]);

  const naverLogin = async () => {
    try {
      const { accessToken, newUser } = await naverLoginAPI({ code, state: "test" });
      userStorage.set({ accessToken });
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.MAIN_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    }
  };
  return <></>;
}

export default naverLoginProcess;
