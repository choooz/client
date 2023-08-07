import { media } from "@monorepo/ui/styles/media";
import styled from "styled-components";
import { MyVote } from "types/my";

import VoteItemDesktop from "./VoteItemDesktop";
import VoteItemMobile from "./VoteItemMobile";

interface Props {
  voteList: MyVote[];
}

function VoteList({ voteList }: Props) {
  if (!voteList) return null;

  return (
    <>
      <MobileVoteList>
        {voteList.map((vote: MyVote, index: number) => (
          <VoteItemMobile key={`my_page_${index}`} vote={vote} />
        ))}
      </MobileVoteList>
      <DesktopVoteList>
        {voteList.map((vote: MyVote, index: number) => (
          <VoteItemDesktop key={`my_page_${index}`} vote={vote} />
        ))}
      </DesktopVoteList>
    </>
  );
}

const MobileVoteList = styled.div`
  ${media.medium} {
    display: none;
  }
`;
const DesktopVoteList = styled.div`
  display: none;
  ${media.medium} {
    display: inherit;
  }
`;

export default VoteList;
