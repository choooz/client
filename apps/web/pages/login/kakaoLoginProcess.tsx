import { kakaoLoginAPI } from "lib/api/auth";
import { KAKAO_LOGIN_REDIRECT_URL } from "lib/constants";
import Path from "lib/Path";
import userStorage from "lib/utils/userStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

function kakaoLoginProcess() {
  const router = useRouter();
  const code = router.query.code ?? "";

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
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.LIST_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    }
  };

  return <></>;
}

export default kakaoLoginProcess;
