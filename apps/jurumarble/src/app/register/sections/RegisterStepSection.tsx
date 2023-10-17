"use client";

import styled from "styled-components";

import { ContentHeader } from "../components";
import WarningSmallModal from "../components/WarningModal";
import { REGISTER_STEPS_CONTENT } from "../constants";
import { useRegisterContext } from "../contexts";

export const RegisterStepSection = () => {
  const { step, isWarningModal } = useRegisterContext();

  const { title, subTitle, component } = REGISTER_STEPS_CONTENT[step];

  return (
    <Wrapper>
      <>
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
