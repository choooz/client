import { useQuery } from "@tanstack/react-query";
import { getVoteCount } from "lib/apis/my";

import { reactQueryKeys } from "lib/queryKeys";

function useGetVoteCount() {
  const { data } = useQuery(reactQueryKeys.myPageVoteCount(), getVoteCount);

  const { countCreatedVote, countParticipatedVote, countBookmarkedVote } = data || {};

  const voteCountList = [
    {
      voteTypeText: "작성한 투표",
      count: countCreatedVote,
    },
    {
      voteTypeText: "참여한 투표",
      count: countParticipatedVote,
    },
    {
      voteTypeText: "북마크 투표",
      count: countBookmarkedVote,
    },
  ];

  return voteCountList;
}

export default useGetVoteCount;
