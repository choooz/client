import { forwardRef, useRef, useState } from 'react';

import { Portal } from 'components/index';
import { transitions } from 'lib/styles';
import Image, { StaticImageData } from 'next/image';
import {
  desktopDetailOnboarding,
  desktopEnlargeOnboarding,
  desktopMoveOnboarding,
  desktopSelectOnboarding,
  mobileDetailOnboarding,
  mobileEnlargeOnboarding,
  mobileMoveOnboarding,
  mobileSelectOnboarding,
} from 'public/images';
import { SvgIcClose } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

interface CardProps {
  title: string;
  description: string;
  imgSrc: string | StaticImageData;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, imgSrc }, ref) => {
    return (
      <CardWrapper ref={ref}>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <Image className="img" src={imgSrc} alt="img" />
      </CardWrapper>
    );
  },
);

interface Props {
  onToggleOnboarding: () => void;
}

const TAB_LIST = [
  { tabName: '후보 확대', id: 'enlarge' },
  { tabName: '후보 선택', id: 'select' },
  { tabName: '투표 이동', id: 'move' },
  { tabName: '자세히 보기', id: 'detail' },
];

const CARD_LIST = [
  {
    title: '후보를 확대해서 보기',
    description: '마우스를 후보에 올리거나 좌우 방향키를 이용하세요.',
    imgSrc: desktopEnlargeOnboarding,
    mobileImgSrc: mobileEnlargeOnboarding,
  },
  {
    title: '투표 후보를 선택하기',
    description: '원하는 후보를 클릭하세요.',
    imgSrc: desktopSelectOnboarding,
    mobileImgSrc: mobileSelectOnboarding,
  },
  {
    title: '자세한 내용을 확인하기',
    description: '스크롤을 하거나 상하 방향키를 이용하세요.',
    imgSrc: desktopMoveOnboarding,
    mobileImgSrc: mobileMoveOnboarding,
  },
  {
    title: '자세히 보기',
    description: '더보기 버튼을 클릭해주세요.',
    imgSrc: desktopDetailOnboarding,
    mobileImgSrc: mobileDetailOnboarding,
  },
];

const OnboardingBottomsheet = ({ onToggleOnboarding }: Props) => {
  const [chip, setChip] = useState('mobile');

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  // 탭 클릭시 ref로 이동하는 함수

  const handleTabClick = (index: number) => {
    cardRefs[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <Portal selector="#portal">
      <BottomSheet>
        <Inner>
          <Exit onClick={onToggleOnboarding}>
            <SvgIcClose width={24} height={24} />
          </Exit>
          <Title>투표를 좀 더 재밌게 참여해 볼까요?</Title>
          <Description>
            투표는 여러가지 조작 방법을 통해 참여할 수 있어요.
          </Description>
          <TabWrapper>
            {TAB_LIST.map(({ id, tabName }, index) => (
              <Tab
                key={id}
                active={id === 'enlarge'}
                onClick={() => handleTabClick(index)}
              >
                {tabName}
              </Tab>
            ))}
          </TabWrapper>
          <ChipWrapper>
            <Chip active={chip === 'mobile'} onClick={() => setChip('mobile')}>
              모바일
            </Chip>
            <Chip
              active={chip === 'desktop'}
              onClick={() => setChip('desktop')}
            >
              PC
            </Chip>
          </ChipWrapper>
          {CARD_LIST.map(
            ({ title, description, imgSrc, mobileImgSrc }, index) => (
              <Card
                key={title}
                title={title}
                description={description}
                imgSrc={chip === 'mobile' ? imgSrc : mobileImgSrc}
                ref={cardRefs[index]}
              />
            ),
          )}
        </Inner>
        <Background onClick={onToggleOnboarding} />
      </BottomSheet>
    </Portal>
  );
};

const BottomSheet = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Inner = styled.div`
  position: absolute;
  z-index: 9999;
  background-color: white;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 100%;
  max-width: 720px;
  height: 90%;
  animation: ${transitions.popInFromBottom} 0.4s ease-in-out;
  border-radius: 16px 16px 0px 0px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

const Title = styled.div`
  display: flex;
  ${({ theme }) => css`
    ${theme.typography.headline02}
  `}
  justify-content: flex-start;
  padding: 64px 20px 0 20px;
`;

const Description = styled.div`
  display: flex;
  ${({ theme }) => css`
    ${theme.typography.body02}
    color: ${theme.colors.black_02};
  `}
  padding:12px 20px 16px 20px;
`;
// padding: 26px 20px 20px 20px;
const Exit = styled.div`
  position: absolute;
  top: 26px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TabWrapper = styled.div`
  display: flex;

  padding: 16px 20px 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_01};
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 16px 10px;
  width: 25%;
  text-align: center;
  cursor: pointer;
  ${({ active, theme }) =>
    active
      ? css`
          ${theme.typography.body01}
          color: ${({ theme }) => theme.colors.black_01};
          border-bottom: 3px solid ${({ theme }) => theme.colors.black_01};
        `
      : css`
          ${theme.typography.body02}
          color: ${({ theme }) => theme.colors.black_03};
        `}
`;

const ChipWrapper = styled.div`
  padding: 28px 20px;
  display: flex;
  gap: 4px;
`;

const Chip = styled.div<{ active: boolean }>`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme, active }) => css`
    ${theme.typography.caption_chip}
    color: ${active ? theme.colors.white : theme.colors.black_02};
    background-color: ${active ? theme.colors.black_02 : theme.colors.bg_01};
  `}
`;

const CardWrapper = styled.div`
  padding: 0 20px;
  margin-bottom: 42px;
  .title {
    padding-bottom: 4px;
    ${({ theme }) => css`
      ${theme.typography.body01}
    `}
  }
  .description {
    ${({ theme }) => css`
      ${theme.typography.body_long03}
      padding-bottom: 16px;
    `}
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
`;

export default OnboardingBottomsheet;
