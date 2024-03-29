'use client';

import { useEffect } from 'react';

import Path from 'lib/Path';
import { kakaoLoginAPI } from 'lib/apis/auth';
import { KAKAO_LOGIN_REDIRECT_URL } from 'lib/constants';
import userStorage from 'lib/utils/userStorage';
import { useRouter, useSearchParams } from 'next/navigation';

function KakaoLoginProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code') ?? '';

  useEffect(() => {
    if (code) {
      kakaoLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const kakaoLogin = async () => {
    try {
      const { accessToken, newUser } = await kakaoLoginAPI({
        code,
        redirectUrl: KAKAO_LOGIN_REDIRECT_URL,
        providerType: 'KAKAO',
      });
      userStorage.set({ accessToken });
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.MAIN_PAGE);
    } catch (error) {
      alert('에러가 발생하였습니다.');
    }
  };

  return <></>;
}

export default KakaoLoginProcess;
