"use client";

import { Button, ModalTemplate } from "components/index";
import VoteHeader from "components/VoteHeader";
import { transitions } from "lib/styles";
import Image from "next/image";
import { EmptyAImg } from "public/images";
import { useState } from "react";
import SvgIcX from "src/assets/icons/components/IcX";
import styled, { css, DefaultTheme } from "styled-components";
import RestaurantItem from "./RestaurantItem";

interface Props {
  onToggleSearchRestaurantModal: () => void;
}

const TEMP_LIST = [
  { manufacturer: "gyeonggiDo", drinkName: "경기도" },
  { manufacturer: "chungcheongDo", drinkName: "충청도" },
  { manufacturer: "gyeongsangDo", drinkName: "경상도" },
  { manufacturer: "ulsan", drinkName: "울산" },
  { manufacturer: "jeju", drinkName: "제주" },
];

function SearchRestaurantModal({ onToggleSearchRestaurantModal }: Props) {
  const [selected, setSelected] = useState("");
  const onClickSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.name);
    e.currentTarget.name === "nonSelect" && setSelected("nonSelect");
  };
  return (
    <ModalTemplate width="375px" height="100%" onToggleModal={onToggleSearchRestaurantModal}>
      <VoteHeader
        rightButton={
          <CloseButton onClick={onToggleSearchRestaurantModal}>
            <SvgIcX width={24} height={24} />
          </CloseButton>
        }
      >
        <TitleStyled>이미지 선택</TitleStyled>
      </VoteHeader>
      <Container>
        <RestaurantItem />
        <FoodImageList>
          <NonSelectedButton
            variant="outline"
            width="107px"
            height="60px"
            borderRadius="4px"
            name="nonSelect"
            onClick={onClickSelected}
          >
            <ColorBox selected={selected === "nonSelect"} />
            선택 안함
          </NonSelectedButton>
          {TEMP_LIST.map(({ manufacturer }) => (
            <FoodItem>
              <Button key={manufacturer} name={manufacturer} onClick={onClickSelected}>
                <ColorBox selected={selected === manufacturer} />
              </Button>
              <Image
                alt="음식 이미지"
                src={EmptyAImg}
                width={107}
                height={60}
                style={{
                  borderRadius: "4px",
                }}
              />
            </FoodItem>
          ))}
        </FoodImageList>
        <CompleteButton
          width="335px"
          height="56px"
          variant="primary"
          // onClick={onToggleDrinkSearchModal}
        >
          완료
        </CompleteButton>
      </Container>
      {/**
       * @Note 음식점 검색
       */}
      {/* <VoteHeader
        rightButton={
          <CloseButton onClick={onToggleSearchRestaurantModal}>
            <SvgIcX width={24} height={24} />
          </CloseButton>
        }
      >
        <TitleStyled>음식점 검색</TitleStyled>
      </VoteHeader>
      <Container>
        <SearchInput placeholder="관심있는 음식점을 검색해보세요." />
        <RestaurantList>
          {TEMP_LIST.map(() => (
            <RestaurantItem />
          ))}
        </RestaurantList>
      </Container> */}
    </ModalTemplate>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const TitleStyled = styled.div`
  margin-top: 14px;
`;

const CloseButton = styled(Button)`
  margin: 14px 12px 0 0;
`;

const FoodImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  gap: 7px;
  border-top: 1px solid ${({ theme }) => theme.colors.line_01};
  overflow: auto;
  padding-bottom: 80px;
  -ms-overflow-style: none /* IE and Edge 스크롤바 없애는 css*/;
  scrollbar-width: none; /* Firefox 스크롤바 없애는 css */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera 스크롤바 없애는 css*/
  }
`;

const NonSelectedButton = styled(Button)`
  position: relative;
`;

const FoodItem = styled.div`
  position: relative;
`;

const ColorBox = styled.div<{ theme: DefaultTheme; selected: boolean }>`
  ${({ theme, selected }) =>
    css`
      border-radius: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      ${selected &&
      css`
        border: 2px solid ${theme.colors.main_01};
        background: rgba(255, 74, 22, 0.7);
        animation: ${transitions.blink} 0.7s ease-in-out;
      `}
    `}
`;

const CompleteButton = styled(Button)`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}

      position: absolute;
      bottom: 54px;
    `}
`;

export default SearchRestaurantModal;
