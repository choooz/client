import { dehydrate } from "@tanstack/query-core";
import { getHotDrinkVote } from "lib/apis/vote/getHotDrinkVote";
import getQueryClient from "src/modules/getQueryClient";
import HydrateOnClient from "src/modules/hydrateOnClient";

import HotDrinkVoteContainer from "../components/HotDrinkVoteContainer";
import { hotDrinkVoteQueryKey } from "../services/queryKey";

export const HydratedDrinkVoteContainer = async () => {
  const qc = getQueryClient();
  await qc.prefetchQuery([hotDrinkVoteQueryKey], getHotDrinkVote);
  const dehydratedState = dehydrate(qc);
  return (
    <HydrateOnClient state={dehydratedState}>
      <HotDrinkVoteContainer />
    </HydrateOnClient>
  );
};
