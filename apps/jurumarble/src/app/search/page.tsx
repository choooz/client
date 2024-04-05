'use client';

import { SearchContainer } from './components';
import { SearchProvider } from './context';

function SearchPage() {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
}

export default SearchPage;
