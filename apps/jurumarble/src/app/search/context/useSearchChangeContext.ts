import { useContext } from 'react';

import { SearchChangeContext } from './SearchProvider';

export const useSearchChangeContext = () => {
  const context = useContext(SearchChangeContext);

  if (!context) {
    throw new Error(
      'useSearchChangeContext SearchChangeProvider 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
