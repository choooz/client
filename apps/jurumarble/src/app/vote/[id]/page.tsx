'use client';

import { useMemo, useState } from 'react';

import { useToggle } from '@monorepo/hooks';
import Loading from 'components/Loading';
import ReplaceLoginPageModal from 'components/ReplaceLoginPagemModal/ReplaceLoginPageModal';
import {
  VOTE_AGE_FILTER_LIST,
  VOTE_ALCOHOL_FILTER_LIST,
  VOTE_GENDER_FILTER_LIST,
  VOTE_MBTI_LIST,
} from 'lib/constants';
import { isLogin } from 'lib/utils/auth';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import {
  DrinkCapacityHigh,
  DrinkCapacityLow,
  DrinkCapacityMedium,
} from 'public/images';
import useBookmarkService from 'services/useBookmarkService';
import styled, { css } from 'styled-components';

import VoteSmallSelectFilter from './components/VoteSmallSelectFilter';
import VoteWriterBox from './components/VoteWriterBox';
import useExecuteVoteService from './services/useExecuteVoteService';
import useFilteredStatisticsService from './services/useFilterStatisticsService';
import useVoteLoadService from './services/useVoteLoadService';

const DynamicChipContainer = dynamic(
  () => import('./components/DetailChipContainer'),
);
const DynamicVoteDescription = dynamic(
  () => import('./components/VoteDescription'),
);
const DynamicCommentContainer = dynamic(
  () => import('./components/CommentContainer'),
);
const DynamicVoteAnalyzeBar = dynamic(
  () => import('./components/VoteAnalyzeBar'),
);

function Detail() {
  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();
  const params = useParams();

  const [filter, setFilter] = useState({
    age: '',
    mbti: '',
    gender: '',
    alcohol: '',
  });

  const onChangeFilter = (filterKey: string, value: string) => {
    setFilter({
      ...filter,
      [filterKey]: value,
    });
  };

  const postId = params.id;

  const { data, isError, isLoading } = useVoteLoadService(Number(postId));

  const { mutateBookMark, isBookmark } = useBookmarkService(Number(postId));

  const { mutate, select } = useExecuteVoteService(Number(data?.voteId));
  const onMutateVoting = (select: 'A' | 'B') => {
    isLogin() ? mutate(select) : onToggleReplaceLoginPageModal();
  };
  const { voteStatisticsQuery } = useFilteredStatisticsService(
    Number(postId),
    filter.gender,
    filter.mbti,
    filter.age,
    filter.alcohol,
  );
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = voteStatisticsQuery;

  const { voteStatisticsQuery: originalStaticsQuery } =
    useFilteredStatisticsService(Number(postId));
  const {
    data: originalStatistics,
    isLoading: isOriginalStatisticsLoading,
    isError: isOriginalStatisticsError,
  } = originalStaticsQuery;

  const EmptyImage = useMemo(() => {
    if (data?.postedUserAlcoholLimit === 'LOW') {
      return DrinkCapacityLow;
    }
    if (data?.postedUserAlcoholLimit === 'MEDIUM') {
      return DrinkCapacityMedium;
    }
    return DrinkCapacityHigh;
  }, [data?.postedUserAlcoholLimit]);

  if (isLoading || isStatisticsLoading || isOriginalStatisticsLoading) {
    return <Loading />;
  }
  if (isError || isStatisticsError || isOriginalStatisticsError) {
    return <div>에러</div>;
  }
  if (!data || !statistics || !originalStatistics) {
    return <div />;
  }
  const {
    detail,
    title,
    titleA,
    titleB,
    region,
    imageA,
    imageB,
    postedUserAge,
    postedUserGender,
    postedUserMbti,
    postedUserImageUrl,
    postedUserNickname,
    postedUserAlcoholLimit,
    createdAt,
    votedCount,
  } = data;

  const { percentageA, percentageB, totalCountA, totalCountB } = statistics;
  const {
    percentageA: originalPercentageA,
    percentageB: originalPercentageB,
    totalCountA: originalTotalCountA,
    totalCountB: originalTotalCountB,
  } = originalStatistics;
  return (
    <Container>
      <VoteWriterBox
        writer={{
          alchol: postedUserAlcoholLimit,
          nickName: postedUserNickname,
          userAge: postedUserAge,
          userGender: postedUserGender,
          userImage: postedUserImageUrl || EmptyImage,
          userMbti: postedUserMbti,
        }}
      />
      <PageInner>
        <DynamicChipContainer
          voteId={Number(data.voteId)}
          title={title}
          date={String(createdAt)}
          region={region}
          description={detail}
          mutateBookMark={mutateBookMark}
          isBookmark={isBookmark}
          postedUserId={data.postedUserId}
          votedCount={votedCount}
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
        <DynamicVoteDescription
          imageA={imageA}
          imageB={imageB}
          percentageA={originalPercentageA}
          percentageB={originalPercentageB}
          titleA={titleA}
          titleB={titleB}
          totalCountA={originalTotalCountA}
          totalCountB={originalTotalCountB}
          select={select.choice}
          onMutateVoting={onMutateVoting}
          voteType={data.voteType}
          drinkAId={data.drinkAId}
          drinkBId={data.drinkBId}
        />
        {!!select.choice && (
          <>
            <DynamicVoteAnalyzeBar
              totalCountA={totalCountA}
              totalCountB={totalCountB}
              percentageA={percentageA}
              percentageB={percentageB}
            />
            <div>
              <FilterBox>
                <VoteSmallSelectFilter
                  defaultOption={filter.gender}
                  onChangeSortOption={(id) => onChangeFilter('gender', id)}
                  options={VOTE_GENDER_FILTER_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.age}
                  onChangeSortOption={(id) => onChangeFilter('age', id)}
                  options={VOTE_AGE_FILTER_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.mbti}
                  onChangeSortOption={(id) => onChangeFilter('mbti', id)}
                  options={VOTE_MBTI_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.alcohol}
                  onChangeSortOption={(id) => onChangeFilter('alcohol', id)}
                  options={VOTE_ALCOHOL_FILTER_LIST}
                />
              </FilterBox>
            </div>
          </>
        )}
        <DynamicCommentContainer postId={Number(postId)} region={region} />
      </PageInner>
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
  scrollbar-width: none;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_02};
  `}
  min-height:100vh;
`;

const PageInner = styled.div`
  padding: 20px;
  border-top-left-radius: 20px;
  border-bottom: none;
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FilterBox = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
`;

export default Detail;
