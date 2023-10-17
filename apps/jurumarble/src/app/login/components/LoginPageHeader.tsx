import VoteHeader from "components/VoteHeader";
import { Button } from "components/button";
import { useRouter } from "next/navigation";
import { SvgIcPrevious } from "src/assets/icons/components";
import styled, { css } from "styled-components";

function LoginPageHeader() {
  const router = useRouter();

  return (
    <VoteHeader
      leftButton={
        <PreviousButton onClick={() => router.back()}>
          <SvgIcPrevious width={24} height={24} />
        </PreviousButton>
      }
    >
      <></>
    </VoteHeader>
  );
}

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

export default LoginPageHeader;
