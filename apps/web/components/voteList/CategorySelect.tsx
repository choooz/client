import { CATEGORY_LIST } from "lib/constants";
import { Select } from "@chooz/ui";
import { SelectIndicator } from "public/icons";
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

const SelectStyled = styled.span`
  ${({ theme }) => css`
    color: ${theme.palette.ink.dark};
    ${theme.textStyle.Title_3};
    ${media.medium} {
      ${theme.textStyle.Title_Large};
    }
    button {
      display: flex;
      justify-content: space-around;
      > span {
        margin-left: 8px;
        flex-direction: row;
        align-items: center;
        font-weight: 700;
      }
    }
    ul {
      position: absolute;
      margin-top: 8px;
      border-radius: 8px;
      box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
      z-index: 99;
      border: solid 1px ${theme.palette.border.base};
      background-color: ${theme.palette.background.white};
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 14px 34px;
      :hover {
        background-color: ${theme.palette.background.selectedSoft};
      }
    }
  `}
`;

export default CategorySelect;
