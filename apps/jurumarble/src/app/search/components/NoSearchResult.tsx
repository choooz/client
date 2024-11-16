import Image from 'next/image';
import { noSearchResult } from 'public/images';
import styled from 'styled-components';

function NoSearchResult() {
  return (
    <Container>
      <Image
        alt="검색 결과가 없습니다."
        src={noSearchResult}
        width={140}
        height={140}
      />
      <Text>검색 결과가 없어요. 다른 검색어를 입력해보세요.</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Text = styled.p``;

export default NoSearchResult;
