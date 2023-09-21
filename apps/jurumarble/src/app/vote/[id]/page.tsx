"use client";

import Header from "components/Header";
import styled, { css } from "styled-components";
import VoteWriterBox from "./components/VoteWriterBox";
import { ExImg1 } from "public/images";
import BottomBar from "components/BottomBar";
import VoteDescription from "./components/VoteDescription";
import { useState } from "react";
import ChipContainer from "./components/ChipContainer";
import CommentContainer from "./components/CommentContainer";
import { useParams, useSearchParams } from "next/navigation";
import { useToggle } from "@monorepo/hooks";
import SearchRestaurantModal from "./components/SearchRestaurantModal";
import usePostBookmarkService from "../services/useBookmarkService";
import useVoteLoadService from "./services/useVoteLoadService";
import useExecuteVoteService from "./services/useExecuteVoteService";

function Detail() {
  const params = useParams();

  const postId = params.id;
  const [selected, setSelected] = useState<"A" | "B" | null>(null);

  const [isSearchRestaurantModal, onToggleSearchRestaurantModal] = useToggle(true);

  const { data, isError, isLoading } = useVoteLoadService(Number(postId));

  const { mutateBookMark, bookMarkCheckQuery } = usePostBookmarkService(Number(postId));

  const { mutate, select } = useExecuteVoteService(Number(postId));
  const onMutateVoting = (select: "A" | "B") => {
    mutate(select);
  };

  const { data: bookmarkCheck } = bookMarkCheckQuery;

  const isBookmark = bookmarkCheck?.bookmarked || false;

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (!data) return <div></div>;
  const { detail, title, titleA, titleB, region, imageA, imageB } = data;

  return (
    <Container>
      <Header />

      <VoteWriterBox
        writer={{
          nickName: "김민수",
          userAge: 10,
          userGender: "여",
          userImage: ExImg1,
          alchol: "10병",
          userMbti: "ENFP",
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
          percentageA={50}
          percentageB={50}
          titleA={titleA}
          titleB={titleB}
          totalCountA={100}
          totalCountB={100}
          select={select.choice}
          onMutateVoting={onMutateVoting}
        />
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
