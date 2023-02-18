import { SORT_LIST } from "lib/constants";
import styled, { css } from "styled-components";
import { Select } from "@chooz/ui";
import { SelectIndicator } from "public/icons";
import { media } from "styles/media";

interface Props {
  sortOption: string;
  onChangeSortOption: (id: string) => void;
}

function SortSelectBox({ sortOption, onChangeSortOption }: Props) {
  return (
    <SelectStyled>
      <Select
        defaultValue={sortOption}
        onChangeSelectedOption={onChangeSortOption}
        options={SORT_LIST}
      >
        <SelectIndicator />
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.span`
  ${({ theme }) => css`
    color: ${theme.palette.ink.dark};
    ${theme.textStyle.Title_Small};

    button {
      width: 80px;
      height: 40px;
      border: 1px solid ${theme.palette.border.base};
      > span {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        align-items: center;
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

export default SortSelectBox;
