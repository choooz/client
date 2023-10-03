import { useToggle } from "@monorepo/hooks";
import { Select } from "components/selectBox";
import { REGION_LIST } from "lib/constants";
import SvgArrowDown from "src/assets/icons/components/IcArrowDown";

import styled, { css } from "styled-components";

interface Props {
  regionOption: string;
  onChangeRegionOption: (id: string) => void;
}

REGION_LIST.unshift({ value: "", label: "지역을 선택해주세요 " });

function RegionSelect({ regionOption, onChangeRegionOption }: Props) {
  const [isOpen, onToggleOpen] = useToggle();
  return (
    <SelectStyled isOpen={isOpen}>
      <Select
        defaultValue={regionOption}
        onChangeSelectedOption={onChangeRegionOption}
        options={REGION_LIST}
        isOpen={isOpen}
        onToggleOpen={onToggleOpen}
      >
        <SvgArrowDown width={24} height={24} />
      </Select>
    </SelectStyled>
  );
}

const SelectStyled = styled.div<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    ${theme.typography.button01};
    color: ${theme.colors.black_03};
    border: 1px solid ${theme.colors.black_05};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 8px;

    #indicator {
      display: flex;
      align-items: center;
      color: ${theme.colors.black_01};
    }
    #select-list {
      overflow: auto;
      top: 6px;
      left: -100px;
      width: 335px;
      height: 330px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    li {
      display: flex;
      justify-content: center;
      ${theme.typography.button01};
    }
    svg {
      ${isOpen && "transform: rotateX( 180deg )"}
    }
  `}
`;

export default RegionSelect;
