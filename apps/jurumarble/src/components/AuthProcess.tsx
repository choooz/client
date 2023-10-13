"use client";

import { usePathname, useRouter } from "next/navigation";
import Path from "lib/Path";
import { useEffect } from "react";
import { isLogin } from "lib/utils/auth";
import { getUserInfoAPI } from "lib/apis/user";

const LOGIN_BLOCK_PATHS = [
  Path.LOGIN_PAGE,
  /**
   * @NOTE 회원가입 페이지를 막을 경우 테스트 페이지에서 회원가입 페이지로
   * 리다이렉트 됐을 때, 다시 메인페이지로 리다이렉트 되는 문제가 발생함.
   */
  // Path.REGISTER_PAGE,
  Path.KAKAO_LOGIN_PROCESS,
  Path.NAVER_LOGIN_PROCESS,
  Path.TEST_PAGE,
];
const GUEST_BLOCK_PATHS = [
  Path.MY_PAGE,
  Path.POST_PAGE,
  Path.PROFILE_EDIT,
  Path.NOTIFICATION_PAGE,
  Path.STAMP_PAGE,
];

function AuthProcess() {
  // const { userInfo } = useGetUserInfo();
  // const { gender, yearOfBirth, mbti } = userInfo ?? {};
  const router = useRouter();
  const pathname = usePathname();

  // const isRegister = gender && yearOfBirth && mbti;

  useEffect(() => {
    const registerCheck = async () => {
      try {
        const userInfo = await getUserInfoAPI();
        if (!(userInfo.gender && userInfo.yearOfBirth && userInfo.mbti)) {
          router.push(Path.REGISTER_PAGE);
        }
      } catch (error) {
        alert("에러가 발생하였습니다.");
      }
    };

    if (isLogin()) {
      // if (!isRegister) {
      //   router.replace(Path.REGISTER_PAGE);
      //   return;
      // }
      registerCheck();

      /**
       * @TODO any 타입 제거
       */
      if (LOGIN_BLOCK_PATHS.includes(pathname as any)) {
        router.push(Path.MAIN_PAGE);
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
