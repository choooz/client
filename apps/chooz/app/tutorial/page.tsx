"use client";

import { Button } from "@monorepo/ui";
import React from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import TutorialCarousel from "./TutorialCarousel";

function TutorialPage() {
  return (
    <PageWrapper>
      <PageInner>
        <TutorialCarousel />
        <ButtonWrapper>
          <Button variant="primary" width={"100%"} height="56px">
            시작하기
          </Button>
        </ButtonWrapper>
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
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  height: calc(100vh - 30px - 55px);
  ${media.medium} {
    padding: 80px;
    height: calc(100vh - 60px - 55px);
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  ${media.medium} {
    padding: 30px;
  }
`;

export default TutorialPage;
