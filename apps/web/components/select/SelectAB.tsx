import Image, { StaticImageData } from "next/image";
import React from "react";
import styled from "styled-components";

interface Props {
  titleA: string;
  titleB: string;
  imageA: string | StaticImageData;
  imageB: string | StaticImageData;
}

function SelectAB({ titleA, titleB, imageA, imageB }: Props) {
  return (
    <ImageWrapper>
      <div>
        <Image
          src={imageA}
          width={272}
          height={340}
          alt="A 이미지"
          style={{
            objectFit: "cover",
            width: "272px",
            height: "auto",
          }}
        />
        <SmallTitle>{titleA}</SmallTitle>
      </div>
      <div>
        <Image
          src={imageB}
          width={272}
          height={340}
          alt="B 이미지"
          style={{
            objectFit: "cover",
            width: "272px",
            height: "auto",
          }}
        />
        <SmallTitle>{titleB}</SmallTitle>
      </div>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const SmallTitle = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  padding: 4px;
`;

export default SelectAB;
