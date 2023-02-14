import styled, { css } from "styled-components";

interface OptionListProps {
  children: React.ReactNode;
}

function OptionList({ children }: OptionListProps) {
  return (
    <Ul aria-labelledby="select-box-1" id="select-list" role="listbox">
      {children}
    </Ul>
  );
}

const Ul = styled.ul`
  position: absolute;
  margin-top: 8px;
  border-radius: 8px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
  ${({ theme }) =>
    css`
      border: solid 1px ${theme.palette.border.base};
      background-color: ${theme.palette.background.white};
    `}
`;

export default OptionList;
