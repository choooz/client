"use client";

import { transitions } from "@chooz/ui";
import { LogoBlack } from "public/images";
import Image from "next/image";
import useLoginService from "services/useLoginService";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { KakaoIcon, NaverIcon } from "public/icons";
import Link from "next/link";

function LoginPage() {
  const { socialLink } = useLoginService();

  return (
    <PageWrapper>
      <PageInner>
        <Image alt="로고" src={LogoBlack} />
        <WelcomeText>
          고민되는 것들, <br />
          눈치보지 말고 Chooz에서 물어봐!
        </WelcomeText>
        <Emoji />
        <Link href={socialLink.KAKAO}>
          <KakaoBox>
            <KakaoIconStyled />
            <Divider />
            <LoginText>카카오 계정으로 로그인</LoginText>
          </KakaoBox>
        </Link>
        <Link href={socialLink.NAVER}>
          <NaverBox>
            <NaverIconStyled />
            <Divider />
            <LoginText>네이버 계정으로 로그인</LoginText>
          </NaverBox>
        </Link>
        <TermsOfUse>
          계속하면 당사의 <ClickText>서비스 약관</ClickText>에 동의하고, <MobileNextLine />
          <ClickText>개인정보 보호정책</ClickText>
          을(를) 읽어 <DesktopNextLine /> 당사의 데이터 수집, <MobileNextLine /> 사용, 공유 방법을
          확인했음을 인정하는 것입니다.
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
  ${media.medium} {
    height: 717px;
    padding: 80px;
  }
`;

const WelcomeText = styled.div`
  margin-top: 16px;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
  ${({ theme }) => theme.textStyle.Font_Regular};
`;

const Emoji = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 226px;
  background-color: #bebebe;
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
  background-color: ${({ theme }) => theme.palette.social.kakao};
  ${SocialLoginButton}
  margin-bottom: 8px;
  margin-top: 16px;
`;

const NaverBox = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.palette.social.naver};
  animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
  ${SocialLoginButton}
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  margin-left: 18px;
  background-color: ${({ theme }) => theme.palette.background.white};
  opacity: 0.5;
`;

const KakaoIconStyled = styled(KakaoIcon)`
  display: flex;
  margin-left: 18px;
`;

const NaverIconStyled = styled(NaverIcon)`
  display: flex;
  margin-left: 18px;
`;

const LoginText = styled.span`
  margin: 0 auto;
`;

const TermsOfUse = styled.p`
  margin-top: 26px;
  text-align: center;
  ${({ theme }) => theme.textStyle.Font_Minimum};
  color: ${({ theme }) => theme.palette.ink.light};
  animation: ${transitions.delaypopInFromBottom} 2.8s normal ease-in-out;
`;

const ClickText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

const MobileNextLine = styled.br`
  ${media.medium} {
    display: none;
  }
`;

const DesktopNextLine = styled.br`
  display: none;
  ${media.medium} {
    display: block;
  }
`;
export default LoginPage;
