import { media } from "@chooz/ui/styles/media";
import { useMutation } from "@tanstack/react-query";
import { ImageTitleSection, TargetSection } from "components";
import { postVoteAPI } from "lib/api/vote";
import { useRouter } from "next/router";
import React, { useState } from "react";
import usePostVoteService from "services/usePostVoteService";
import styled from "styled-components";

function PostPage() {
  const router = useRouter();
  const { onChangeVote, vote, onUploadImage, onChangeVoteByClick, onChangeVoteBySelect } =
    usePostVoteService();
  const [postStep, setPostStep] = useState<number>(1);
  const onChangePostStep = (step: number) => {
    setPostStep(step);
  };

  const { mutate: mutateVote } = useMutation(() => postVoteAPI(vote), {
    onSuccess: () => {
      router.push("/");
    },
  });

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
            mutateVote={mutateVote}
            onChangePostStep={onChangePostStep}
          />
        )}
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  padding-top: 12px;
  ${media.medium} {
    padding-top: 72px;
  }
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
