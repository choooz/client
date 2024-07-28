'use client';
/**
 * @TODO tsconfig에서 paths 수정
 */
import BottomBar from 'components/BottomBar';

import { SearchContainer } from './components';
import { SearchProvider } from './context';

function SearchPage() {
  return (
    <>
      <SearchProvider>
        <SearchContainer />
      </SearchProvider>
      <BottomBar />
    </>
  );
}

export default SearchPage;
