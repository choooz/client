import AorBMark from "components/AorBMark";
import Image, { StaticImageData } from "next/image";
import styled, { css } from "styled-components";

interface Props {
  imageA: string | StaticImageData;
  imageB: string | StaticImageData;
}

function VoteDescription({ imageA, imageB }: Props) {
  return (
    <Container>
      <ImageContainer>
        <ImageWrapper>
          {imageA ? (
            <Image
              src={imageA}
              alt="A이미지"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <ImageBox />
          )}
          <AorBMark AorB="A">A</AorBMark>
        </ImageWrapper>
        <ImageWrapper>
          {imageB ? (
            <Image
              src={imageB}
              alt="B이미지"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <ImageBox />
          )}
          <AorBMark AorB="B">B</AorBMark>
        </ImageWrapper>
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div``;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 9px;
`;

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    position: relative;
    width: 50%;
    aspect-ratio: 1;
  `}
`;

const ImageBox = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black_05};
    border-radius: 10px;
    height: 100%;
  `}
`;

export default VoteDescription;
