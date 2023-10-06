"use client";

import Path from "lib/Path";
import { usePathname, useRouter } from "next/navigation";
import SvgIcCheck from "src/assets/icons/components/IcCheck";
import SvgIcHome from "src/assets/icons/components/IcHome";
import SvgIcMapPin from "src/assets/icons/components/IcMapPin";
import SvgIcMark from "src/assets/icons/components/IcMark";
import SvgIcUser from "src/assets/icons/components/IcUser";
import styled from "styled-components";

const NAVIGATION_LIST = [
  {
    name: "홈",
    path: Path.MAIN_PAGE,
    icon: <SvgIcHome width={24} height={24} />,
  },
  {
    name: "술도장",
    path: Path.STAMP_PAGE,
    icon: <SvgIcMark width={24} height={24} />,
  },
  {
    name: "투표",
    path: Path.VOTE_HOME,
    icon: <SvgIcCheck width={24} height={24} />,
  },
  {
    name: "술지도",
    path: Path.DRINK_MAP_PAGE,
    icon: <SvgIcMapPin width={24} height={24} />,
  },
  {
    name: "마이",
    path: Path.MY_PAGE,
    icon: <SvgIcUser width={24} height={24} />,
  },
];

function BottomBar() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <>
      <Padding />
      <Container>
        <Inner>
          {NAVIGATION_LIST.map(({ icon, name, path }) => {
            return (
              <BarItem key={name} isActive={pathName === path} onClick={() => router.push(path)}>
                {icon}
                <span>{name}</span>
              </BarItem>
            );
          })}
        </Inner>
      </Container>
    </>
  );
}

const Container = styled.section`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
`;

const Inner = styled.div`
  max-width: 720px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  ${({ theme }) => theme.typography.caption};
`;

const BarItem = styled.div<{ isActive: boolean }>`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.black_01 : theme.colors.black_05)};
`;

const Padding = styled.div`
  width: 100%;
  height: 63px;
`;

export default BottomBar;
