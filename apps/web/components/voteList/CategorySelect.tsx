import { CATEGORY_LIST } from "lib/constants";
import { Select } from "@chooz/ui";
import styled, { css } from "styled-components";
import { media } from "styles/media";

interface Props {
  categoryOption: string;
  onChangeCategoryOption: (id: string) => void;
}

function CategorySelect({ categoryOption, onChangeCategoryOption }: Props) {
  return (
    <SelectStyled>
      <Select
        defaultValue={categoryOption}
        onChangeSelectedOption={onChangeCategoryOption}
        options={CATEGORY_LIST}
      >
        ▴
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.div`
  width: 104px;
  ${({ theme }) => `
    ${theme.textStyle.Title_Large};
    color: ${theme.palette.ink.dark};
    .selected-text-container {
        font-weight: 700;
      }
    ${media.medium} {
      ${theme.textStyle.Title_3};
    }
  `}
`;

export default CategorySelect;
