"use client";

import { useEffect, useRef, useState } from "react";
import { SvgStamp } from "src/assets/icons/components";
import styled, { css, useTheme } from "styled-components";
import useGetDrinkRecommendationListService from "../services/useGetDrinkRecommendationListService";

const SLIDE_MOVE_COUNT = 1;
const ORIGINAL_IMAGE_LENGTH = 10;
const MOVE_DISTANCE = 20;

function TodayDrinkRecommendation() {
  const theme = useTheme();
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimation, setIsAnimation] = useState(true);
  const [isFlowing, setIsFlowing] = useState(true);

  const date = new Date();
  const drinkRecommendationList = useGetDrinkRecommendationListService({
    page: date.getDate(),
    perPage: 10,
  });

  useEffect(() => {
    if (!slideRef.current) return;

    if (currentSlide === ORIGINAL_IMAGE_LENGTH + 1) {
      setTimeout(() => {
        setIsAnimation(false);
        slideRef.current!.style.transform = `translateY(-${
          MOVE_DISTANCE * ORIGINAL_IMAGE_LENGTH
        }px)`;
        setCurrentSlide(1);
      }, 500);

      setTimeout(() => {
        setIsAnimation(true);
      }, 600);
    }
    slideRef.current.style.transform = `translateY(-${MOVE_DISTANCE * (currentSlide - 1)}px)`;
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
    <Container>
      <H3>
        <SvgStamp width={24} height={24} fill={theme.colors.main_01} />
        오늘의 우리술 추천
      </H3>
      <Slider ref={slideRef} isAnimation={isAnimation}>
        {drinkRecommendationList?.map(({ 전통주명 }) => (
          <DrinkName key={전통주명}>{전통주명}</DrinkName>
        ))}
      </Slider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 8px;
  gap: 8px;
  overflow: hidden;
`;

const Slider = styled.div<{ isAnimation: boolean }>`
  display: flex;
  flex-direction: column;
  height: 18px;
  transition: transform 0.5s ease-in-out;
  gap: 2px;
  ${({ isAnimation }) => isAnimation && `transform: translateY(-${MOVE_DISTANCE}px);`}
`;

const H3 = styled.h3`
  ${({ theme }) => css`
    ${theme.typography.body01};
    color: ${theme.colors.main_01};
    display: flex;
    align-items: center;
    gap: 2px;
    overflow: hidden;
    white-space: nowrap;
  `};
`;

const DrinkName = styled.span`
  ${({ theme }) => theme.typography.body03};
`;

export default TodayDrinkRecommendation;
