import { useContext } from 'react';

import { SearchContext } from './SearchProvider';

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearchContext SearchProvider 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
