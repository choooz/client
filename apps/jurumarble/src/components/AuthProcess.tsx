"use client";

import { usePathname, useRouter } from "next/navigation";
import useGetUserInfo from "services/useGetUserInfo";
import Path from "lib/Path";
import { useEffect } from "react";
import { isLogin } from "lib/utils/auth";

const LOGIN_BLOCK_PATHS = [
  Path.LOGIN_PAGE,
  Path.REGISTER_PAGE,
  Path.KAKAO_LOGIN_PROCESS,
  Path.NAVER_LOGIN_PROCESS,
];
const GUEST_BLOCK_PATHS = [
  Path.MY_PAGE,
  Path.POST_PAGE,
  Path.PROFILE_EDIT,
  Path.NOTIFICATION_PAGE,
  Path.STAMP_PAGE,
];

function AuthProcess() {
  const { userInfo } = useGetUserInfo();
  if (!userInfo) return null;
  const { gender, yearOfBirth, mbti } = userInfo!;
  const router = useRouter();
  const pathname = usePathname();

  const isRegister = gender && yearOfBirth && mbti;

  useEffect(() => {
    if (isLogin()) {
      /**
       * @TODO any 타입 제거
       */
      if (LOGIN_BLOCK_PATHS.includes(pathname as any)) {
        if (isRegister) router.push(Path.MAIN_PAGE);
        else router.replace(Path.REGISTER_PAGE);
      }
    } else {
      if (GUEST_BLOCK_PATHS.includes(pathname as any)) {
        router.push(Path.LOGIN_PAGE);
      }
    }
  }, [pathname, router]);

  return <></>;
}

export default AuthProcess;
