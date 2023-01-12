import { transitions } from "@chooz/ui";
import { LogoBlack } from "public/images";
import { KAKAO_CLIENT_ID, NAVER_CLIENT_ID } from "lib/constants";
import Image from "next/image";
import Link from "next/link";
import useLoginService from "services/useLoginService";
import styled from "styled-components";
import { media } from "styles/media";

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
          <KakaoLoginButton>카카오 로그인</KakaoLoginButton>
        </Link>
        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectUrl}&state=test`}
        >
          <NaverLoginButton>네이버 로그인</NaverLoginButton>
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

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 48px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.palette.social.kakao};
  border-radius: 4px;
  margin-bottom: 8px;
`;

const NaverLoginButton = styled.button`
  width: 100%;
  height: 48px;
  color: white;
  background-color: ${({ theme }) => theme.palette.social.naver};
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  transition: all 0.3s ease-in-out;
  border-radius: 4px;
`;

const AlreadyAccountText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
  font-weight: 700;
  animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
`;

export default LoginPage;
