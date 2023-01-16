import { transitions } from "@chooz/ui";
import { LogoBlack } from "public/images";
import { KAKAO_CLIENT_ID, NAVER_CLIENT_ID } from "lib/constants";
import Image from "next/image";
import Link from "next/link";
import useLoginService from "services/useLoginService";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { KakaoIcon, NaverIcon } from "public/icons";

function LoginPage() {
  const { redirectUrl } = useLoginService();

  return (
    <PageWrapper>
      <PageInner>
        <Image alt="로고" src={LogoBlack} />
        <WelcomeText>
          고민되는 것들, <br />
          눈치보지 말고 Chooz에서 물어봐!
        </WelcomeText>
        <Emoji />
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code`}
        >
          <KakaoButton>
            <KakaoIconStyled />
            <Divider />
            <LoginText>카카오 계정으로 로그인</LoginText>
          </KakaoButton>
        </Link>
        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectUrl}&state=test`}
        >
          <NaverButton>
            <NaverIconStyled />
            <Divider />
            <LoginText>네이버 계정으로 로그인</LoginText>
          </NaverButton>
        </Link>
        <AlreadyAccountText>이미 계정이 있으신가요? 로그인</AlreadyAccountText>
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
  margin: 20px auto;
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

const KakaoButton = styled.button`
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  background-color: ${({ theme }) => theme.palette.social.kakao};
  ${SocialLoginButton}
  margin-bottom: 8px;
`;

const NaverButton = styled.button`
  color: white;
  background-color: ${({ theme }) => theme.palette.social.naver};
  animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
  ${SocialLoginButton}
`;

const AlreadyAccountText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
  font-weight: 700;
  animation: ${transitions.delaypopInFromBottom} 2.7s normal ease-in-out;
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

export default LoginPage;
