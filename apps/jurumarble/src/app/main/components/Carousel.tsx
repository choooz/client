import Image from "next/image";
import { EmptyAImg } from "public/images";
import styled, { css } from "styled-components";

const mockData = [
  {
    src: EmptyAImg,
    drinkName: "제품명 제품명 제품명1",
    areaName: "지역명1",
  },
  {
    src: EmptyAImg,
    drinkName: "제품명 제품명 제품명2",
    areaName: "지역명2",
  },
  {
    src: EmptyAImg,
    drinkName: "제품명 제품명 제품명3",
    areaName: "지역명3",
  },
  {
    src: EmptyAImg,
    drinkName: "제품명 제품명 제품명4",
    areaName: "지역명4",
  },
  {
    src: EmptyAImg,
    drinkName: "제품명 제품명 제품명5",
    areaName: "지역명5",
  },
];

function Carousel() {
  return (
    <Container>
      <Slides>
        {mockData.map(({ src, drinkName, areaName }, index) => (
          <Slide key={drinkName}>
            <Box>
              <DrinkImageWrapper>
                <RankginMark>{index + 1}</RankginMark>
                <Image alt="임시 이미지" src={src} fill style={{ borderRadius: "10px" }} />
              </DrinkImageWrapper>
              <DrinkText>
                {drinkName}
                <AreaName>{areaName}</AreaName>
              </DrinkText>
            </Box>
          </Slide>
        ))}
      </Slides>
    </Container>
  );
}

const Container = styled.div`
  height: 188px;
  margin-top: 32px;
`;

const Slides = styled.ol`
  display: flex;
  height: 168px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
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
  scroll-snap-align: start;
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

export default Carousel;
