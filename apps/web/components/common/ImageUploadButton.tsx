import Image from "next/image";
import { Camera } from "public/images";
import styled, { css } from "styled-components";

interface Props {
  width: `${number}px` | `${number}%` | "auto";
  height: `${number}px` | `${number}%` | "auto";
}

function ImageUploadButton({ width, height }: Props) {
  return (
    <ImageWrapper width={width} height={height}>
      <ImageCircle>
        <Image src={Camera} alt="이미지 공간" width={32} height={32} />
      </ImageCircle>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<Props>`
  ${({ theme, width, height }) => css`
    width: ${width};
    height: ${height};
    background: ${theme.palette.background.hard};
  `}
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.background.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ImageUploadButton;
