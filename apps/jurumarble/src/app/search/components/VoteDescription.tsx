import DrinkImageWrapper from 'components/DrinkImageWrapper';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';

interface Props {
  imageA: string;
  imageB: string;
}

function VoteDescription({ imageA, imageB }: Props) {
  return (
    <Container>
      <ImageWrapper>
        <LeftVote>
          <DrinkImageWrapper src={imageA} alt="A 이미지" fill />
        </LeftVote>
        <RightVote>
          <DrinkImageWrapper src={imageB} alt="B 이미지" fill />
        </RightVote>
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div``;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 9px;
`;
const LeftVote = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
`;

const RightVote = styled(LeftVote)``;

export default VoteDescription;
