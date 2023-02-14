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
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  width: 80px;
  height: 40px;
  > span {
    /* margin-right: 18px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
`;

export default SelectButton;
