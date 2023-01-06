import { media } from "@chooz/ui/styles/media";
import { ImageUploadContainer } from "components";
import React from "react";
import styled from "styled-components";

function PostPage() {
  return (
    <PageWrapper>
      <PageInner>
        <ImageUploadContainer />
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
