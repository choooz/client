"use client";

import { media } from "@chooz/ui/styles/media";
import { ImageTitleSection, TargetSection } from "components";
import { FIRST_STEP, SECOND_STEP } from "lib/constants";
import React, { useState } from "react";
import usePostVoteService from "services/usePostVoteService";
import styled from "styled-components";

function PostPage() {
  const {
    onChangeVote,
    vote,
    onUploadImage,
    onChangeVoteByClick,
    onChangeVoteBySelect,
    mutateVote,
    onResetVoteFilter,
  } = usePostVoteService();
  const [postStep, setPostStep] = useState<number>(FIRST_STEP);
  const onChangePostStep = (step: number) => {
    setPostStep(step);
  };

  return (
    <PageWrapper>
      <PageInner>
        {postStep === FIRST_STEP && (
          <ImageTitleSection
            onChangeVote={onChangeVote}
            onUploadImage={onUploadImage}
            onChangePostStep={onChangePostStep}
            vote={vote}
          />
        )}
        {postStep === SECOND_STEP && (
          <TargetSection
            onChangeVoteByClick={onChangeVoteByClick}
            vote={vote}
            onChangeVoteBySelect={onChangeVoteBySelect}
            mutateVote={mutateVote}
            onChangePostStep={onChangePostStep}
            filteredMbti={vote.filteredMbti}
            onResetVoteFilter={onResetVoteFilter}
          />
        )}
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  ${media.medium} {
    padding-top: 40px;
  }
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  height: calc(100vh - 30px - 55px);
  ${media.medium} {
    padding: 40px;
    height: calc(100vh - 60px - 55px);
  }
`;

export default PostPage;
