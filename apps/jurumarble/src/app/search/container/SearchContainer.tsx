'use client';

import DivideLine from 'components/DivideLine';
import { ReplaceLoginPageModal } from 'components/ReplaceLoginPageModal';
import styled from 'styled-components';

import { SearchHeader } from '../components';
import Tabs from '../components/Tabs';
import { renderItem, TabList } from '../constants';
import { useSearchChangeContext, useSearchValueContext } from '../context';

function SearchContainer() {
  const { selectedTab, isSelectedTab, isReplaceLoginPageModal } =
    useSearchValueContext();
  const { onToggleReplaceLoginPageModal } = useSearchChangeContext();

  const { topSectionItem, bottomSectionItem } =
    renderItem[selectedTab as TabList];

  return (
    <>
      <TopSection>
        <SearchHeader />
        <Tabs />
        {topSectionItem()}
      </TopSection>
      {isSelectedTab('total') && <DivideLine />}
      <BottomSection>{bottomSectionItem()}</BottomSection>
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
    </>
  );
}

const TopSection = styled.section`
  padding: 0 20px;
`;

const BottomSection = styled.section`
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  overflow: auto;
`;

export default SearchContainer;
