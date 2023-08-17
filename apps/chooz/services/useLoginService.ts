"use client";

import {
  KAKAO_CLIENT_ID,
  KAKAO_LOGIN_REDIRECT_URL,
  NAVER_CLIENT_ID,
  NAVER_LOGIN_REDIRECT_URL,
} from "lib/constants";

// @note 소셜 로그인이라는 하나의 관심사가 흩뿌려진 느낌
// next.js 공식 문서에선 useRouter 사용대신 Link 컴포넌트를 사용하는 것을 권장함
export default function useLoginService() {
  const socialLink = {
    KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URL}&response_type=code`,
    NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_LOGIN_REDIRECT_URL}&state=test`,
  };

  return { socialLink };
}
