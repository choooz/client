import styled, { css } from 'styled-components';

function DivideLine() {
  return <DivideLineStyled />;
}

const DivideLineStyled = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_01};
    height: 8px;
    margin-bottom: 8px;
  `}
`;

export default DivideLine;
