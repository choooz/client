import styled, { css } from "styled-components";
import { useToggle, useOutsideClick } from "@monorepo/hooks";
import { SvgArrowDown } from "src/assets/icons/components";
import { useId } from "react";
import { MBTI_LIST } from "lib/constants";

interface Props {
  MBTI: string;
  onChangeMBTI: (MBTI: string) => void;
}

function SelectMBTI({ MBTI, onChangeMBTI }: Props) {
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
          {MBTI_LIST.find(({ id }) => id === MBTI)?.label}
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
          {MBTI_LIST.map(({ id, label }) => (
            <Li
              role="option"
              key={id}
              onClick={() => {
                onChangeMBTI(id);
                onToggleOpen();
              }}
            >
              {label}
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
      ${isOpen && "transform: rotateX( 180deg )"}
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
  box-shadow: 4px 8px 28px 0px rgba(0, 0, 0, 0.08), 0px 4px 12px 0px rgba(0, 0, 0, 0.16);
  position: absolute;
  bottom: 24px;
  width: 100%;
  height: 42vh;
  overflow: auto;
  > li + li {
    border-top: 1px solid ${({ theme }) => theme.colors.line_01};
  }
`;

const Li = styled.li`
  ${({ theme }) => css`
    ${theme.typography.button02};
    padding: 16px 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    :hover {
      background-color: ${({ theme }) => theme.colors.main_02};
    }
  `}
`;

export default SelectMBTI;
