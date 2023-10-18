import Path from 'lib/Path';
import { useRouter } from 'next/navigation';
import useBookmarkService from 'services/useBookmarkService';
import { Content } from 'src/types/vote';
import styled from 'styled-components';

import ChipContainer from './ChipContainer';
import VoteDescription from './VoteDescription';

interface Props {
  voteDrink: Content;
}
/**
 *
 * @Todo 타입 더 깔끔하게 정의 필요
 */
function DrinkVoteItem({ voteDrink }: Props) {
  const { voteId, region, title, imageA, imageB, votedCount } = voteDrink;

  const { isBookmark, mutateBookMark } = useBookmarkService(voteId);

  const router = useRouter();
  const onClickDrinkVoteItem = () => {
    router.push(`${Path.VOTE_DETAIL_PAGE}/${voteId}`);
  };

  return (
    <Container onClick={onClickDrinkVoteItem}>
      <ChipContainer
        title={title}
        date="20.08.22"
        region={region}
        mutateBookMark={mutateBookMark}
        isBookmark={isBookmark}
        votedCount={votedCount}
      />
      <VoteDescription imageA={imageA} imageB={imageB} />
    </Container>
  );
}

const Container = styled.button`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.line_02};
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.08),
    0px 10px 25px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
`;

export default DrinkVoteItem;
