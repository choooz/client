import { QueryClient, useMutation } from "@tanstack/react-query";
import { postVotingById } from "lib/apis/voting";

import { useState } from "react";
import { AorB, Voting } from "types/vote";

export default function useMutateVotingService(voteId: number) {
  const [select, setSelect] = useState<Voting>({ choice: null });
  const onChangeSelect = (select: AorB) => {
    setSelect({ choice: select });
  };

  const { mutate } = useMutation(() => postVotingById(voteId, select));

  return { mutate, onChangeSelect, select };
}
