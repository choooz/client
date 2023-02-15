import styled from "styled-components";

interface OptionProps {
  id: string;
  name: string;
  onChangeOption: (value: string) => void;
}

function Option({ id, name, onChangeOption }: OptionProps) {
  return (
    <Li role="option" onClick={() => onChangeOption(id)}>
      {name}
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 34px;
  ${({ theme }) => theme.textStyle.Title_Small};

  :hover {
    background-color: ${({ theme }) => theme.palette.background.selectedSoft};
  }
`;

export default Option;
