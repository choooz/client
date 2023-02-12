import styled from "styled-components";

interface OptionProps {
  name: string;
  onChangeOption: (value: string) => void;
}

function Option({ name, onChangeOption }: OptionProps) {
  return (
    <Li role="option" onClick={() => onChangeOption(name)}>
      {name}
    </Li>
  );
}

const Li = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  ${({ theme }) => theme.textStyle.Title_Small};
`;

export default Option;
