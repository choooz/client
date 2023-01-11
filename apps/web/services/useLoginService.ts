import { CodeType, kakaoLoginAPI, naverLoginAPI } from "lib/api/auth";
import { CLIENT_URL } from "lib/constants";
import Path from "lib/Path";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useLoginService() {
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${Path.LOGIN_PAGE}`
      : `${CLIENT_URL}${Path.LOGIN_PAGE}`;

  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (code) {
      Login(code);
    }
  }, [code]);

  // @note 소셜 로그인 후 받은 authorization code값의 length가 8이면 네이버, 그 이상이면 카카오로 판단
  const Login = async (code: CodeType) => {
    try {
      if (code.length === 18) {
        const response = await naverLoginAPI({ code, state: "test" });
      } else if (code.length === 86) {
        const response = await kakaoLoginAPI({ code, redirectUrl });
      }
      router.push(Path.LIST_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    }
  };
  return { redirectUrl };
}
