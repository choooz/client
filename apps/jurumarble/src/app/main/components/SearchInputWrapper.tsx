'use client';

import { useRef } from 'react';

import SearchInput from 'components/SearchInput';
import useInput from 'hooks/useInput';
import Path from 'lib/Path';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SearchInputWrapper = () => {
  const ref = useRef<HTMLInputElement>(null);

  const { value: searchText } = useInput({
    useDebounce: true,
  });
  const router = useRouter();

  return (
    <Wrapper>
      <SearchInput
        placeholder="관심있는 우리술을 검색해보세요."
        value={searchText}
        eventHandler={() => {
          router.push(`${Path.SEARCH_PAGE}?searchText=${ref.current?.value}`);
        }}
        ref={ref}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 28px;
`;

export default SearchInputWrapper;
