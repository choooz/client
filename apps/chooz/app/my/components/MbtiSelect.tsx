import { MBTI_LIST } from "lib/constants";
import { Select } from "@chooz/ui";
import styled, { css } from "styled-components";
import { useToggle } from "@monorepo/hooks";
import { SelectIndicator } from "public/icons";

interface Props {
  mbtiOption: string;
  onChangeMbti: (id: string) => void;
}

function MbtiSelect({ mbtiOption, onChangeMbti }: Props) {
  const [isOpen, onToggleOpen] = useToggle();
  return (
    <SelectStyled isOpen={isOpen}>
      <Select
        defaultValue={mbtiOption}
        onChangeSelectedOption={onChangeMbti}
        options={MBTI_LIST}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
      >
        <SelectIndicator />
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.span<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    color: ${theme.palette.ink.dark};
    ${({ theme }) => theme.textStyle.Font_Regular};
    width: 100%;
    height: 40px;
    .selected-text-container {
      border: 1px solid ${theme.palette.border.base};
      border-radius: 4px;
      padding: 11px 13px;
    }
    ul {
      width: 87%;
    }
    svg {
      ${isOpen && "transform: rotateX( 180deg )"}
    }
  `}
`;

export default MbtiSelect;
