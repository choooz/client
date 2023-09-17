"use client";

import { Button, ModalTemplate } from "components/index";
import VoteHeader from "components/VoteHeader";
import { useState } from "react";
import SvgIcX from "src/assets/icons/components/IcX";
import styled, { css } from "styled-components";
import useUpdateSelectedDrinkList from "../hooks/useUpdateSelectedDrinkList";
import SelectedDrinkChip from "./SelectedDrinkChip";
import DrinkItem from "app/vote/post/components/DrinkItem";
import useGetDrinkListService from "hooks/useGetDrinkList";
import SearchInput from "components/SearchInput";
import useInput from "hooks/useInput";
import { DrinkInfoType } from "src/types/vote";
import RegionSelect from "components/RegionSelect";

interface Props {
  onToggleDrinkSearchModal: () => void;
  onClickSearchDrinkComplete: (selectedDrinkList: DrinkInfoType[]) => void;
}

function DrinkSearchModal({ onToggleDrinkSearchModal, onClickSearchDrinkComplete }: Props) {
  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const { selectedDrinkList, onClickAddDrink, onClickDeleteItem } = useUpdateSelectedDrinkList();

  const { value: keyword, onChange: onChangeKeyword } = useInput({ useDebounce: true });

  const { drinkList } = useGetDrinkListService({
    keyword,
    region: regionOption,
    page: 0,
    size: 100,
    sortBy: "ByPopularity",
  });

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
        <RegionSelect regionOption={regionOption} onChangeRegionOption={onChangeRegionOption} />
        <SearchInput
          placeholder="관심있는 술을 검색해보세요."
          value={keyword}
          onChange={onChangeKeyword}
        />
        <SelectedDrinkChipList>
          {selectedDrinkList.map((drinkInfo) => (
            <SelectedDrinkChip
              key={drinkInfo.id}
              onClickDeleteItem={() => onClickDeleteItem(drinkInfo)}
            >
              {drinkInfo.name}
            </SelectedDrinkChip>
          ))}
        </SelectedDrinkChipList>
      </SearchSection>

      <ResultSection>
        <DrinkList>
          {drinkList.map((drinkInfo) => (
            <DrinkItem
              key={drinkInfo.id}
              onClickAddDrink={() => onClickAddDrink(drinkInfo)}
              drinkInfo={drinkInfo}
              selectedDrinkList={selectedDrinkList}
            />
          ))}
        </DrinkList>
        <CompleteButton
          width="100%"
          height="56px"
          disabled={selectedDrinkList.length < 2}
          onClick={() => onClickSearchDrinkComplete(selectedDrinkList)}
        >
          선택 완료
        </CompleteButton>
      </ResultSection>
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
