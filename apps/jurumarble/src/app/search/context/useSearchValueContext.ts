import { useContext } from 'react';

import { SearchValueContext } from './SearchProvider';

export const useSearchValueContext = () => {
  const context = useContext(SearchValueContext);

  if (!context) {
    throw new Error(
      'useSearchValueContext는 SearchValueProvider 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
