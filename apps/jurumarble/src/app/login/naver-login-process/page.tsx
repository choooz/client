"use client";

import { useEffect } from "react";

import Path from "lib/Path";
import { naverLoginAPI } from "lib/apis/auth";
import userStorage from "lib/utils/userStorage";
import { useRouter, useSearchParams } from "next/navigation";

function NaverLoginProcess() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default NaverLoginProcess;
