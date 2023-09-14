"use client";

import BottomBar from "components/BottomBar";
import { Button } from "components/button";
import SearchInput from "components/SearchInput";
import useInput from "hooks/useInput";
import SvgIcPrev from "src/assets/icons/components/IcPrev";
import styled, { css, DefaultTheme } from "styled-components";
import DrinkList from "./components/DrinkList";
import DrinkVoteList from "./components/DrinkVoteList";
import { useState } from "react";
import { SORT_LIST } from "lib/constants";
import SortSelect from "./components/SortSelect";
import RegionSmallSelect from "./components/RegionSmallSelect";

const TAB_LIST = [
  { id: "total", name: "통합" },
  { id: "drinkInfo", name: "우리술 정보" },
  { id: "drinkVote", name: "우리술 투표" },
];

function Search() {
  const { value: searchText, onChange: onChangeSearchText } = useInput({
    initialValue: "",
    useDebounce: true,
  });

  const [selectedTab, setSelectedTab] = useState("total");
  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  const [sortOption, setSortOption] = useState(SORT_LIST[1].value);
  const onChangeSortOption = (value: string) => {
    setSortOption(value);
  };

  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const isSelectedTab = (tabName: string) => {
    return selectedTab === tabName;
  };

  return (
    <>
      <TopSection>
        <SearchBox>
          <SvgIcPrev width={24} height={24} />
          <SearchInput value={searchText} onChange={onChangeSearchText} />
        </SearchBox>
        <TabBox>
          {TAB_LIST.map(({ id, name }) => (
            <SelectedButton
              key={`tab_${id}`}
              value={id}
              selected={id === selectedTab}
              onClick={onClickSelectedTab}
            >
              {name}
            </SelectedButton>
          ))}
        </TabBox>
        {!isSelectedTab("total") && (
          <SelectContainer>
            <SortSelect defaultOption={sortOption} onChangeSortOption={onChangeSortOption} />
            <RegionSmallSelect
              defaultOption={regionOption}
              onChangeSortOption={onChangeRegionOption}
            />
          </SelectContainer>
        )}
        {isSelectedTab("total") && <H2>우리술 정보</H2>}
        {isSelectedTab("drinkVote") ? (
          <></>
        ) : (
          <>
            <DrinkList
              searchText={searchText}
              sortOption={sortOption}
              regionOption={regionOption}
              isSelectedTab={isSelectedTab("total")}
            />
            {selectedTab === "total" && (
              <MoreButton
                variant="outline"
                width="100%"
                height="48px"
                /**
                 * @Todo enum으로 사용하면 좋을 것 같다.
                 */
                value={"drinkInfo"}
                onClick={onClickSelectedTab}
              >
                우리술 정보 더보기
              </MoreButton>
            )}
          </>
        )}
      </TopSection>
      {isSelectedTab("total") && <DivideLine />}
      <BottomSection>
        {selectedTab === "drinkInfo" ? (
          <></>
        ) : (
          <>
            {isSelectedTab("total") && <H2>우리술 투표</H2>}
            <DrinkVoteList
              searchText={searchText}
              sortOption={sortOption}
              regionOption={regionOption}
              isSelectedTab={isSelectedTab("total")}
            />
            {isSelectedTab("total") && (
              <MoreButton
                variant="outline"
                width="100%"
                height="48px"
                value="drinkVote"
                onClick={onClickSelectedTab}
              >
                우리술 투표 더보기
              </MoreButton>
            )}
          </>
        )}
      </BottomSection>

      <BottomBar />
    </>
  );
}

const TopSection = styled.section`
  padding: 0 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TabBox = styled.ul`
  display: flex;
  margin-top: 8px;
`;

const DivideLine = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_01};
    height: 8px;
  `}
`;

const SelectedButton = styled.button<{ theme: DefaultTheme; selected: boolean }>`
  ${({ theme, selected }) =>
    css`
      ${theme.typography.body02};
      color: ${theme.colors.black_03};
      padding: 16.5px 12px;

      ${selected
        ? css`
            ${theme.typography.body01};
            color: ${theme.colors.black_01};
            border-bottom: 3px solid ${theme.colors.black_01};
          `
        : css`
            display: flex;
          `}
    `}
`;

const SelectContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 4px;
`;

const H2 = styled.h2`
  ${({ theme }) => css`
    ${theme.typography.headline02};
    color: ${theme.colors.black_01};
    margin-top: 40px;
  `}
`;

const MoreButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin: 24px 0 40px 0;
  `};
`;

const BottomSection = styled.section`
  padding: 0 20px 96px;
  margin-top: 8px; // 64(BottomBar height) + 32(margin) = 96
  overflow: auto;
`;

export default Search;
