"use client";

import BottomBar from "components/BottomBar";
import { Button } from "components/button";
import SearchInput from "components/SearchInput";
import SvgIcPrev from "src/assets/icons/components/IcPrev";
import styled, { css, DefaultTheme } from "styled-components";
import { ChangeEvent, useCallback, useEffect } from "react";
import DrinkList from "./DrinkList";
import DrinkVoteList from "./DrinkVoteList";
import SortSelect from "./SortSelect";
import RegionSmallSelect from "./RegionSmallSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RegionType, SortType } from "src/types/common";
import { SORT_LIST } from "lib/constants";

const TAB_LIST = [
  { id: "total", name: "통합" },
  { id: "drinkInfo", name: "우리술 정보" },
  { id: "drinkVote", name: "우리술 투표" },
] as const;

const drinkInfoSortOptionList = SORT_LIST.filter((sortOption) => sortOption.value !== "ByTime");
const drinkVoteSortOptionList = SORT_LIST.filter((sortOption) => sortOption.value !== "ByName");

type TabList = (typeof TAB_LIST)[number]["id"];

/**
 * @Todo 아래와 같이 분리하기
 * <SeachProvider>
 * <SearchInputContainer />
 * <SearchVoteListContainer />
 * </SearchProvider>
 *
 * @Todo 검색 상태를 관리하는 Context를 만들기
 * const {textInput} = useSearchContext()
 */

function SearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const searchText = searchParams.get("searchText") as string;
  const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace(pathname + "?" + createQueryString("searchText", e.target.value));
  };

  const selectedTab = searchParams.get("selectedTab");
  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace(
      pathname + "?" + createQueryString("selectedTab", e.currentTarget.value as TabList),
    );
  };

  const sortOption = searchParams.get("sortOption") as SortType;
  const onChangeSortOption = (value: string) => {
    router.replace(pathname + "?" + createQueryString("sortOption", value));
  };

  const regionOption = searchParams.get("regionOption") as RegionType;
  const onChangeRegionOption = (value: string) => {
    router.replace(pathname + "?" + createQueryString("regionOption", value));
  };

  useEffect(() => {
    const queryParams = {
      searchText: searchText || "",
      selectedTab: selectedTab || "total",
      sortOption: sortOption || "ByPopularity",
      regionOption: regionOption || "",
    };
    const queryString = new URLSearchParams(queryParams).toString();

    router.replace(pathname + "?" + queryString);
  }, []);

  const isSelectedTab = (tabName: string) => {
    return selectedTab === tabName;
  };

  const renderItem: Record<
    TabList,
    { topSectionItem: JSX.Element; bottomSectionItem: JSX.Element }
  > = {
    total: {
      topSectionItem: (
        <>
          <H2>우리술 정보</H2>
          <DrinkList
            searchText={searchText}
            sortOption={sortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab("total")}
          />
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
        </>
      ),
      bottomSectionItem: (
        <>
          <H2>우리술 투표</H2>
          <DrinkVoteList
            searchText={searchText}
            sortOption={sortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab("total")}
          />
          <MoreButton
            variant="outline"
            width="100%"
            height="48px"
            value="drinkVote"
            onClick={onClickSelectedTab}
          >
            우리술 투표 더보기
          </MoreButton>
        </>
      ),
    },
    drinkInfo: {
      topSectionItem: (
        <>
          <SelectContainer>
            <SortSelect
              defaultOption={sortOption}
              onChangeSortOption={onChangeSortOption}
              options={drinkInfoSortOptionList}
            />
            <RegionSmallSelect
              defaultOption={regionOption}
              onChangeSortOption={onChangeRegionOption}
            />
          </SelectContainer>
          <DrinkList
            searchText={searchText}
            sortOption={sortOption}
            regionOption={regionOption}
            isSelectedTab={false}
          />
        </>
      ),
      bottomSectionItem: <></>,
    },
    drinkVote: {
      topSectionItem: <></>,
      bottomSectionItem: (
        <>
          <SelectContainer>
            <SortSelect
              defaultOption={sortOption}
              onChangeSortOption={onChangeSortOption}
              options={drinkVoteSortOptionList}
            />
            <RegionSmallSelect
              defaultOption={regionOption}
              onChangeSortOption={onChangeRegionOption}
            />
          </SelectContainer>
          <DrinkVoteList
            searchText={searchText}
            sortOption={sortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab("total")}
          />
        </>
      ),
    },
  };
  const { topSectionItem, bottomSectionItem } = renderItem[(selectedTab as TabList) || "total"];

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
        {topSectionItem}
      </TopSection>
      {isSelectedTab("total") && <DivideLine />}
      <BottomSection>{bottomSectionItem}</BottomSection>
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
    margin-bottom: 8px;
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
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  overflow: auto;
`;

export default SearchContainer;
