import { useToggle } from "@monorepo/hooks";
import { Select } from "components/selectBox";
import { REGION_LIST } from "lib/constants";
import SvgIcExpandMore from "src/assets/icons/components/IcExpandMore";
import styled, { css } from "styled-components";

interface Props {
  defaultOption: string;
  onChangeSortOption: (id: string) => void;
}

function RegionSmallSelect({ defaultOption, onChangeSortOption }: Props) {
  const [isOpen, onToggleOpen] = useToggle();

  return (
    <SelectStyled isOpen={isOpen}>
      <Select
        defaultValue={defaultOption}
        onChangeSelectedOption={onChangeSortOption}
        options={[{ value: "", label: "지역", lat: 0, long: 0 }, ...REGION_LIST]}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
      >
        <SvgIcExpandMore width={20} height={20} />
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.span<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    ${theme.typography.button01};
    color: ${theme.colors.black_03};
    width: 85px;
    height: 40px;
    .selected-label {
      border: 1px solid ${theme.colors.line_01};
      border-radius: 8px;
      padding: 10px 12px;
    }
    svg {
      ${isOpen && "transform: rotateX( 180deg )"}
    }
  `}
  #select-list {
    width: 85px;
    height: 200px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
  }
  #indicator {
    display: flex;
  }
`;

export default RegionSmallSelect;
