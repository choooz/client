import { media } from "@chooz/ui/styles/media";
import { ImageTitleSection, TargetSection } from "components";
import React, { useState } from "react";
import usePostVoteService from "services/usePostVoteService";
import styled from "styled-components";

function PostPage() {
  const { onChangeVote, vote, onUploadImage, onChangeVoteByClick, onChangeVoteBySelect } =
    usePostVoteService();
  const [postStep, setPostStep] = useState<number>(1);
  const onChangePostStep = (step: number) => {
    setPostStep(step);
  };
  console.log(vote.filteredGender, vote.filteredAge, vote.filteredMbti);
  return (
    <PageWrapper>
      <PageInner>
        {postStep === 1 && (
          <ImageTitleSection
            onChangeVote={onChangeVote}
            onUploadImage={onUploadImage}
            onChangePostStep={onChangePostStep}
            vote={vote}
          />
        )}
        {postStep === 2 && (
          <TargetSection
            onChangeVoteByClick={onChangeVoteByClick}
            vote={vote}
            onChangeVoteBySelect={onChangeVoteBySelect}
          />
        )}
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  padding-top: 72px;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: 717px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 717px;
    padding: 40px;
  }
`;

export default PostPage;
