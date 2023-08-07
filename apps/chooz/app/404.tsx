import React from "react";
import styled from "styled-components";
import { media } from "styles/media";

function NotFoundPage() {
  return (
    <PageWrapper>
      <PageInner>잘못된 접근입니다 ㅠㅠ</PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: 558px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 717px;
    padding: 80px;
  }
`;

export default NotFoundPage;
