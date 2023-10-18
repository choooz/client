'use client';

import { useToggle } from '@monorepo/hooks';
import Path from 'lib/Path';
import { isLogin } from 'lib/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import SvgIcCheck from 'src/assets/icons/components/IcCheck';
import SvgIcHome from 'src/assets/icons/components/IcHome';
import SvgIcMapPin from 'src/assets/icons/components/IcMapPin';
import SvgIcMark from 'src/assets/icons/components/IcMark';
import SvgIcUser from 'src/assets/icons/components/IcUser';
import styled from 'styled-components';

import ReplaceLoginPageModal from './ReplaceLoginPagemModal/ReplaceLoginPageModal';

type PathType = '/' | '/stamp' | '/vote' | '/map' | '/my';

function BottomBar() {
  const pathName = usePathname();
  const router = useRouter();
  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();

  /**
   * @TODO hooks를 사용하기 위해서 상수를 컴포넌트 안에서 사용해도 괜찮을까?
   * @TODO any타입 제거
   */
  const NAVIGATION_LIST = [
    {
      name: '홈',
      path: Path.MAIN_PAGE,
      icon: <SvgIcHome width={24} height={24} />,
      onClick: (path: PathType) => router.push(path),
    },
    {
      name: '술도장',
      path: Path.STAMP_PAGE,
      icon: <SvgIcMark width={24} height={24} />,
      onClick: (path: PathType) =>
        isLogin() ? router.push(path) : onToggleReplaceLoginPageModal(),
    },
    {
      name: '투표',
      path: Path.VOTE_HOME,
      icon: <SvgIcCheck width={24} height={24} />,
      onClick: (path: PathType) => router.push(path),
    },
    {
      name: '술지도',
      path: Path.DRINK_MAP_PAGE,
      icon: <SvgIcMapPin width={24} height={24} />,
      onClick: (path: PathType) => router.push(path),
    },
    {
      name: '마이',
      path: Path.MY_PAGE,
      icon: <SvgIcUser width={24} height={24} />,
      onClick: (path: PathType) =>
        isLogin() ? router.push(path) : onToggleReplaceLoginPageModal(),
    },
  ];

  return (
    <>
      <Padding />
      <Container>
        <Inner>
          {NAVIGATION_LIST.map(({ icon, name, path, onClick }) => {
            return (
              <BarItem
                key={name}
                isActive={pathName === path}
                onClick={() => onClick(path)}
              >
                {icon}
                <span>{name}</span>
              </BarItem>
            );
          })}
        </Inner>
      </Container>
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
    </>
  );
}

const Container = styled.section`
  z-index: 1000;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
`;

const Inner = styled.div`
  z-index: 1000;
  max-width: 720px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  ${({ theme }) => theme.typography.caption_chip};
`;

const BarItem = styled.div<{ isActive: boolean }>`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.black_01 : theme.colors.black_05};
  cursor: pointer;
`;

const Padding = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

export default BottomBar;
