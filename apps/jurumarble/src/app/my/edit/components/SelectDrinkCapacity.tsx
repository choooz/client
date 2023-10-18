import { useId } from 'react';

import { useOutsideClick, useToggle } from '@monorepo/hooks';
import { ALCOHOL_LEVEL_LIST } from 'lib/constants';
import depths from 'lib/styles/depths';
import { SvgArrowDown } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

interface Props {
  alcoholLimit: string;
  onChangeAlcoholCapacity: (alcoholLimit: string) => void;
}

function SelectDrinkCapacity({ alcoholLimit, onChangeAlcoholCapacity }: Props) {
  const [isOpen, onToggleOpen] = useToggle();
  const { targetEl } = useOutsideClick<HTMLDivElement>(isOpen, onToggleOpen);
  const uniqueId = useId();

  return (
    <SelectStyled isOpen={isOpen} ref={targetEl}>
      <StyledButton
        id={`select-box-${uniqueId}`}
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls={`select-list-${uniqueId}`}
        onClick={onToggleOpen}
      >
        <SelectedText>
          {ALCOHOL_LEVEL_LIST.find(({ id }) => id === alcoholLimit)?.label}
          <div id="indicator">
            <SvgArrowDown width={24} height={24} />
          </div>
        </SelectedText>
      </StyledButton>
      {isOpen ? (
        <Ul
          id={`select-list-${uniqueId}`}
          aria-labelledby={`select-box-${uniqueId}`}
          role="listbox"
        >
          {ALCOHOL_LEVEL_LIST.map(({ id, label, description }) => (
            <Li
              role="option"
              key={id}
              onClick={() => {
                onChangeAlcoholCapacity(id);
                onToggleOpen();
              }}
            >
              <Label>{label}</Label>
              <Description>{description}</Description>
            </Li>
          ))}
        </Ul>
      ) : null}
    </SelectStyled>
  );
}

const SelectStyled = styled.div<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    ${theme.typography.body03};
    color: ${theme.colors.black_02};
    border: 1px solid ${theme.colors.line_01};
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 12px;

    #indicator {
      display: flex;
      align-items: center;
      color: ${theme.colors.black_01};
    }
    svg {
      ${isOpen && 'transform: rotateX( 180deg )'}
    }
  `}
`;

const StyledButton = styled.button`
  display: contents;
`;

const SelectedText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  margin: 0 14px;
`;

const Ul = styled.ul`
  border-radius: 4px;
  margin: 32px 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.04),
    2px 2px 20px 0px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 22px;
  width: 100%;
  z-index: ${depths.menu};
  > li + li {
    border-top: 1px solid ${({ theme }) => theme.colors.line_01};
  }
`;

const Li = styled.li`
  padding: 16px 24px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.main_02};
  }
`;

const Label = styled.p`
  margin-bottom: 4px;
  ${({ theme }) => theme.typography.body04};
  color: ${({ theme }) => theme.colors.black_02};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body03};
  color: ${({ theme }) => theme.colors.black_03};
`;

export default SelectDrinkCapacity;
