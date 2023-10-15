import { useToggle, useOutsideClick } from "@monorepo/hooks";
import { REGION_LIST } from "lib/constants";
import { useId } from "react";
import { SvgArrowDown } from "src/assets/icons/components";
import styled, { css } from "styled-components";

interface Props {
  regionOption: string;
  onChangeRegionOption: (id: string) => void;
}

const COPIED_REGION_LIST = [
  { value: "", label: "지역을 선택해주세요.", lat: 0, long: 0 },
  ...REGION_LIST,
];

function RegionSelect({ regionOption, onChangeRegionOption }: Props) {
  const [isOpen, onToggleOpen] = useToggle();
  const { targetEl } = useOutsideClick<HTMLDivElement>(isOpen, onToggleOpen);
  const uniqueId = useId();

  return (
    <SelectStyled isOpen={isOpen}>
      <div ref={targetEl}>
        <SelectButton
          type="button"
          id={`select-box-${uniqueId}`}
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls={`select-list-${uniqueId}`}
          onClick={onToggleOpen}
        >
          <SelectedText className="selected-label">
            {COPIED_REGION_LIST.find(({ value }) => value === regionOption)?.label}
            <span id="indicator">
              <SvgArrowDown width={24} height={24} />
            </span>
          </SelectedText>
        </SelectButton>
        {isOpen ? (
          <Ul
            id={`select-list-${uniqueId}`}
            aria-labelledby={`select-box-${uniqueId}`}
            role="listbox"
          >
            {COPIED_REGION_LIST.map(({ value, label }) => (
              <Li
                key={`select_${value}`}
                onClick={() => {
                  onChangeRegionOption(value);
                  onToggleOpen();
                }}
              >
                {label}
              </Li>
            ))}
          </Ul>
        ) : null}
      </div>
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
    position: relative;

    #indicator {
      display: flex;
      align-items: center;
      color: ${theme.colors.black_01};
    }
    svg {
      ${isOpen && "transform: rotateX( 180deg )"}
    }
  `}
`;

const SelectButton = styled.button`
  display: contents;
`;

const SelectedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Ul = styled.ul`
  ${({ theme }) =>
    css`
      position: absolute;
      margin-top: 8px;
      border-radius: 8px;
      box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
      z-index: 99;
      overflow: auto;
      left: 0px;
      top: 38px;
      width: 100%;
      height: 60vh;
      display: flex;
      flex-direction: column;
      border: solid 1px ${theme.colors.black_05};
      background-color: ${theme.colors.white};
    `}
`;

const Li = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    ${theme.typography.button02};
    :hover {
      background-color: ${theme.colors.bg_02};
    }
  `};
`;

export default RegionSelect;
