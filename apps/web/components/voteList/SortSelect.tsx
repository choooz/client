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
    color: ${theme.palette.ink.base};
    ${({ theme }) => theme.textStyle.Font_Regular};
    width: 80px;
    height: 40px;
    .selected-text-container {
      border: 1px solid ${theme.palette.border.base};
      border-radius: 4px;
      padding: 11px 13px;
    }
  `}
`;

export default SortSelectBox;
