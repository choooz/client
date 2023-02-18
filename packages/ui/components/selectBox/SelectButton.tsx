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
        <SelectedText className="selected-text-container">{children}</SelectedText>
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  display: contents;
`;

const SelectedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default SelectButton;
