import { SideButtonHeader } from 'components/SideButtonHeader';
import { Button } from 'components/button';
import { SvgIcPrevious } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

import { useRegisterContext } from '../contexts';

function RegisterHeader() {
  const { step, onPrevStep } = useRegisterContext();

  return (
    <SideButtonHeader
      leftButton={
        step !== 'STEP1' && (
          <PreviousButton onClick={onPrevStep}>
            <SvgIcPrevious width={24} height={24} />
          </PreviousButton>
        )
      }
    >
      회원가입
    </SideButtonHeader>
  );
}

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    margin-left: 20px;
    background-color: ${theme.colors.white};
  `}
`;

export default RegisterHeader;
