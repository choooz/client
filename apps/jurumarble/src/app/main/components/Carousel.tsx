import { GetHotDrinkResponse } from "lib/apis/drink";
import Path from "lib/Path";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { SvgIcPrevious, SvgNext } from "src/assets/icons/components";

const SLIDE_MOVE_COUNT = 1;
const ORIGINAL_IMAGE_LENGTH = 10;
const MOVE_DISTANCE = 300;

interface Props {
  hotDrinkList: GetHotDrinkResponse[];
}

function Carousel({ hotDrinkList }: Props) {
  const router = useRouter();
  const slideRef = useRef<HTMLOListElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimation, setIsAnimation] = useState(true);
  const [isFlowing, setIsFlowing] = useState(true);

  const onNextSlide = useCallback(() => {
    setCurrentSlide((prev) => prev + SLIDE_MOVE_COUNT);
  }, [currentSlide]);

  const onPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => prev - SLIDE_MOVE_COUNT);
  }, [currentSlide]);

  useEffect(() => {
    if (!slideRef.current) return;

    if (currentSlide === ORIGINAL_IMAGE_LENGTH + 1) {
      setTimeout(() => {
        setIsAnimation(false);
        slideRef.current!.style.transform = `translateX(-${
          MOVE_DISTANCE * ORIGINAL_IMAGE_LENGTH
        }px)`;
        setCurrentSlide(1);
      }, 500);

      setTimeout(() => {
        setIsAnimation(true);
      }, 600);
    } else if (currentSlide === 0) {
      setTimeout(() => {
        setIsAnimation(false);
        slideRef.current!.style.transform = `translateX(+${MOVE_DISTANCE}px)`;
        setCurrentSlide(ORIGINAL_IMAGE_LENGTH);
      }, 500);

      setTimeout(() => {
        setIsAnimation(true);
      }, 600);
    }
    slideRef.current.style.transform = `translateX(-${MOVE_DISTANCE * (currentSlide - 1)}px)`;
  }, [currentSlide]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isFlowing) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => prev + SLIDE_MOVE_COUNT);
      }, 3500);
    }
    return () => clearTimeout(intervalId);
  }, [isFlowing, currentSlide]);

  return (
    <>
      <Container>
        <Slides ref={slideRef} isAnimation={isAnimation}>
          {hotDrinkList.map((hotDrink: GetHotDrinkResponse, index: number) => {
            const { drinkId, image, name, manufactureAddress } = hotDrink;
            return (
              <Slide
                key={drinkId}
                onClick={() => router.push(`${Path.DRINK_INFO_PAGE}/${drinkId}`)}
              >
                <Box>
                  <DrinkImageWrapper>
                    <RankginMark>{index + 1}</RankginMark>
                    <Image alt="전통주" src={image} fill style={{ borderRadius: "10px" }} />
                  </DrinkImageWrapper>
                  <DrinkText>
                    {name}
                    <AreaName>{manufactureAddress}</AreaName>
                  </DrinkText>
                </Box>
              </Slide>
            );
          })}
        </Slides>
        <CarouselControlContainer>
          <DivideLine />
          <SlideButtonContainer>
            <SlideButton onClick={onPrevSlide}>
              <SvgIcPrevious width={20} height={20} />
            </SlideButton>
            <SlideButton onClick={onNextSlide}>
              <SvgNext width={20} height={20} />
            </SlideButton>
          </SlideButtonContainer>
        </CarouselControlContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 32px;
  overflow: hidden;
`;

const Slides = styled.ol<{ isAnimation: boolean }>`
  display: flex;
  /* overflow-x: auto;
  scroll-snap-type: x mandatory; */
  gap: 8px;
  transition: transform 0.5s ease-in-out;
  ${({ isAnimation }) => isAnimation && `transform: translateX(-${MOVE_DISTANCE}px);`}

  /**
    @Todo 모바일에서는 보이게 하기
   **/
  -ms-overflow-style: none /* IE and Edge 스크롤바 없애는 css*/;
  scrollbar-width: none; /* Firefox 스크롤바 없애는 css */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera 스크롤바 없애는 css*/
  }
`;

const Slide = styled.li`
  width: 292px;
  height: 120px;
  padding-top: 20px;
  /* scroll-snap-align: start; */
  cursor: pointer;
`;

const Box = styled.div`
  ${({ theme }) =>
    css`
      width: 292px;
      display: flex;
      border-radius: 16px;
      border: 1px solid ${theme.colors.bg_02};
      box-shadow: 0px 2px 8px 0px rgba(235, 235, 235, 0.4),
        0px 8px 20px 0px rgba(235, 235, 235, 0.4);
    `}
`;

const DrinkImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  bottom: 20px;
  left: 20px;
`;

const RankginMark = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.main_01};
      color: ${theme.colors.white};
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 10px 0px 4px 0px;
      z-index: 1;
    `}
`;

const DrinkText = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.headline04}
      color: ${theme.colors.black_01};
      display: flex;
      flex-direction: column;
      margin: 39px 0 0 32px;
    `}
`;

const AreaName = styled.span`
  ${({ theme }) =>
    css`
      ${theme.typography.subhead02}
      color: ${theme.colors.black_03};
      margin-top: 2px;
    `}
`;

const CarouselControlContainer = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const DivideLine = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.line_01};
    height: 2px;
    width: 100%;
  `}
`;

const SlideButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SlideButton = styled.button`
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  width: 40px;
  height: 40px;
`;

export default Carousel;
