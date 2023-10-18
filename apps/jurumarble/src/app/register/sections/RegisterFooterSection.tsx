'use client';

import styled from 'styled-components';

import { Button } from '../components';
import { useRegisterContext } from '../contexts';

export const RegisterFooterSection = () => {
  const { onNextStep, buttonDisabled } = useRegisterContext();

  return (
    <Wrapper>
      <Button onClick={onNextStep} fullWidth disabled={buttonDisabled}>
        다음
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 20px 24px;
  position: fixed;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  right: 0;
  left: 0;
  bottom: calc(constant(safe-area-inset-bottom) + 24px);
  bottom: calc(env(safe-area-inset-bottom) + 24px);
`;
