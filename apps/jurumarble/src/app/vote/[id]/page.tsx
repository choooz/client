"use client";

import Header from "components/Header";
import styled, { css } from "styled-components";
import VoteWriterBox from "./components/VoteWriterBox";
import { ExImg1 } from "public/images";
import BottomBar from "components/BottomBar";
import VoteDescription from "./components/VoteDescription";
import ChipContainer from "./components/ChipContainer";
import CommentContainer from "./components/CommentContainer";
import { useParams } from "next/navigation";
import useVoteLoadService from "./services/useVoteLoadService";
import useExecuteVoteService from "./services/useExecuteVoteService";
import useFilteredStatisticsService from "./services/useFilterStatisticsService";
import VoteAnalyzeBar from "./components/VoteAnalyzeBar";
import { useState } from "react";
import useBookmarkService from "services/useBookmarkService";
import Loading from "components/Loading";
import RegionSmallSelect from "app/search/components/RegionSmallSelect";
import {
  DRINK_INFO_SORT_LIST,
  MBTI_LIST,
  VOTE_AGE_FILTER_LIST,
  VOTE_ALCOHOL_FILTER_LIST,
  VOTE_GENDER_FILTER_LIST,
  VOTE_MBTI_LIST,
} from "lib/constants";
import VoteSmallSelectFilter from "./components/VoteSmallSelectFilter";

function Detail() {
  const params = useParams();
  const [filter, setFilter] = useState({
    age: "",
    mbti: "",
    gender: "",
    alcohol: "",
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
  const onMutateVoting = (select: "A" | "B") => {
    mutate(select);
  };
  const { voteStatisticsQuery } = useFilteredStatisticsService(
    Number(postId),
    filter.gender,
    filter.age,
    filter.mbti,
  );
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = voteStatisticsQuery;

  const { voteStatisticsQuery: originalStaticsQuery } = useFilteredStatisticsService(
    Number(postId),
  );
  const {
    data: originalStatistics,
    isLoading: isOriginalStatisticsLoading,
    isError: isOriginalStatisticsError,
  } = originalStaticsQuery;

  if (isLoading || isStatisticsLoading || isOriginalStatisticsLoading) return <Loading />;
  if (isError || isStatisticsError || isOriginalStatisticsError) return <div>에러</div>;
  if (!data || !statistics || !originalStatistics) return <div></div>;
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
      <Header />
      <VoteWriterBox
        writer={{
          nickName: postedUserNickname,
          userAge: postedUserAge,
          userGender: postedUserGender,
          userImage: postedUserImageUrl || ExImg1,
          alchol: postedUserAlcoholLimit,
          userMbti: postedUserMbti,
        }}
      />
      <PageInner>
        <ChipContainer
          voteId={Number(data.voteId)}
          title={title}
          date={String(createdAt)}
          region={region}
          description={detail}
          mutateBookMark={mutateBookMark}
          isBookmark={isBookmark}
          postedUserId={data.postedUserId}
        />
        <VoteDescription
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
            <VoteAnalyzeBar
              totalCountA={totalCountA}
              totalCountB={totalCountB}
              percentageA={percentageA}
              percentageB={percentageB}
            />
            <div>
              <FilterBox>
                <VoteSmallSelectFilter
                  defaultOption={filter.gender}
                  onChangeSortOption={(id) => onChangeFilter("gender", id)}
                  options={VOTE_GENDER_FILTER_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.age}
                  onChangeSortOption={(id) => onChangeFilter("age", id)}
                  options={VOTE_AGE_FILTER_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.mbti}
                  onChangeSortOption={(id) => onChangeFilter("mbti", id)}
                  options={VOTE_MBTI_LIST}
                />
                <VoteSmallSelectFilter
                  defaultOption={filter.alcohol}
                  onChangeSortOption={(id) => onChangeFilter("alcohol", id)}
                  options={VOTE_ALCOHOL_FILTER_LIST}
                />
              </FilterBox>
            </div>
          </>
        )}

        <CommentContainer postId={Number(postId)} />
      </PageInner>
      <BottomBar />
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
  justify-content: space-between;
`;

export default Detail;
