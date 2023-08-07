import { LogoWhite } from "public/images";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { media } from "@chooz/ui/styles/media";
import { usePathname } from "next/navigation";
import Path from "lib/Path";
import HeaderSearchIcon from "public/icons/HeaderSearchIcon";
import HeaderSelect from "./HeaderSelectBox";

function Header() {
  const pathname = usePathname();

  return (
    <Container>
      <HeaderInner>
        <LeftMenu>
          <Link href={Path.MAIN_PAGE}>
            <LogoWrapper>
              <Image alt="chooz 로고" src={LogoWhite} fill />
            </LogoWrapper>
          </Link>
        </LeftMenu>
        {(pathname === Path.MY_PAGE && <CenterMenu>My Page</CenterMenu>) ||
          (pathname === Path.PROFILE_EDIT && <CenterMenu>Edit</CenterMenu>)}
        <RightMenu>
          <Link href={Path.SEARCH_PAGE}>
            <IconWrapper>
              <HeaderSearchIcon width="100%" height="100%" />
            </IconWrapper>
          </Link>
          <HeaderSelect />
        </RightMenu>
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
  padding: 0 18px;
  ${media.medium} {
    padding: 0;
  }
`;

const LeftMenu = styled.div`
  align-items: center;
  display: flex;
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

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 19px;
`;

const CenterMenu = styled.div`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  font-size: 18px;
  ${media.medium} {
    font-size: 28px;
  }
`;

const ICON_SIZE = {
  MOBILE: 28,
  DESKTOP: 40,
};

const IconWrapper = styled.div`
  position: relative;
  width: ${ICON_SIZE.MOBILE}px;
  height: ${ICON_SIZE.MOBILE}px;
  ${media.medium} {
    width: ${ICON_SIZE.DESKTOP}px;
    height: ${ICON_SIZE.DESKTOP}px;
  }
`;

export default Header;
