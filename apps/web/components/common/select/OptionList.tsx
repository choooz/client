import { Portal, transitions } from "@chooz/ui";
import styled from "styled-components";

interface OptionListProps {
  children: React.ReactNode;
}

export function OptionList({ children }: OptionListProps) {
  return (
    <Ul aria-labelledby="select-box-1" id="select-list" role="listbox">
      {children}
    </Ul>
  );
}

const Ul = styled.ul`
  position: absolute;
  width: 136px;
  height: 246px;
  margin-top: 8px;
  padding: 20px 0 0 20px;
  border-radius: 8px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px var(--invalid-name);
  z-index: 99;
  background-color: ${({ theme }) => theme.palette.background.white};
`;
