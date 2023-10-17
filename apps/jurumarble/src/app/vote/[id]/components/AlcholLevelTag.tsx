import { convertLevel } from "lib/utils/formatUserInfo";
import styled from "styled-components";

interface Props {
  alchol: string;
}

const AlcholLevelTag = ({ alchol }: Props) => {
  return <Tag alchol={alchol}>{convertLevel(alchol)}</Tag>;
};

const Tag = styled.div<{ alchol: string }>`
  padding: 5px 8px;
  line-height: 1;
  border-radius: 4px;
  ${({ theme }) => theme.typography.caption_chip};

  ${({ alchol }) => {
    switch (alchol) {
      case "LOW":
        return `
        border: 1px solid #ebaf3c;
        background: rgba(255, 207, 83, 0.5);
        color: #ff8f0c;
        `;
      case "MEDIUM":
        return `
        border: 1px solid #04B014;
        background: rgba(100, 176, 4, 0.50);
        color: #00830C;
        `;
      case "HIGH":
        return `
        border: 1px solid var(--System_Red, #BC0F04);
        background: rgba(255, 88, 88, 0.50);
        color:#9A0000;
        `;
      default:
        return `
          background-color: #F2F2F2;
          color: #BDBDBD;
        `;
    }
  }}
`;

export default AlcholLevelTag;
