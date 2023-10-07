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
import { useToggle } from "@monorepo/hooks";
import SearchRestaurantModal from "./components/SearchRestaurantModal";
import useVoteLoadService from "./services/useVoteLoadService";
import useExecuteVoteService from "./services/useExecuteVoteService";
import useFilteredStatisticsService from "./services/useFilterStatisticsService";
import VoteAnalyzeBar from "./components/VoteAnalyzeBar";
import { useState } from "react";
import useBookmarkService from "services/useBookmarkService";

function Detail() {
  const params = useParams();
  const [filter, setFilter] = useState({
    age: "",
    mbti: "",
    gender: "",
  });

  const postId = params.id;

  const [isSearchRestaurantModal, onToggleSearchRestaurantModal] = useToggle(false);

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

  if (isLoading || isStatisticsLoading) return <div>로딩중</div>;
  if (isError || isStatisticsError) return <div>에러</div>;
  if (!data || !statistics) return <div></div>;
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
  } = data;

  const { percentageA, percentageB, totalCountA, totalCountB } = statistics;
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
          title={title}
          date="20.08.22"
          region={region}
          description={detail}
          mutateBookMark={mutateBookMark}
          isBookmark={isBookmark}
        />
        <VoteDescription
          imageA={imageA || ExImg1}
          imageB={imageB || ExImg1}
          percentageA={percentageA}
          percentageB={percentageB}
          titleA={titleA}
          titleB={titleB}
          totalCountA={totalCountA}
          totalCountB={totalCountB}
          select={select.choice}
          onMutateVoting={onMutateVoting}
        />
        {!!select.choice && (
          <VoteAnalyzeBar
            totalCountA={totalCountA}
            totalCountB={totalCountB}
            percentageA={percentageA}
            percentageB={percentageB}
          />
        )}
        <CommentContainer postId={Number(postId)} />
      </PageInner>
      {isSearchRestaurantModal && (
        <SearchRestaurantModal onToggleSearchRestaurantModal={onToggleSearchRestaurantModal} />
      )}

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

export default Detail;
