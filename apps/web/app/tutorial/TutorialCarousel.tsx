import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Eximg1 } from "public/images";
import Image from "next/image";
import { media } from "@chooz/ui/styles/media";

function TutorialCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <div>
          <Title>사진 확대</Title>
          <SubTitle>이미지 위에 마우스를 올리거나 키보드←,→누르면 확대 돼요!</SubTitle>
          <ImageWrapper>
            <Image
              src={Eximg1}
              alt="튜토리얼 이미지"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            />
          </ImageWrapper>
        </div>
        <div>
          <Title>선택하기</Title>
          <SubTitle>A, B 중 클릭 시, 투표 선택이 돼요!</SubTitle>
          <ImageWrapper>
            <Image
              src={Eximg1}
              alt="튜토리얼 이미지"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            />
          </ImageWrapper>
        </div>
        <div>
          <Title>다음 게시물</Title>
          <SubTitle>키보드↑,↓이나 스크롤하면 다음 게시물로 이동돼요!</SubTitle>
          <ImageWrapper>
            <Image
              src={Eximg1}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginRight: "10px",
              }}
              alt="튜토리얼 이미지"
            />
          </ImageWrapper>
        </div>
      </Slider>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  button {
    height: 411px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 356px;
  ${media.medium} {
    height: 411px;
  }
`;

const Title = styled.h1`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  margin-bottom: 16px;
  ${({ theme }) => css`
    color: ${theme.palette.ink.darker};
    ${theme.textStyle.Title_Large}

    ${media.medium} {
      ${theme.textStyle.Title_2}
    }
  `};
`;

const SubTitle = styled.h2`
  padding-bottom: 32px;
  ${({ theme }) => css`
    color: ${theme.palette.ink.dark};
    ${theme.textStyle.Title_Small}
    ${media.medium} {
      ${theme.textStyle.Title_Medium}
    }
  `}
`;

export default TutorialCarousel;
