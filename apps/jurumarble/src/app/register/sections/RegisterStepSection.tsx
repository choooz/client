"use client";

import styled from "styled-components";
import { ContentHeader, Tooltip } from "../components";
import { REGISTER_STEPS_CONTENT } from "../constants";
import { useRegisterContext } from "../contexts";
import WarningSmallModal from "../components/WarningModal";

export const RegisterStepSection = () => {
  const { step, isWarningModal } = useRegisterContext();

  const { title, subTitle, component } = REGISTER_STEPS_CONTENT[step];

  return (
    <Wrapper>
      <>
        {step === "STEP1" && <StyledTooltip>주루마블에 오신 여행자님 환영합니다!</StyledTooltip>}
        <ContentHeader title={title} subTitle={subTitle} />
        {component()}
      </>
      {isWarningModal && <WarningSmallModal />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 20px;
`;

const StyledTooltip = styled(Tooltip)`
  margin-bottom: 20px;
`;
