"use client";
import {
  KAKAO_CLIENT_ID,
  KAKAO_LOGIN_REDIRECT_URL,
  NAVER_CLIENT_ID,
  NAVER_LOGIN_REDIRECT_URL,
} from "lib/constants";
import styled, { css } from "styled-components";
import Link from "next/link";
import { SvgKakaoIcon, SvgNaverIcon } from "src/assets/icons/components";
import { transitions } from "lib/styles";

const socialLoginLink = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URL}&response_type=code`,
  NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_LOGIN_REDIRECT_URL}&state=test`,
};

function LoginPage() {
  return (
    <PageWrapper>
      <PageInner>
        <WelcomeText>
          고민되는 것들, <br />
          눈치보지 말고 Chooz에서 물어봐!
        </WelcomeText>
        <Link href={socialLoginLink.KAKAO}>
          <KakaoBox>
            <KakaoIconStyled />
            <Divider />
            <LoginText>카카오 계정으로 로그인</LoginText>
          </KakaoBox>
        </Link>
        <Link href={socialLoginLink.NAVER}>
          <NaverBox>
            <NaverIconStyled />
            <Divider />
            <LoginText>네이버 계정으로 로그인</LoginText>
          </NaverBox>
        </Link>
        <TermsOfUse>
          계속하면 당사의 <ClickText>서비스 약관</ClickText>에 동의하고, <br />
          <ClickText>개인정보 보호정책</ClickText>
          을(를) 읽어 당사의 데이터 수집, <br /> 사용, 공유 방법을 확인했음을 인정하는 것입니다.
        </TermsOfUse>
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: 587px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
`;

const WelcomeText = styled.div`
  margin-top: 16px;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
`;

const Emoji = styled.div`
  position: relative;
  margin-top: 24px;
  width: 100%;
  height: 226px;
`;
// @note 공통 Button 컴포넌트로 묶을 수 있는 방법?
const SocialLoginButton = css`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 48px;
  margin: 0 auto;
  max-width: 480px;
  border-radius: 4px;
`;

const KakaoBox = styled.div`
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  ${SocialLoginButton}
  margin-bottom: 8px;
  margin-top: 16px;
`;

const NaverBox = styled.div`
  color: white;
  animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
  ${SocialLoginButton}
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  margin-left: 18px;
  opacity: 0.5;
`;

const KakaoIconStyled = styled(SvgKakaoIcon)`
  display: flex;
  margin-left: 18px;
`;

const NaverIconStyled = styled(SvgNaverIcon)`
  display: flex;
  margin-left: 18px;
`;

const LoginText = styled.span`
  margin: 0 auto;
`;

const TermsOfUse = styled.p`
  margin-top: 26px;
  text-align: center;

  animation: ${transitions.delaypopInFromBottom} 2.8s normal ease-in-out;
`;

const ClickText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

export default LoginPage;
