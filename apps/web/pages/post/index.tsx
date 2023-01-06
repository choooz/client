import { media } from "@chooz/ui/styles/media";
import { ImageABDetailSection } from "components";
import React from "react";
import usePostVoteService from "services/usePostVoteService";
import styled from "styled-components";

function PostPage() {
  const { onChangeVote, onChangeVoteByParameter, vote, onUploadImage } = usePostVoteService();

  return (
    <PageWrapper>
      <PageInner>
        <ImageABDetailSection
          onChangeVote={onChangeVote}
          onUploadImage={onUploadImage}
          vote={vote}
        />
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
