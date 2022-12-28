import { transitions } from "@chooz/ui";
import { LogoBlack } from "assets/images";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { media } from "styles/media";

function LoginPage() {
  const router = useRouter();
  const code = router.query.code;
  const redirectUrl = "http://localhost:3000/login";

  useEffect(() => {
    if (code) {
      console.log(code);
      const temp = axios.post(
        "http://ec2-15-165-134-97.ap-northeast-2.compute.amazonaws.com:8080/api/oauth/kakao",
        { code, redirectUrl },
      );
      console.log(temp);
    }
  }, [code]);

  return (
    <PageWrapper>
      <Image alt="로고" src={LogoBlack} />
      <WelcomeText>
        고민되는 것들, <br />
        눈치보지 말고 Chooz에서 물어봐!
      </WelcomeText>
      <Emoji />
      <Link href="https://kauth.kakao.com/oauth/authorize?client_id=be0a6d22a5fcd591b8fc3f6a8f446afe&redirect_uri=http://localhost:3000/login&response_type=code">
        <KakaoLoginButton>카카오 로그인</KakaoLoginButton>
      </Link>
      <Link href="dsafa">
        <NaverLoginButton>네이버 로그인</NaverLoginButton>
      </Link>
      <AlreadyAccountText>이미 계정이 있으신가요? 로그인</AlreadyAccountText>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: 558px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 717px;
    padding: 80px;
  }
`;

const WelcomeText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  line-height: 18px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
`;

const Emoji = styled.div`
  margin-top: 24px;
  width: 283px;
  height: 226px;
  background-color: #bebebe;
`;

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 48px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.palette.social_color.kakao};
`;

const NaverLoginButton = styled.button`
  width: 100%;
  height: 48px;
  color: white;
  background-color: ${({ theme }) => theme.palette.social_color.naver};
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  transition: all 0.3s ease-in-out;
`;

const AlreadyAccountText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
  font-weight: 700;
  animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
`;

export default LoginPage;
