import { ProgressImage } from "public/images";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  progress: number;
}

function ProgressBar({ progress }: Props) {
  return (
    <Container>
      <Progress $progress={progress}>
        <div>
          <Image alt="ProgressImage" src={ProgressImage} object-fit="contain" sizes="100%" />
        </div>
      </Progress>
    </Container>
  );
}

const Container = styled.div`
  height: 4px;
  width: 100%;
  margin: 34px 0px;
`;

const Progress = styled.div<{ $progress: number }>`
  position: relative;
  width: ${({ $progress }) => $progress * 25}%;
  height: 100%;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  background-color: ${({ theme }) => theme.palette.background.hard};
  > div {
    width: 48px;
    height: 24px;
    position: absolute;
    bottom: -10px;
    right: -35px;
    z-index: 99;
  }
`;

export default ProgressBar;
