import Path from "lib/Path";
import { useRouter } from "next/navigation";
import { ExImg1 } from "public/images";
import useBookmarkService from "services/useBookmarkService";
import { Content } from "src/types/vote";
import styled, { css } from "styled-components";
import ChipContainer from "./ChipContainer";
import VoteDescription from "./VoteDescription";

type Props = Pick<Content, "voteId" | "region" | "title" | "imageA" | "imageB">;
const getSafeImage = (image: string) => (image.includes("http") ? image : ExImg1);

function VoteItem({ voteId, region, title, imageA, imageB }: Props) {
  const { mutateBookMark, bookMarkCheckQuery } = useBookmarkService(voteId);

  const { data: bookmarkCheck } = bookMarkCheckQuery;

  const isBookmark = bookmarkCheck?.bookmarked || false;

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
      />
      <VoteDescription imageA={getSafeImage(imageA)} imageB={getSafeImage(imageB)} />
    </Container>
  );
}

const Container = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.line_02};
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 10px 25px 0px rgba(0, 0, 0, 0.06);
    padding: 20px;
  `};
`;

export default VoteItem;
