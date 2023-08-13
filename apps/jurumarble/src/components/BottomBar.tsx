"use client";

import { usePathname, useRouter } from "next/navigation";
import SvgIcCheck from "src/assets/icons/components/IcCheck";
import SvgIcHome from "src/assets/icons/components/IcHome";
import SvgIcMapPin from "src/assets/icons/components/IcMapPin";
import SvgIcMark from "src/assets/icons/components/IcMark";
import SvgIcUser from "src/assets/icons/components/IcUser";
import { css, styled } from "styled-components";

const NAVIGATION_LIST = [
  {
    name: "홈",
    path: "/",
    icon: <SvgIcHome width={24} height={24} />,
  },
  {
    name: "술도장",
    path: "/stamp",
    icon: <SvgIcMark width={24} height={24} />,
  },
  {
    name: "투표",
    path: "/vote",
    icon: <SvgIcCheck width={24} height={24} />,
  },
  {
    name: "술지도",
    path: "/map",
    icon: <SvgIcMapPin width={24} height={24} />,
  },
  {
    name: "마이",
    path: "/my",
    icon: <SvgIcUser width={24} height={24} />,
  },
];

function BottomBar() {
  const pathName = usePathname();
  const router = useRouter();
  console.log(pathName);
  return (
    <Container>
      <Inner>
        {NAVIGATION_LIST.map(({ icon, name, path }) => {
          // pathname이 "/" 일때 홈만 true이고, 그외일때 현재 url에 path가 포함되어 있으면 active
          const active = pathName === "/" ? pathName === path : pathName.includes(path);
          return (
            <BarItem key={`${name}`} active={active ? 1 : 0} onClick={() => router.push(path)}>
              {icon}
              <span>{name}</span>
            </BarItem>
          );
        })}
      </Inner>
    </Container>
  );
}

const Container = styled.section`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -16px 32px 0px rgba(235, 235, 235, 0.8);
`;

const Inner = styled.div`
  max-width: 720px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  ${({ theme }) => theme.typography.caption};
`;

const BarItem = styled.div<{ active: number }>`
  padding: 10px 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  color: ${({ active, theme }) => (active ? theme.colors.black_01 : theme.colors.black_05)};
`;

export default BottomBar;
