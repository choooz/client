import { QueryClient, useMutation } from "@tanstack/react-query";
import { postVotingAPI } from "lib/apis/vote";
import { useState } from "react";
import { AorB, Voting } from "types/vote";

export default function useMutateVotingService(voteId: number) {
  const queryClient = new QueryClient();
  const [select, setSelect] = useState<Voting>({ choice: null });
  const onChangeSelect = (select: AorB) => {
    setSelect({ choice: select });
  };

  const { mutate } = useMutation(() => postVotingAPI(select, voteId), {
    onSuccess: () => {
      // 이곳에 통계 데이터를 refetch하는 로직을 넣어야 합니다.
    },
  });

  return { mutate, onChangeSelect, select };
}
