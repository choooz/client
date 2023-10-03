import styled, { css } from "styled-components";
import { useToggle } from "@monorepo/hooks";
import SvgIcExpandMore from "src/assets/icons/components/IcExpandMore";
import { Select } from "components/selectBox";

interface Props {
  defaultOption: string;
  onChangeSortOption: (id: string) => void;
  options: { value: string; label: string }[];
}

function RegionSmallSelect({ defaultOption, onChangeSortOption, options }: Props) {
  const [isOpen, onToggleOpen] = useToggle();

  return (
    <SelectStyled isOpen={isOpen}>
      <Select
        defaultValue={defaultOption}
        onChangeSelectedOption={onChangeSortOption}
        options={options}
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
    /* height: 40px; */
    .selected-label {
      border: 1px solid ${theme.colors.line_01};
      border-radius: 8px;
      padding: 10px 12px;
    }
    svg {
      ${isOpen && "transform: rotateX( 180deg )"}
    }
    #select-list {
      width: 100px;
      height: 78px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0;
      gap: 20px;
    }
    #indicator {
      display: flex;
    }
  `}
`;

export default RegionSmallSelect;
