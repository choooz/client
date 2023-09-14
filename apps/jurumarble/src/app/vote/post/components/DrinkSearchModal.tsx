"use client";

import { Button, ModalTemplate } from "components/index";
import VoteHeader from "components/VoteHeader";
import { EmptyAImg } from "public/images";
import { useState } from "react";
import SvgIcX from "src/assets/icons/components/IcX";
import styled, { css } from "styled-components";
import useUpdateSelectedDrinkList from "../hooks/useUpdateSelectedDrinkList";
import SearchInput from "../../../../components/SearchInput";
import RegionSelect from "./RegionSelect";
import SelectedDrinkChip from "./SelectedDrinkChip";
import DrinkItem from "components/DrinkItem";

interface Props {
  onToggleDrinkSearchModal: () => void;
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

function DrinkSearchModal({ onToggleDrinkSearchModal }: Props) {
  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const { selectedDrinkList, onClickAddDrink, onClickDeleteItem } = useUpdateSelectedDrinkList();

  return (
    <ModalTemplate width="375px" height="100%" onToggleModal={onToggleDrinkSearchModal}>
      <VoteHeader
        rightButton={
          <CloseButton onClick={onToggleDrinkSearchModal}>
            <SvgIcX width={24} height={24} />
          </CloseButton>
        }
      >
        <TitleStyled>술 검색하기</TitleStyled>
      </VoteHeader>
      <SearchSection>
        <RegionSelect
          regionOption={regionOption}
          onChangeRegionOption={onChangeRegionOption}
        ></RegionSelect>
        {/* {regionOption && <SearchInput placeholder="관심있는 술을 검색해보세요." />} */}
        <SelectedDrinkChipList>
          {selectedDrinkList.map((manufacturer) => (
            <SelectedDrinkChip manufacturer={manufacturer} onClickDeleteItem={onClickDeleteItem}>
              {manufacturer}
            </SelectedDrinkChip>
          ))}
        </SelectedDrinkChipList>
      </SearchSection>
      {regionOption && (
        <ResultSection>
          <DrinkList>
            {/* {TEMP_LIST.map(({ drinkName, manufacturer }) => (
              <DrinkItem
                onClick={onClickAddDrink}
                staticImage={EmptyAImg}
                drinkName={drinkName}
                manufacturer={manufacturer}
                selectedDrinkList={selectedDrinkList}
              />
            ))} */}
          </DrinkList>
          <CompleteButton width="100%" height="56px" disabled={selectedDrinkList.length < 2}>
            선택 완료
          </CompleteButton>
        </ResultSection>
      )}
    </ModalTemplate>
  );
}

const TitleStyled = styled.div`
  margin-top: 14px;
`;

const CloseButton = styled(Button)`
  margin: 14px 12px 0 0;
`;

const SearchSection = styled.section`
  padding: 24px 20px;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.08);
`;

const ResultSection = styled.section`
  margin: 24px 20px 20px 20px;
  padding: 24px 0 24px 0;
`;

const DrinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  height: 400px;
  -ms-overflow-style: none /* IE and Edge 스크롤바 없애는 css*/;
  scrollbar-width: none; /* Firefox 스크롤바 없애는 css */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera 스크롤바 없애는 css*/
  }
`;

const CompleteButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    background-color: ${theme.colors.black_02};
    color: ${theme.colors.white};
    position: fixed;
    width: 335px;
    bottom: 54px;
    margin: 0 auto;
    :disabled {
      background-color: ${theme.colors.black_05};
      color: ${theme.colors.black_03};
    }
  `}
`;

const SelectedDrinkChipList = styled.ul`
  display: flex;
  gap: 8px;
`;

export default DrinkSearchModal;
