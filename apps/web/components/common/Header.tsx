import { LogoWhite } from "public/images";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { media } from "@chooz/ui/styles/media";
import { useRouter } from "next/navigation";
import { AlertIcon, Back, MoreIcon, MyPageIcon } from "public/icons";
import Path from "lib/Path";

interface Props {
  leftMenu?: "back" | "logo";
  centerMenu?: string;
  rightMenu?: "logout" | "menu";
}

function Header({ centerMenu, leftMenu, rightMenu }: Props) {
  const router = useRouter();

  const printLeftMenu = () => {
    switch (leftMenu) {
      case "back":
        return <Image alt="뒤로" src={Back} onClick={() => router.back()} width={40} height={40} />;

      case "logo":
        return (
          <Link href="/">
            <LogoWrapper>
              <Image alt="chooz 로고" src={LogoWhite} fill />
            </LogoWrapper>
          </Link>
        );
      default:
        return null;
    }
  };

  // @TODO : 적절한 링크나 이동로직 추가하기
  const printRightMenu = () => {
    switch (rightMenu) {
      case "logout":
        return <LogoutButton>로그아웃</LogoutButton>;

      case "menu":
        return (
          <RightMenu>
            <Link href={Path.MY_PAGE}>
              <Image alt="마이페이지로" src={MyPageIcon} width={28} height={28} />
            </Link>
            <Image alt="알람으로" src={AlertIcon} width={28} height={28} />
            <Image alt="매뉴로" src={MoreIcon} width={28} height={28} />
          </RightMenu>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderInner>
        <LeftMenu>{printLeftMenu()}</LeftMenu>
        <CenterMenu>{centerMenu}</CenterMenu>
        <RightMenu>{printRightMenu()} </RightMenu>
      </HeaderInner>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.ink.dark};
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 640px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const LeftMenu = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  width: 114px;
  height: 33px;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 25px;
  ${media.medium} {
    width: 114px;
    height: 33px;
  }
`;

const RightMenu = styled(LeftMenu)`
  text-align: right;
  gap: 16px;
`;

const CenterMenu = styled.div`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  font-size: 18px;
  ${media.medium} {
    font-size: 28px;
  }
`;

const LogoutButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.palette.ink.light};
    ${theme.textStyle.Title_Small}
  `}
  :hover {
    text-decoration: underline;
  }
`;
export default Header;
