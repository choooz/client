"use client";

import { Button, ModalTemplate } from "components/index";
import SearchInput from "components/SearchInput";
import VoteHeader from "components/VoteHeader";
import SvgIcX from "src/assets/icons/components/IcX";
import styled from "styled-components";
import RestaurantItem from "./RestaurantItem";

interface Props {
  onToggleSearchRestaurantModal: () => void;
}

const TEMP_LIST = [
  { manufacturer: "gyeonggiDo", drinkName: "경기도" },
  { manufacturer: "chungcheongDo", drinkName: "충청도" },
  { manufacturer: "gyeongsangDo", drinkName: "경상도" },
  { manufacturer: "gangwonDo", drinkName: "강원도" },
  { manufacturer: "jeollaDo", drinkName: "전라도" },
  { manufacturer: "seoul", drinkName: "서울" },
  { manufacturer: "incheon", drinkName: "인천" },
  { manufacturer: "sejong", drinkName: "세종" },
  { manufacturer: "daejeon", drinkName: "대전" },
  { manufacturer: "busan", drinkName: "부산" },
  { manufacturer: "daegu", drinkName: "대구" },
  { manufacturer: "gwangju", drinkName: "광주" },
  { manufacturer: "ulsan", drinkName: "울산" },
  { manufacturer: "jeju", drinkName: "제주" },
];

function SearchRestaurantModal({ onToggleSearchRestaurantModal }: Props) {
  return (
    <ModalTemplate width="375px" height="100%" onToggleModal={onToggleSearchRestaurantModal}>
      <VoteHeader
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
      </Container>
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

const RestaurantList = styled.ol`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  overflow: auto;
  height: 100%;
`;

export default SearchRestaurantModal;
