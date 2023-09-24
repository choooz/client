import styled from "styled-components";

interface ProgressBarProps {
  progress: `${number}%`;
  currentIndex: number;
  total: number;
}

export const ProgressBar = ({ progress, total, currentIndex }: ProgressBarProps) => {
  return (
    <Wrapper>
      <ProgressWrapper>
        <Progress $progress={progress} />
      </ProgressWrapper>

      <Count>
        <span
          style={{
            color: "black",
          }}
        >
          {currentIndex}
        </span>
        /<span>{total}</span>
      </Count>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 8px;
  position: relative;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg_01};
`;

const Progress = styled.div<{
  $progress: `${number}%`;
}>`
  position: absolute;
  height: 100%;
  width: ${({ $progress }) => $progress ?? "0%"};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
  background: linear-gradient(
    286deg,
    #00a3ff -93.09%,
    #0085ff -93.07%,
    rgba(203, 208, 255, 0) 146.71%
  );
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typography.headline03};
  color: ${({ theme }) => theme.colors.black_04};
  margin-left: 8px;
`;
