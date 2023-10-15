import { useQuery } from "@tanstack/react-query";
import { getHotDrinkVote } from "lib/apis/vote";
import { queryKeys } from "lib/queryKeys";

const getQueryKey = () => [queryKeys.HOT_DRINK_VOTE];

export default function useGetHotDrinkVoteService() {
  const { data: hotDrinkVote } = useQuery(getQueryKey(), getHotDrinkVote);

  return { hotDrinkVote };
}
