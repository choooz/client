import { SelectBoxIcon } from "public/icons";
import styled from "styled-components";

interface SelectProps {
  children: React.ReactNode;
  onChangeOpen: () => void;
}

function SelectButton({ children, onChangeOpen }: SelectProps) {
  return (
    <>
      <StyledButton
        type="button"
        id="select-box-1"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls="select-list"
        onClick={onChangeOpen}
      >
        <span>{children}</span>
        <SelectBoxIcon />
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    margin-right: 18px;
  }
`;

export default SelectButton;
