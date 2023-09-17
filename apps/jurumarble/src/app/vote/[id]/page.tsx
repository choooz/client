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
import { useSearchParams } from "next/navigation";
import { useToggle } from "@monorepo/hooks";
import SearchRestaurantModal from "./components/SearchRestaurantModal";

function Detail() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const onMutateVoting = (select: "A" | "B") => {
    setSelected(select);
  };

  const [isSearchRestaurantModal, onToggleSearchRestaurantModal] = useToggle(true);

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
        {/* <ChipContainer /> */}
        <VoteDescription
          imageA={ExImg1}
          imageB={ExImg1}
          percentageA={50}
          percentageB={50}
          titleA={"A가 더 좋아요"}
          titleB={"B가 더 좋아요"}
          totalCountA={100}
          totalCountB={100}
          select={selected}
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
