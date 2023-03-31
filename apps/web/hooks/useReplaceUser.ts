import Path from "lib/Path";
import { isLogin } from "lib/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * @description 로그인 유무에따라 페이지 이동
 */

export default function useReplaceUser() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      if (
        pathname === Path.LOGIN_PAGE ||
        pathname === Path.REGISTER_PAGE ||
        pathname === Path.KAKAO_LOGIN_PROCESS ||
        pathname === Path.NAVER_LOGIN_PROCESS ||
        pathname === Path.REGISTER_INTERSTER_PAGE
      ) {
        router.push(Path.MAIN_PAGE);
      }
    } else {
      if (
        pathname === Path.MY_PAGE ||
        pathname === Path.POST_PAGE ||
        pathname === Path.PROFILE_EDIT
      ) {
        router.push(Path.LOGIN_PAGE);
      }
    }
  }, [pathname, router, Path.LOGIN_PAGE, Path.REGISTER_PAGE]);
}
