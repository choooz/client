import styled from "styled-components";

interface Props {
  label: string;
  onChangeSelectedOption: () => void;
}

function Option({ label, onChangeSelectedOption }: Props) {
  return (
    <Li role="option" onClick={onChangeSelectedOption}>
      {label}
    </Li>
  );
}

const Li = styled.li`
  padding: 14px 34px;
  :hover {
    background-color: ${({ theme }) => theme.palette.background.selectedSoft};
  }
`;

export default Option;
