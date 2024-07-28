import SearchInput from 'components/SearchInput';
import { useRouter } from 'next/navigation';
import { SvgIcPrevious } from 'src/assets/icons/components';
import styled from 'styled-components';

import { useSearchChangeContext, useSearchValueContext } from '../context';

function SearchHeader() {
  const router = useRouter();

  const { searchText } = useSearchValueContext();
  const { debouncedChange } = useSearchChangeContext();

  return (
    <Header>
      <button onClick={() => router.back()}>
        <SvgIcPrevious width={24} height={24} />
      </button>
      <SearchInput
        placeholder="관심있는 우리술을 찾아보세요."
        value={searchText}
        onChange={debouncedChange}
      />
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
`;

export default SearchHeader;
