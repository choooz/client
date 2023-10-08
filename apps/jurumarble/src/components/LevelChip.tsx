import styled, { css } from "styled-components";

interface Props {
  level: number;
}

function LevelChip({ level }: Props) {
  return <Chip level={level}>Lv.{level}</Chip>;
}

const Chip = styled.div<{ level: number }>`
  ${({ theme, level }) => css`
    ${theme.typography.caption_chip}
    width: 32px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${level === 1 &&
    css`
      color: #ff8f0c;
      border: 1px solid #ebaf3c;
      background: rgba(255, 207, 83, 0.5);
    `}
    ${level === 2 &&
    css`
      color: #00830c;
      border: 1px solid #04b014;
      background: rgba(100, 176, 4, 0.5);
    `}
    ${level === 3 &&
    css`
      color: #9a0000;
      border: 1px solid ${theme.colors.system_red};
      background: rgba(255, 88, 88, 0.5);
    `}
  `}
`;

export default LevelChip;
