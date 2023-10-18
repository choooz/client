import SvgIcX from 'src/assets/icons/components/IcX';
import styled, { css } from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClickDeleteItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SelectedDrinkChip({ children, onClickDeleteItem }: Props) {
  return (
    <SelectedChip>
      <SelectedName>{children}</SelectedName>
      <SelectCancelButton onClick={onClickDeleteItem}>
        <SvgIcX width={12} height={12} />
      </SelectCancelButton>
    </SelectedChip>
  );
}

const SelectedChip = styled.li`
  ${({ theme }) => css`
    ${theme.typography.button01}
    background-color: ${theme.colors.black_02};
    color: ${theme.colors.bg_02};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 104px;
    height: 40px;
    margin-top: 16px;
    position: relative;
  `}
`;

const SelectedName = styled.div`
  width: 72px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SelectCancelButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
`;

export default SelectedDrinkChip;
