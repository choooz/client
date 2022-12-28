import InterestSection from "components/register/InterestSection";
import React from "react";
import styled from "styled-components";
import { media } from "styles/media";

function Interest() {
  return (
    <PageWrapper>
      <PageInner>
        <InterestSection />
      </PageInner>
    </PageWrapper>
  );
}

export default Interest;

const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: 724px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 800px;
    padding: 80px;
  }
`;
