import {
  KAKAO_CLIENT_ID,
  KAKAO_LOGIN_REDIRECT_URL,
  NAVER_CLIENT_ID,
  NAVER_LOGIN_REDIRECT_URL,
} from 'lib/constants';
import { transitions } from 'lib/styles';
import Link from 'next/link';
import {
  SvgIcThunder,
  SvgKakaoIcon,
  SvgNaverIcon,
} from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

const socialLoginLink = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URL}&response_type=code`,
  NAVER: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_LOGIN_REDIRECT_URL}&state=test`,
};

function LoginSection() {
  return (
    <>
      <BalloonText>
        <SvgIcThunder />
        3초만에 우리술 여행 시작
      </BalloonText>
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
    </>
  );
}

const BalloonText = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline04}
    color: ${theme.colors.white};
    background-color: ${theme.colors.system_black};
    margin: 84px auto 0 auto;
    margin-top: 84px;
    text-align: center;
    border-radius: 8px;
    width: 212px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    position: relative;
    animation: ${transitions.delaypopInFromBottom} 1.2s ease-in-out;

    ::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 47%;
      border-top: 8px solid ${theme.colors.system_black};
      border-bottom: 8px solid transparent;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }
  `}
`;

const SocialLoginCss = css`
  ${({ theme }) => css`
    ${theme.typography.body03}
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    max-width: 375px;
  `};
`;

const KakaoBox = styled.div`
  ${({ theme }) => css`
    animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
    background-color: ${theme.colors.kakao};
    ${SocialLoginCss}
    margin: 16px auto 0 auto;
  `};
`;

const NaverBox = styled.div`
  ${({ theme }) => css`
    color: white;
    background-color: ${theme.colors.naver};
    animation: ${transitions.delaypopInFromBottom} 2.1s normal ease-in-out;
    margin: 8px auto 0 auto;
    ${SocialLoginCss}
  `};
`;

const Divider = styled.div`
  ${({ theme }) => css`
    width: 1px;
    height: 28px;
    margin-left: 18px;
    background-color: ${theme.colors.white};
    opacity: 0.5;
  `};
`;

const KakaoIconStyled = styled(SvgKakaoIcon)`
  margin-left: 18px;
`;

const NaverIconStyled = styled(SvgNaverIcon)`
  margin-left: 18px;
`;

const LoginText = styled.span`
  margin: 0 auto;
`;

export default LoginSection;
