import { Select } from "@chooz/ui";
import styled from "styled-components";
import { media } from "styles/media";
import { useToggle } from "@monorepo/hooks";
import { SELECT_BOX_CATEGORY_LIST } from "types/vote";

interface Props {
  categoryOption: string;
  onChangeCategoryOption: (id: string) => void;
}

function CategorySelect({ categoryOption, onChangeCategoryOption }: Props) {
  const [isOpen, onToggleOpen] = useToggle();
  return (
    <SelectStyled>
      <Select
        defaultValue={categoryOption}
        onChangeSelectedOption={onChangeCategoryOption}
        options={SELECT_BOX_CATEGORY_LIST}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
      >
        {isOpen ? <>▴</> : <>▾</>}
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.div`
  width: 68px;

  ${({ theme }) => `
    ${theme.textStyle.Title_Large};
    color: ${theme.palette.ink.darker};
    .selected-label {
        font-weight: 700;
      }
    ${media.medium} {
      ${theme.textStyle.Title_3};
      width: 104px;
    }
  `}
`;

export default CategorySelect;
