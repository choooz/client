import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { media } from "@monorepo/ui/styles/media";
import { Choice, Detail, Increase, MChoice, MIncrease, Next } from "public/gifs";
import { BrowserView, MobileView } from "react-device-detect";

function TutorialCarousel() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <div>
          <Title>사진 확대</Title>
          <BrowserView>
            <SubTitle>이미지 위에 마우스를 올리거나 키보드←,→누르면 확대 돼요!</SubTitle>
            <ImageWrapper>
              <Image
                src={Increase}
                alt="확대 튜토리얼 이미지"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
            </ImageWrapper>
          </BrowserView>
          <MobileView>
            <SubTitle>화면에 짧게 터치하거나 좌·우로 넘기면 사진 영역이 확대돼요!</SubTitle>
            <MobileImageWrapper>
              <Image
                src={MIncrease}
                alt="확대 튜토리얼 이미지"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
            </MobileImageWrapper>
          </MobileView>
        </div>
        <div>
          <Title>선택하기</Title>
          <BrowserView>
            <SubTitle>A, B 중 클릭 시, 투표 선택이 돼요!</SubTitle>
            <ImageWrapper>
              <Image
                src={Choice}
                alt="튜토리얼 이미지"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
            </ImageWrapper>
          </BrowserView>
          <MobileView>
            <SubTitle>
              두 번, 짧게 터치하거나 사진이 확대 되었을 때, 짧게 터치하면 선택 돼요!
            </SubTitle>
            <MobileImageWrapper>
              <Image
                src={MChoice}
                alt="튜토리얼 이미지"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
            </MobileImageWrapper>
          </MobileView>
        </div>
        <div>
          <Title>다음 게시물</Title>
          <BrowserView>
            <SubTitle>키보드↑,↓이나 스크롤하면 다음 게시물로 이동돼요!</SubTitle>
            <ImageWrapper>
              <Image
                src={Next}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
                alt="튜토리얼 이미지"
              />
            </ImageWrapper>
          </BrowserView>
          <MobileView>
            <SubTitle>상·하로 짧게 터치하여 넘기면 다음 투표 게시물로 이동 돼요!</SubTitle>
            <MobileImageWrapper>
              <Image
                src={Next}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
                alt="튜토리얼 이미지"
              />
            </MobileImageWrapper>
          </MobileView>
        </div>
        <div>
          <Title>상세페이지</Title>
          <BrowserView>
            <SubTitle>‘자세히' 클릭 시, 상세한 내용을 볼 수 있는 페이지로 이동해요.</SubTitle>
            <ImageWrapper>
              <Image
                src={Detail}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
                alt="튜토리얼 이미지"
              />
            </ImageWrapper>
          </BrowserView>
          <MobileView>
            <SubTitle>
              ‘자세히 보기' 클릭하거나 줌인 시, 상세한 내용을 볼 수 있는 페이지로 이동해요.
            </SubTitle>
            <MobileImageWrapper>
              <Image
                src={Detail}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
                alt="튜토리얼 이미지"
              />
            </MobileImageWrapper>
          </MobileView>
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
  aspect-ratio: 1.16;
`;

const MobileImageWrapper = styled(ImageWrapper)`
  aspect-ratio: 0.79;
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
