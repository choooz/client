'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useToggle } from '@monorepo/hooks';
import BottomBar from 'components/BottomBar';
import Loading from 'components/Loading';
import ReplaceLoginPageModal from 'components/ReplaceLoginPagemModal/ReplaceLoginPageModal';
import { Button } from 'components/button';
import Path from 'lib/Path';
import { media } from 'lib/styles';
import { isLogin } from 'lib/utils/auth';
import userStorage from 'lib/utils/userStorage';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ImgScroll } from 'public/images';
import { toast } from 'react-toastify';
import useBookmarkService from 'services/useBookmarkService';
import { SvgInfo } from 'src/assets/icons/components';
import SvgIcDetail from 'src/assets/icons/components/IcDetail';
import styled, { css } from 'styled-components';

import ChipContainer from './[id]/components/ChipContainer';
import VoteDescription from './[id]/components/VoteDescription';
import useExecuteVoteService from './[id]/services/useExecuteVoteService';
import useFilteredStatisticsService from './[id]/services/useFilterStatisticsService';
import OnboardingBottomsheet from './components/OnboardingBottomsheet';
import useFlipAnimation from './hooks/useFlipAnimation';
import useInfiniteMainListService from './services/useGetVoteListService';

export type Drag = 'up' | 'down' | null;

function VoteHomePage() {
  const router = useRouter();
  const [isOnboarding, onToggleOnboarding] = useToggle();

  useEffect(() => {
    if (!userStorage.get() || !!localStorage.getItem('visited_vote')) {
      return;
    }
    onToggleOnboarding();
    localStorage.setItem('visited_vote', 'true');
  }, []);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  /**
   * @TODO 여러번 뜨는 현상 지속시 삭제
   */
  params.get('isSuccess') &&
    toast.success('정상적으로 투표가 등록되었습니다!.', {
      toastId: 'voteSuccess',
    });

  const { isError, isLoading, mainVoteList, nowShowing, onChangeNowShowing } =
    useInfiniteMainListService({
      size: 10,
      sortBy: 'ByTime',
    });

  const {
    onActFlip,
    drag,
    onTouchStartPosition,
    onTouchMoveActFlip,
    onActDragAnimation,
  } = useFlipAnimation(onChangeNowShowing);

  const {
    title,
    imageA,
    imageB,
    titleA,
    titleB,
    detail,
    voteId,
    region,
    postedUserId,
    createdAt,
    voteType,
    drinkAId,
    drinkBId,
    votedCount,
  } = mainVoteList[nowShowing] || {};

  const { isBookmark, mutateBookMark } = useBookmarkService(voteId);

  const { mutate, select } = useExecuteVoteService(voteId);
  const onMutateVoting = useCallback(
    (select: 'A' | 'B') => {
      isLogin() ? mutate(select) : onToggleReplaceLoginPageModal();
    },
    [mutate],
  );

  const moreRef = useRef<HTMLButtonElement>(null);

  const onScrollBottom = () => {
    // 스크롤을 최하단으로 내린다
    moreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { voteStatisticsQuery } = useFilteredStatisticsService(
    Number(voteId),
    '',
    '',
    '',
  );
  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();

  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = voteStatisticsQuery;

  const [enlargement, setEnlargement] = useState<'A' | 'B' | undefined>(
    undefined,
  );

  useEffect(() => {
    // 상단 화살표키가 눌렸을 때 다음 페이지로 넘어가는 기능
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        onActDragAnimation('up');
      } else if (e.key === 'ArrowDown') {
        onActDragAnimation('down');
      } else if (e.key === 'ArrowLeft') {
        setEnlargement('A');
      } else if (e.key === 'ArrowRight') {
        setEnlargement('B');
      }
      // 스페이스바 키 눌렀을 때 투표 기능
      else if (e.key === ' ' || e.key === 'Spacebar') {
        onMutateVoting(enlargement === 'A' ? 'B' : 'A');
      }
    };

    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [enlargement, onChangeNowShowing, onMutateVoting]);

  if (isLoading || isStatisticsLoading) {
    return <Loading />;
  }
  if (isError || isStatisticsError) {
    return <PageInner drag={drag}>에러</PageInner>;
  }

  const { percentageA, percentageB, totalCountA, totalCountB } = statistics;

  return (
    <>
      <Background>
        <ScrollImage onClick={onScrollBottom}>
          <Image src={ImgScroll} alt="스크롤" width={60} height={64} />
        </ScrollImage>
        <AskVoteBox>
          <AskVoteText>
            여행에서 즐길 우리술은
            <br /> 우리술 투표로 해결해요
            <button onClick={onToggleOnboarding}>
              <SvgInfo width={24} height={24} fill="#676767" />
            </button>
          </AskVoteText>
          <div>
            <Button
              variant="primary"
              width="104px"
              height="40px"
              onClick={() =>
                isLogin()
                  ? router.push(Path.POST_PAGE)
                  : onToggleReplaceLoginPageModal()
              }
            >
              작성하기 <BigFont>﹢</BigFont>
            </Button>
          </div>
        </AskVoteBox>
        <Container>
          <PageInner
            className="animate"
            onWheel={onActFlip}
            onTouchStart={onTouchStartPosition}
            onTouchEnd={onTouchMoveActFlip}
            drag={drag}
          >
            <ChipContainer
              voteId={voteId}
              postedUserId={postedUserId}
              title={title}
              date={String(createdAt)}
              region={region}
              description={detail}
              mutateBookMark={mutateBookMark}
              isBookmark={isBookmark}
              votedCount={votedCount}
              onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
            />
            <VoteDescription
              voteType={voteType}
              imageA={imageA}
              imageB={imageB}
              percentageA={percentageA}
              percentageB={percentageB}
              titleA={titleA}
              titleB={titleB}
              totalCountA={totalCountA}
              totalCountB={totalCountB}
              select={select.choice}
              onMutateVoting={onMutateVoting}
              drinkAId={drinkAId}
              drinkBId={drinkBId}
              enlargement={enlargement}
            />
            <MoreButton
              onClick={() => router.push(`vote/${voteId}`)}
              ref={moreRef}
            >
              더보기 <SvgIcDetail width={16} height={16} />
            </MoreButton>
          </PageInner>
          <FirstPageBase className="animate2" drag={drag} />
          <SecondPageBase className="animate3" drag={drag} />
        </Container>
        <EmptyBox />
      </Background>
      <BottomBar />
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
      {isOnboarding && (
        <OnboardingBottomsheet onToggleOnboarding={onToggleOnboarding} />
      )}
    </>
  );
}

const Background = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg_01};
  overflow: scroll;
  height: calc(100svh - 100px);
  // 스크롤 바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
`;

const PageInner = styled.div<{ drag: Drag }>`
  position: relative;
  margin: 0 auto;
  border-radius: 10px;
  min-height: 453px;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 640px;
  padding: 30px;
  z-index: 1000;
  width: 100%;
  ${media.small} {
    height: 600px;
    padding: 40px;
  }

  ${({ drag }) =>
    drag === 'up' &&
    css`
      transition: all 0.5s ease-in-out;
      transform-origin: 50% 0;
      perspective: 600px;
      transform: rotateX(-90deg) scale(0.9, 1.032);
      opacity: 0;
    `}
  ${({ drag }) =>
    drag === 'down' &&
    css`
      transition: all 0.5s ease-in-out;
      transform: rotateX(90deg) scale(0.9, 1.032);
      transform-origin: 50% 100%;
      perspective: 600px;
      opacity: 0.5;
    `}
`;

const AskVoteBox = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 24px 20px;
  max-width: 640px;
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

const FirstPageBase = styled.div<{ drag: Drag }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  width: 90%;
  max-width: 576px;
  min-height: 473px;
  opacity: 0.6;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.small} {
    height: 620px;
  }
  ${({ drag }) =>
    drag === 'up' &&
    css`
      perspective: 600px;
      transform-origin: 50% 0;
      transform: scale(1.11, 0.97);
      opacity: 1;
    `}
  ${({ drag }) =>
    drag === 'down' &&
    css`
      opacity: 1;
      transform: scale(1.11, 0.97);
    `}
`;

const SecondPageBase = styled(FirstPageBase)`
  width: 78%;
  max-width: 496px;
  min-height: 493px;
  opacity: 0;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.small} {
    height: 640px;
  }
  ${({ drag }) =>
    drag === 'up' &&
    css`
      opacity: 0.6;
    `}
  ${({ drag }) =>
    drag === 'down' &&
    css`
      opacity: 0.6;
    `}
`;

const BigFont = styled.span`
  font-size: 17px;
`;

const AskVoteText = styled.div`
  ${({ theme }) => theme.typography.headline02}
  line-height: 130%;
  display: flex;
  align-items: flex-end;
  button {
    margin-left: 8px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-top: 4px;
    height: 29px;
  }
`;

const MoreButton = styled.button`
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  bottom: -60px;
  height: 40px;
  width: 94px;
  border-radius: 8px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.black_02};
    ${theme.typography.button01}
  `};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const ScrollImage = styled.div`
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 1600;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 174px;
`;
export default VoteHomePage;
