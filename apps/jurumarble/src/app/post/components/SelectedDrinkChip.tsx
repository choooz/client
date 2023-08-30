import SvgIcX from "src/assets/icons/components/IcX";
import styled, { css } from "styled-components";

interface Props {
  children: React.ReactNode;
  manufacturer: string;
  onClickDeleteItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SelectedDrinkChip({ children, onClickDeleteItem, manufacturer }: Props) {
  return (
    <SelectedChip>
      {children}
      <SelectCancelButton name={manufacturer} onClick={onClickDeleteItem}>
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
  `}
`;

const SelectCancelButton = styled.button`
  margin: 0 0 6px 4px;
`;

export default SelectedDrinkChip;
