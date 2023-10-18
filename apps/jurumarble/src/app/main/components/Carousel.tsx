import { useRef } from 'react';

import { ContentSwiper } from '@monorepo/ui';
import Path from 'lib/Path';
import { GetHotDrinkResponse } from 'lib/apis/drink';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SvgIcPrevious, SvgNext } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';
import SwiperCore, { Autoplay } from 'swiper';

interface Props {
  hotDrinkList: GetHotDrinkResponse[];
}

function Carousel({ hotDrinkList }: Props) {
  const router = useRouter();
  const ref = useRef<SwiperCore>(null);

  const onNextSlide = () => {
    ref.current?.slideNext();
  };

  const onPrevSlide = () => {
    ref.current?.slidePrev();
  };

  return (
    <>
      <Container>
        <ContentSwiper
          data={hotDrinkList}
          handler={ref}
          slideProps={{
            width: '292px',
            lazy: true,
          }}
          swiperProps={{
            slidesPerView: 'auto',
            spaceBetween: 5,
            loop: true,
            autoplay: {
              delay: 2000,
            },
            modules: [Autoplay],
          }}
          renderItem={({ drinkId, image, name, manufactureAddress }, index) => (
            <Slide
              key={drinkId}
              onClick={() => router.push(`${Path.DRINK_INFO_PAGE}/${drinkId}`)}
            >
              <Box>
                <DrinkImageWrapper>
                  <RankginMark>{index + 1}</RankginMark>
                  <Image
                    alt="전통주"
                    src={image}
                    fill
                    style={{ borderRadius: '10px' }}
                  />
                </DrinkImageWrapper>
                <DrinkText>
                  {name}
                  <AreaName>{manufactureAddress}</AreaName>
                </DrinkText>
              </Box>
            </Slide>
          )}
        />
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

const Slide = styled.li`
  width: 292px;
  height: 130px;
  padding-top: 20px;
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
