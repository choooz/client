'use client';

import BottomBar from 'components/BottomBar';
import DivideLine from 'components/DivideLine';
import { ReplaceLoginPageModal } from 'components/ReplaceLoginPageModal';
import SearchInput from 'components/SearchInput';
import { useRouter } from 'next/navigation';
import { SvgIcPrevious } from 'src/assets/icons/components';
import styled, { css, DefaultTheme } from 'styled-components';

import { renderItem, TAB_LIST, TabList } from '../constants';
import { useSearchContext } from '../context';

function SearchContainer() {
  const router = useRouter();

  const {
    selectedTab,
    isSelectedTab,
    searchText,
    isReplaceLoginPageModal,
    debouncedChange,
    onClickSelectedTab,
    onToggleReplaceLoginPageModal,
  } = useSearchContext();

  const { topSectionItem, bottomSectionItem } =
    renderItem[selectedTab as TabList];

  return (
    <>
      <TopSection>
        <SearchBox>
          <button onClick={() => router.back()}>
            <SvgIcPrevious width={24} height={24} />
          </button>
          <SearchInput
            placeholder="관심있는 우리술을 찾아보세요."
            value={searchText}
            onChange={debouncedChange}
          />
        </SearchBox>
        <TabBox>
          {TAB_LIST.map(({ id, name }) => (
            <SelectedButton
              key={`tab_${id}`}
              value={id}
              selected={id === selectedTab}
              onClick={(e) =>
                onClickSelectedTab(e.currentTarget.value as TabList)
              }
            >
              {name}
            </SelectedButton>
          ))}
        </TabBox>
        {topSectionItem}
      </TopSection>
      {isSelectedTab('total') && <DivideLine />}
      <BottomSection>{bottomSectionItem}</BottomSection>
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
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
  margin-top: 8px;
`;

const TabBox = styled.ul`
  display: flex;
  margin-top: 8px;
`;

const SelectedButton = styled.button<{
  theme: DefaultTheme;
  selected: boolean;
}>`
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

const BottomSection = styled.section`
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  overflow: auto;
`;

export default SearchContainer;
