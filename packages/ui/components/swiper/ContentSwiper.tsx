"use client";
import { RefObject, useImperativeHandle, useState } from "react";
import { SwiperProps, SwiperSlide, SwiperSlideProps, Swiper } from "swiper/react";
import SwiperCore from "swiper";
import styled, { css } from "styled-components";

export interface ContentSwiperProps<T> {
  swiperProps?: SwiperProps;
  slideProps?: ContentSwiperSlideProps & Pick<SwiperSlideProps, "lazy">;
  data: T[];
  renderItem: (item: T, index: number, activeIndex: number) => JSX.Element;
  initialIndex?: number;
  handler?: RefObject<SwiperCore | undefined>;
  keyProp?: keyof T;
}

export const ContentSwiper = <T,>({
  initialIndex = 0,
  data,
  renderItem,
  swiperProps,
  slideProps = {},
  handler,
  keyProp,
}: ContentSwiperProps<T>) => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [activeIndex, setActiveIndex] = useState(() => initialIndex);

  useImperativeHandle(handler, () => swiper, [swiper]);

  return (
    <StyledSwiper
      onSwiper={setSwiper}
      $slideProps={slideProps}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.activeIndex);
        swiperProps?.onSlideChange?.(swiper);
      }}
      {...swiperProps}
    >
      {data.map((item, index) => (
        <SwiperSlide key={keyProp ? (item as any)[keyProp] : index}>
          {renderItem?.(item, index, activeIndex) as any}
        </SwiperSlide>
      ))}
      <span slot="container-start" />
      <span slot="container-end" />
    </StyledSwiper>
  );
};

interface ContentSwiperSlideProps {
  width?: string;
  swipeCount?: number;
  scrollMargin?: number;
}

const StyledSwiper = styled(Swiper)<{
  $slideProps: ContentSwiperSlideProps;
  children: any;
}>`
  ${({ $slideProps: { scrollMargin, swipeCount = 1, width = "100%" } }) => css`
    .swiper-slide {
      width: ${width};

      &:nth-of-type(${swipeCount}n) {
        scroll-snap-stop: always;
        scroll-snap-align: start;
      }

      ${scrollMargin &&
      css`
        scroll-margin: ${scrollMargin}px;
        &:first-child {
          padding-left: ${scrollMargin}px;
        }

        &:last-child {
          padding-right: ${scrollMargin}px;
        }
      `}

      > a {
        display: block;
      }
    }
  `}
`;
