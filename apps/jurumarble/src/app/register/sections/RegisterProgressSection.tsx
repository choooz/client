"use client";

import styled from "styled-components";
import { ProgressBar } from "../components";
import { useRegisterContext } from "../contexts";

export const RegisterProgressSection = () => {
  const { stepList, currentStepIndex } = useRegisterContext();

  const progress = (currentStepIndex / stepList.length) * 100;
  const progressPercent = progress.toFixed(0);

  return (
    <Wrapper>
      <ProgressBar
        progress={`${+progressPercent}%`}
        total={stepList.length}
        currentIndex={currentStepIndex}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 8px 20px 0;
`;
