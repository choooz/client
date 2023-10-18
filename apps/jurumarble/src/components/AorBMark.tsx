import styled, { css } from 'styled-components';

interface Props {
  AorB: string;
  children?: React.ReactNode;
}

function AorBMark({ AorB, children }: Props) {
  return <AorBMarkStyled AorB={AorB}>{children}</AorBMarkStyled>;
}

const AorBMarkStyled = styled.div<{ AorB: string }>`
  ${({ theme, AorB }) => css`
    ${theme.typography.caption_chip}
    background-color: ${AorB === 'A'
      ? theme.colors.sub_01
      : theme.colors.sub_02};
    color: ${theme.colors.white};
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 0px 4px 0px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export default AorBMark;
